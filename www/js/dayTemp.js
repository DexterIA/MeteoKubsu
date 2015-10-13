angular.module('day.ctrl',['ionic'])
    .controller("day_ctrl", function ($scope, $http, $ionicPopup) {
        var showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refresh = function () {
            var now = Date.now();
            now += 10800000;
            var yesterday = now - 86400000;
            $http({
                method: 'POST',
                url: 'https://meteo.kubsu.ru/Ajax/Weather',
                data: 'start=' + yesterday + '&end=' + now,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                var dayData = data;
                var tempList = [], dateList = [];
                var date, minutes, formattedTime, d1, d2, title;
                for (var i = 0; i < dayData.length; i++) {
                    debugger;
                    tempList.push(parseFloat((dayData[i][1]).toFixed(1)));
                    date = new Date(dayData[i][0] - 10800000);
                    minutes = "0" + date.getMinutes();
                    formattedTime = date.getHours() + ':' + minutes.substr(-2);
                    dateList.push(formattedTime);
                }
                d1 = new Date(yesterday - 10800000);
                d2 = new Date(now - 10800000);
                title = ("0" + d1.getDate()).slice(-2) + '.' + ("0" + (d1.getMonth() + 1)).slice(-2);
                title = title + '-' + ("0" + d2.getDate()).slice(-2) + '.' + ("0" + (d2.getMonth() + 1)).slice(-2);
                $(function () {
                    $('#container').highcharts({
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: title
                        },
                        xAxis: {
                            categories: dateList
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: true
                            }
                        },
                        series: [{
                            name: 'Температура (°C)',
                            data: tempList
                        }]
                    });
                });
            })
                .error(function (data, status, headers, config, statusText) {
                    showAlert(status, statusText);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.refresh();
    }
);