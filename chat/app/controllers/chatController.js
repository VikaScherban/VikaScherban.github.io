'use strict';

angular.module("myApp", ['pubnub.angular.service'])
    .controller('ChatCtrl', function($scope, Pubnub) {
        $scope.channel = 'messages-channel';""
        // Generating a random uuid between 1 and 10000 using an utility function from the lodash library.
        $scope.uuid = Math.floor(Math.random() * 10000).toString();
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
