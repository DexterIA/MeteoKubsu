angular.module('month.ctrl',['ionic'])
    .controller("month_ctrl", function ($scope, $http, $ionicPopup, getMonthData, $routeParams) {
        $scope.refreshMonth = function () {
            var monthData = getMonthData.all($routeParams.sd, $routeParams.ed);
            $(function () {
                $('#container').highcharts({
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: monthData.title
                    },
                    xAxis: {
                        categories: monthData.dateList
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
                        data: monthData.dayTempList
                    }, {
                        name: 'Ночная температура',
                        data: monthData.nightTempList
                    }]
                });
            });
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.refreshMonth();
        });