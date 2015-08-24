angular.module('factory.monthData', [])
    .factory("getMonthData", function($ionicPopup, $http){
        var  monthData = {};
        var showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        return {
            all: function (startDate, endDate) {
                $http({
                    method: 'POST',
                    url: 'https://meteo.kubsu.ru/Ajax/Weather',
                    data: 'start=' + startDate + '&end=' + endDate,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    monthData.dayTempList = [];
                    monthData.nightTempList = [];
                    monthData.dateList = [];
                    startDate = parseInt(startDate);
                    endDate = parseInt(endDate);
                    var date, title, maxDay = -270, minNight = 100, h, temp;
                    var start = startDate + 86400000;
                    for (var i = 0; i < data.length - 1; i++) {
                        date = new Date(data[i][0] - 14400000);
                        if (data[i][0] < start) {
                            h = parseInt(date.getHours());
                            temp = parseInt((data[i][1]).toFixed(0));
                            if (temp < minNight && (h < 10 || h > 19)){
                                minNight = temp;
                            }
                            if (temp > maxDay && h >= 10 && h <= 19){
                                maxDay = temp;
                            }
                        } else {
                            if (maxDay !== -270 && minNight !== 100){
                                monthData.dayTempList.push(maxDay);
                                monthData.nightTempList.push(minNight);
                                title = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2);
                                monthData.dateList.push( title);
                            }
                            start += 86400000; maxDay = -270; minNight = 100;
                        }

                    }
                    if (maxDay !== -270 && minNight !== 100){
                        monthData.dayTempList.push(maxDay);
                        monthData.nightTempList.push(minNight);
                        title = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2);
                        monthData.dateList.push(title);
                    }

                    var d1 = new Date(startDate - 10800000);
                    var d2 = new Date(endDate - 10800000);
                    title = ("0" + d1.getDate()).slice(-2) + '.' + ("0" + (d1.getMonth() + 1)).slice(-2) + '.' + d1.getFullYear();
                    title = title + ' - ' + ("0" + d2.getDate()).slice(-2) + '.' + ("0" + (d2.getMonth() + 1)).slice(-2) + '.' + d1.getFullYear();
                    monthData.title = title;
                    return monthData;
                }).error(function (data, status, headers, config, statusText) {
                    showAlert("Ошибка!", "Не получены данные!");
                });
                return monthData;
            }
        };
    });