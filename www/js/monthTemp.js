angular.module('month.ctrl', ['ionic'])
  .controller("month_ctrl", function ($scope, $http, $ionicPopup, getMonthData, $routeParams, dataService, $ionicLoading) {
    $scope.refreshMonth = function () {
      var dd = new Date(parseInt($routeParams.sd));
      if (Date.now() - $routeParams.ed < 20800001) {
        $scope.monthName = "последний месяц"
      } else {
        $scope.monthName = dd.getMonthName() + ' ' + dd.getFullYear() + ' года';
      }
      var showAlert = function (title, text) {
        $ionicPopup.alert({
          title: title,
          template: text
        });
      };
      $ionicLoading.show({
        template: 'Loading...'
      });
      var promiseObj = dataService.getData($routeParams.sd, $routeParams.ed);
      promiseObj.then(function (data) {
        if (!data) {
          showAlert("Ошибка", "Не получены данные");
          return;
        }
        var monthData = getMonthData.all($routeParams.sd, $routeParams.ed, data);
        $ionicLoading.hide();
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
      });
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.refreshMonth();
  });

Date.prototype.getMonthName = function () {
  var months = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь"
  };
  return months[this.getMonth()];
};