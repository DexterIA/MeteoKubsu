angular.module('main.ctrl',['ionic'])
    .controller("main_ctrl", function ($scope, $http, $ionicPopup) {
        $scope.data = {};
        $scope.sym = '';
        $scope.windDir = '';
        $scope.showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refresh = function () {
            $http.get('https://meteo.kubsu.ru/Ajax/Latest').
                success(function (data, status, headers, config) {
                    $scope.data = data;
                    $scope.sym = ($scope.data.Temperature >= 0) ? '+' : '-';
                    if (($scope.data.WindDirection < 23) && ($scope.data.WindDirection >= 337)) {
                        $scope.windDir = 'северный';
                    }
                    if (($scope.data.WindDirection < 67) && ($scope.data.WindDirection >= 23)) {
                        $scope.windDir = 'северо-восточный';
                    }
                    if (($scope.data.WindDirection < 113) && ($scope.data.WindDirection >= 67)) {
                        $scope.windDir = 'восточный';
                    }
                    if (($scope.data.WindDirection < 158) && ($scope.data.WindDirection >= 113)) {
                        $scope.windDir = 'юго-восточный';
                    }
                    if (($scope.data.WindDirection < 203) && ($scope.data.WindDirection >= 158)) {
                        $scope.windDir = 'южный';
                    }
                    if (($scope.data.WindDirection < 248) && ($scope.data.WindDirection >= 203)) {
                        $scope.windDir = 'юго-западный';
                    }
                    if (($scope.data.WindDirection < 293) && ($scope.data.WindDirection >= 248)) {
                        $scope.windDir = 'западный';
                    }
                    if (($scope.data.WindDirection < 337) && ($scope.data.WindDirection >= 293)) {
                        $scope.windDir = 'северо-западный';
                    }
                }).
                error(function (data, status, headers, config, statusText) {
                    $scope.showAlert(status, statusText);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.refresh();
    });