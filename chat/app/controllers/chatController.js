'use strict';

angular.module("myApp", ['pubnub.angular.service'])
    .controller('ChatCtrl', function($scope, Pubnub) {
        // Generating a random uuid between 1 and 10000 using an utility function from the lodash library.
        $scope.uuid = Math.floor(Math.random() * 10000).toString();
        $scope.channel = 'messages-channel';

        //Map
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];
        $scope.users = [];
        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        };

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    name: "User #" + $scope.uuid,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                $scope.users.push(pos);

                createMarker(pos);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');

                $scope.map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

        //PubNub
        Pubnub.init({
            publish_key: 'pub-c-92d96d75-2ae0-4233-aa40-d9767530b195',
            subscribe_key: 'sub-c-7fb592b8-14b8-11e8-92ea-7a3d09c63f1f',
            uuid: $scope.uuid,
            ssl: true
        });

        // Send the messages over PubNub Network
        $scope.sendMessage = function() {
            // Don't send an empty message
            if (!$scope.messageContent || $scope.messageContent === '') {
                return;
            }
            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    content: $scope.messageContent,
                    sender_uuid: $scope.uuid,
                    date: new Date()
                },
                callback: function(m) {
                    console.log(m);

                    var element = document.getElementById("comments");
                    element.scrollTop = element.scrollHeight;
                }
            });
            // Reset the messageContent input
            $scope.messageContent = '';

        };

        $scope.messages = [];

        // Subscribing to the ‘messages-channel’ and trigering the message callback
        Pubnub.subscribe({
            channel: $scope.channel,
            triggerEvents: ['callback']
        });

        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
            $scope.$apply(function () {
                $scope.messages.push(m);
            });
        });

        // A function to display a nice uniq robot avatar
        $scope.avatarUrl = function(uuid){
            var element = document.getElementById("comments");
            element.scrollTop = element.scrollHeight + 100;
            return 'https://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
        };


        $scope.isActive = false;
        //Search
        $scope.searchFunction = function () {
            $scope.isActive = !$scope.isActive;
        };


    });
