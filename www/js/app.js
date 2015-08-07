// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'main.ctrl', 'year.ctrl', 'day.ctrl', 'month.ctrl']);

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
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: 'templates/main_page.html',
                        controller: 'main_ctrl'
                    }
                }
            })
            .state('day', {
                url: '/day',
                views: {
                    'main-day': {
                        templateUrl: 'templates/day_temp.html',
                        controller: 'day_ctrl'
                    }
                }
            })
            .state('month', {
                url: '/month',
                views: {
                    'main-month': {
                        templateUrl: 'templates/month_temp.html',
                        controller: 'month_ctrl'
                    }
                }
            })
            .state('year', {
                url: '/year',
                views: {
                    'main-year': {
                        templateUrl: 'templates/year_temp.html',
                        controller: 'year_ctrl'
                    }
                }
            });
    });

