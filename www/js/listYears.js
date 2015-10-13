angular.module('lyears.ctrl', ['ionic'])
  .controller("lyears_ctrl", function ($scope) {
    $scope.refreshListYear = function () {
      $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.years = [];

    var tempYs, y, start, now, date, mon;
    tempYs = [];
    start = 1356998400000 - 10800000;
    now = Date.now();
    y = {};
    mon = {};
    date = new Date(start);
    y.year = date.getFullYear();
    y.show = false;
    mon.name = date.getMonth();
    mon.sd = start;
    y.months = [];
    while (start < now) {
      start += 86400000;
      date = new Date(start);
      if (date.getMonth() != mon.name) {
        if (date.getMonth() != 0) {
          mon.ed = date.getTime();
          y.months.push(mon);
          mon = {};
          mon.name = date.getMonth();
          mon.sd = start;
        } else {
          mon.ed = date.getTime();
          y.months.push(mon);
          tempYs.push(y);
          mon = {};
          y = {};
          y.year = date.getFullYear();
          y.show = false;
          mon.name = date.getMonth();
          mon.sd = start;
          y.months = [];
        }
      }
    }

    tempYs.push(y);
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

    for (var i = 0; i < tempYs.length; i++) {
      for (var j = 0; j < tempYs[i].months.length; j++) {
        tempYs[i].months[j].name = months[tempYs[i].months[j].name];
      }
    }
    $scope.years = tempYs;

    console.log(JSON.stringify(tempYs));

    $scope.yearClick = function (y) {
      for (var i = 0; i < $scope.years.length; i++) {
        if ($scope.years[i].year == y) {
          $scope.years[i].show = $scope.years[i].show ? false : true;
        }
      }
      $scope.refreshListYear();
    }

  });
