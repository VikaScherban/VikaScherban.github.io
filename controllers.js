angular.module('gpaApp', ['ui.bootstrap'])
    .directive('myContent', function() {
        return {
            restrict: 'E',
            templateUrl: 'my-content.html'
        };
    })
    .controller('TabsDemoCtrl', function ($scope) {
        $scope.tabs = [
            {id : 0, title:'GRADE 01'}
        ];
        $scope.removeTab = function (event, index) {
            // var tab = $scope.tabs.indexOf(index);
            event.preventDefault();
            event.stopPropagation();
            $scope.tabs.splice(index, 1);

        };
        $scope.foo = 'FOO';
        $scope.bar = 'BAR';
        $scope.addTab = function() {
            var len = $scope.tabs.length + 1;
            var numLbl = '' + ((len > 9) ? '' : '0') + String(len);

            $scope.tabs.push({
                id : Number(numLbl)-1,
                title: 'GRADE ' + numLbl,
                tabUrl: 'content.html'
            });
        }
    })
    .service('mainTabsServ', function () {
        var classes = [];
        var cl1 = {
            id : 0,
            name: 'Vasya Pupkin',
            gpa: '4.6',
            grade: '8A'
        };
        classes.push(cl1);
        return{
            classes : classes
        }
    })
    .filter('thisClasses', function () {
        return function (scope, id) {
            var claslist = [];
            var list = scope;
            for(var index in list){
                if (list[index].id === id) {
                    claslist.push(list[index]);
                }
            }
            return claslist;
        }
    })
    .controller('IncludeFileCtrl', function ($scope, mainTabsServ) {
        $scope.classes = mainTabsServ.classes;
        $scope.average = 0.0;


        $scope.gpaAverage = function () {
            var t = 0.0;
            var k = 0;
            var list = $scope.classes;
            for (var i in list){
                if (list[i].id === $scope.tab.id) {
                    t += Number(list[i].gpa);
                    k++;
                }
            }
            return (t/k).toFixed(2);
        };
        $scope.addStudent = function (index) {
            var clas = {
                id : index,
                name: $scope.name,
                gpa: $scope.gpa,
                grade: $scope.grade
            };
            $scope.name = '';
            $scope.gpa = '';
            mainTabsServ.classes.push(clas);

            $scope.average = $scope.gpaAverage();

        };
        $scope.removeStudent = function (id) {
            $scope.classes.splice(id, 1);
            $scope.average = $scope.gpaAverage();
        };

        $scope.selectChanged = function (index) {
            $scope.tabs[index].title = 'GRADE ' +  $scope.grade;
        }

    })

;

