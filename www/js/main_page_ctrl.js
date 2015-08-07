angular.module('main.ctrl',['ionic'])
    .controller("main_ctrl", function ($scope, $http, $ionicPopup) {
        $scope.data = {};
        $scope.sym = '';
        $scope.windDir = '';
        var day_data = [];
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
                    $scope.sym = ($scope.data.Temperature > 0) ? '+' : '-';
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
            var now = Date.now();
            now = now + 10800000;
            var yesterday = now - 86400000;
            $http({
                method: 'POST',
                url: 'https://meteo.kubsu.ru/Ajax/Weather',
                data: 'start='+yesterday+'&end='+now,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                day_data = data;
                var temp_list = [];
                var date_list = [];
                for (var i = 0; i<day_data.length; i++){
                    temp_list.push(parseInt((day_data[i][1]).toFixed(0)));
                    var date = new Date(day_data[i][0]);
                    var minutes = "0" + date.getMinutes();
                    date = date.addHours(-3);
                    var formattedTime = date.getHours() + ':' + minutes.substr(-2);
                    date_list.push(formattedTime);
                }
                var d1 = new Date(yesterday - 10800000);
                var d2 = new Date(now - 10800000);
                var title = ("0" + d1.getDate()).slice(-2)+'.'+("0" + (d1.getMonth() + 1)).slice(-2);
                title = title + '-'+("0" + d2.getDate()).slice(-2)+'.'+("0" + (d2.getMonth() + 1)).slice(-2);

                $(function () {
                    $('#container').highcharts({
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: title
                        },
                        xAxis: {
                            categories: date_list
                        },
                        yAxis: {
                            title: {
                                text: 'Температура (°C)'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: 'Краснодар',
                            data: temp_list
                        }]
                    });
                });
                $scope.$broadcast('scroll.refreshComplete');
            }).
                error(function (data, status, headers, config, statusText) {
                    $scope.showAlert(status, statusText);
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.refresh();
    });

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
};