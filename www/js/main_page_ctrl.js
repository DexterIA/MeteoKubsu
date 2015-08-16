angular.module('main.ctrl',['ionic'])
    .controller("main_ctrl", function ($scope, $http, $ionicPopup) {
        $scope.data = {};
        $scope.sym = '';
        $scope.windDir = '';
        var showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refreshMain = function () {
            $http.get('http://meteo.kubsu.ru/Ajax/Latest').
                success(function (data, status, headers, config) {
                    $scope.data = data;
                    var date1 = new Date();
                    var date2 = new Date($scope.data.Time);
                    if (date1 > date2){
                        showAlert("Внимание!", "Нет связи с метеостанцией уже " + diffDate(date1, date2));
                    }
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
                    showAlert(status, statusText);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.refreshMain();
    });

var diffDate = function (d1, d2){
    var dif = d1.getTime() - d2.getTime();
    return dif < 3600000 ? (dif / 60000).toFixed(0) + " минут" : (dif / 3600000).toFixed(0) + " часов";
};