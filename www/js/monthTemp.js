angular.module('month.ctrl',['ionic'])
    .controller("month_ctrl", function ($scope, $http, $ionicPopup, getMonthData, $routeParams) {
        $scope.refreshMonth = function () {
            var dd = new Date(parseInt($routeParams.sd));
            $scope.monthName = dd.getMonthName();
            $scope.year = dd.getFullYear();
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

Date.prototype.getMonthName = function(){
    switch (this.getMonth()) {
        case 0 :{return "Январь"}
        case 1 :{return "Февраль"}
        case 2 :{return "Март"}
        case 3 :{return "Апрель"}
        case 4 :{return "Май"}
        case 5 :{return "Июнь"}
        case 6 :{return "Июль"}
        case 7 :{return "Август"}
        case 8 :{return "Сентябрь"}
        case 9 :{return "Октябрь"}
        case 10 :{return "Ноябрь"}
        case 11 :{return "Декабрь"}
    }
};