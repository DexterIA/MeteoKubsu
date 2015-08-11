angular.module('year.ctrl',['ionic'])
    .controller("year_ctrl", function ($scope, $http, $ionicPopup) {
        $scope.showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        var week_data = [];

        var now = Date.now();
        now = now + 10800000;
        var yesterday = now - 604800000;
        $http({
            method: 'POST',
            url: 'https://meteo.kubsu.ru/Ajax/Weather',
            data: 'start=' + yesterday + '&end=' + now,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            week_data = data;
            var dayTempList = [];
            var nightTempList = [];
            for (var i = 0; i < week_data.length-1; i++) {
                dayTempList.push(parseInt((week_data[i][1]).toFixed(0)));
                var date = new Date(week_data[i][0]);
                var minutes = "0" + date.getMinutes();
                date = date.addHours(-3);
                var formattedTime = date.getHours() + ':' + minutes.substr(-2);
                date_list.push(formattedTime);
            }
            var d1 = new Date(yesterday - 10800000);
            var d2 = new Date(now - 10800000);
            var title = ("0" + d1.getDate()).slice(-2) + '.' + ("0" + (d1.getMonth() + 1)).slice(-2);
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
                        name: 'Дневная температура',
                        data: dayTempList
                    },{
                        name: 'Ночная температура',
                        data: dayTempList
                    }]
                });
            });
        })
            .error(function (data, status, headers, config, statusText) {
                $scope.showAlert(status, statusText);
            });

    });

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
};
