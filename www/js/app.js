var app = angular.module('starter', ['ionic', 'main.ctrl', 'year.ctrl', 'day.ctrl', 'month.ctrl', 'ngRoute']);

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

    app.controller('index_ctrl', function($scope, $location) {
        $scope.$location = $location;
    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/main', {
                    templateUrl: 'templates/main_page.html',
                    controller: 'main_ctrl'
                })
                .when('/day', {
                    templateUrl: 'templates/day_temp.html',
                    controller: 'day_ctrl'
                })
                .when('/month',{
                    templateUrl: 'templates/month_temp.html',
                    controller: 'month_ctrl'
                })
                .when('/week',{
                    templateUrl: 'templates/week_temp.html',
                    controller: 'year_ctrl'
                })
                .otherwise({
                    redirectTo: '/main'
                });
        }]);

