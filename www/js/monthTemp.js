angular.module('month.ctrl',['ionic'])
    .controller("month_ctrl", function ($scope, $http, $ionicPopup) {
        var showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refreshMonth = function () {
            var now = Date.now();
            now += 10800000;
            var lastMonth = now - (now % 86400000) - 2592000000;
            $http({
                method: 'POST',
                url: 'https://meteo.kubsu.ru/Ajax/Weather',
                data: 'start=' + lastMonth + '&end=' + now,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                var monthData = data;
                var dayTempList = [], nightTempList = [], dateList = [];
                var date, title, maxDay = -270, minNight = 100, h, temp;
                var start = lastMonth + 86400000;
                for (var i = 0; i < monthData.length - 1; i++) {
                    date = new Date(monthData[i][0] - 14400000);
                    if (monthData[i][0] < start) {
                        h = parseInt(date.getHours());
                        temp = parseInt((monthData[i][1]).toFixed(0));
                        if (temp < minNight && (h < 10 || h > 19)){
                            minNight = temp;
                        }
                        if (temp > maxDay && h >= 10 && h <= 19){
                            maxDay = temp;
                        }
                    } else {
                        if (maxDay !== -270 && minNight !== 100){
                            dayTempList.push(maxDay);
                            nightTempList.push(minNight);
                            title = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2);
                            dateList.push( title);
                        }
                        start += 86400000; maxDay = -270; minNight = 100;
                    }

                }
                if (maxDay !== -270 && minNight !== 100){
                    dayTempList.push(maxDay);
                    nightTempList.push(minNight);
                    title = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2);
                    dateList.push(title);
                }

                var d1 = new Date(lastMonth - 10800000);
                var d2 = new Date(now - 10800000);
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
                            name: 'Дневная температура',
                            data: dayTempList
                        }, {
                            name: 'Ночная температура',
                            data: nightTempList
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
        $scope.refreshMonth();
        });