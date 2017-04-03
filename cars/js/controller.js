'use strict';

/* Controller */
var carsApp = angular.module('carsApp', []);

carsApp.controller('AppCtrl', ['$scope',
    function ($scope) {
        $scope.cars = ["Porsche Cayman", "Mercedes Benz", "Subaru BRZ", "Porsche Panamera",
            "Jaguar", "BMW M5", "Audi", "BMW"];

        $scope.getCar = function (index) {
            console.log($scope.cars[index]);
        };


        //YES button
        $scope.yesClick = function () {
            var rows = document.getElementsByClassName('row-tb');//List of all cars object
            var properties = rows[0].childNodes; //List of properties of one car
            var headers = document.getElementsByClassName('cell-head');//List of all table titles
            var propnumber = 0;


            var i = 3;
            while(i < properties.length - 3){
                var carsprop = document.getElementsByClassName(properties[i].className); //Get all properties by class name
                var cell_prop_length = (carsprop[0].childNodes).length;
                var equal = true;
                var k = 1;

                //Go through the properties
                while (k < cell_prop_length - 1){
                    var firstelem = String((carsprop[0].childNodes[k]).innerHTML);
                    //Go through the cars that have this property
                    for (var j = 1; j < carsprop.length; j++){
                        var secondelem = String((carsprop[j].childNodes[k]).innerHTML);

                        if ( firstelem !== secondelem) {
                            equal = false;
                            break;
                        }

                        firstelem = secondelem;
                    }
                    propnumber++;

                     if (equal) {

                         console.log(headers[propnumber-1]);
                         // Add hidden class to equal elements of table line
                         for (var p = 0; p < carsprop.length; p++){
                            var elem =  carsprop[p].childNodes[k];
                            elem.classList.add("hidden");
                         }
                         headers[propnumber-1].classList.add("hidden");
                     }

                    equal = true;
                    k += 2;
                }

                i += 2;
            }
        };


        //NO button
        $scope.noClick = function () {
            var list = document.getElementsByClassName('hidden');

            //Delete all hidden classes in DOM
            while (list.length !== 0){
                list[0].classList.remove('hidden');
            }

        }
    }]);