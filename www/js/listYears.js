angular.module('lyears.ctrl', ['ionic'])
    .controller("lyears_ctrl", function ($scope) {
        $scope.refreshListYear = function () {
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.years = [{
            "year": 2013,
            "show": false,
            "months": [{"name": "Январь", "sd": 1356998400000, "ed": 1359676800000}, {
                "name": "Февраль",
                "sd": 1359676800000,
                "ed": 1362096000000
            }, {"name": "Март", "sd": 1362096000000, "ed": 1364774400000}, {
                "name": "Апрель",
                "sd": 1364774400000,
                "ed": 1367366400000
            }, {"name": "Май", "sd": 1367366400000, "ed": 1370044800000}, {
                "name": "Июнь",
                "sd": 1370044800000,
                "ed": 1372636800000
            }, {"name": "Июль", "sd": 1372636800000, "ed": 1375315200000}, {
                "name": "Август",
                "sd": 1375315200000,
                "ed": 1377993600000
            }, {"name": "Сентябрь", "sd": 1377993600000, "ed": 1380585600000}, {
                "name": "Октябрь",
                "sd": 1380585600000,
                "ed": 1383264000000
            }, {"name": "Ноябрь", "sd": 1383264000000, "ed": 1385856000000}, {
                "name": "Декабрь",
                "sd": 1385856000000,
                "ed": 1388534400000
            }]
        }, {
            "year": 2014,
            "show": false,
            "months": [{"name": "Январь", "sd": 1388534400000, "ed": 1391212800000}, {
                "name": "Февраль",
                "sd": 1391212800000,
                "ed": 1393632000000
            }, {"name": "Март", "sd": 1393632000000, "ed": 1396310400000}, {
                "name": "Апрель",
                "sd": 1396310400000,
                "ed": 1398902400000
            }, {"name": "Май", "sd": 1398902400000, "ed": 1401580800000}, {
                "name": "Июнь",
                "sd": 1401580800000,
                "ed": 1404172800000
            }, {"name": "Июль", "sd": 1404172800000, "ed": 1406851200000}, {
                "name": "Август",
                "sd": 1406851200000,
                "ed": 1409529600000
            }, {"name": "Сентябрь", "sd": 1409529600000, "ed": 1412121600000}, {
                "name": "Октябрь",
                "sd": 1412121600000,
                "ed": 1414800000000
            }, {"name": "Ноябрь", "sd": 1414800000000, "ed": 1417392000000}, {
                "name": "Декабрь",
                "sd": 1417392000000,
                "ed": 1420070400000
            }]
        }, {
            "year": 2015,
            "show": false,
            "months": [{"name": "Январь", "sd": 1420070400000, "ed": 1422748800000}, {
                "name": "Февраль",
                "sd": 1422748800000,
                "ed": 1425168000000
            }, {"name": "Март", "sd": 1425168000000, "ed": 1427846400000}, {
                "name": "Апрель",
                "sd": 1427846400000,
                "ed": 1430438400000
            }, {"name": "Май", "sd": 1430438400000, "ed": 1433116800000}, {
                "name": "Июнь",
                "sd": 1433116800000,
                "ed": 1435708800000
            }, {"name": "Июль", "sd": 1435708800000, "ed": 1438387200000}]
        }];

/*
        debugger;
        var tempYs, y, start, now, date, mon;
        tempYs = [];
        start = 1356998400000;
        now = Date.now();
        y = {};
        mon = {};
        date = new Date(start - 10800000);
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

        for (var i = 0; i < tempYs.length; i++) {
            for (var j = 0; j < tempYs[i].months.length; j++) {
                var m = tempYs[i].months[j].name;
                switch (m) {
                    case 0 :{tempYs[i].months[j].name = "Январь";break;}
                    case 1 :{tempYs[i].months[j].name = "Февраль";break;}
                    case 2 :{tempYs[i].months[j].name = "Март";break;}
                    case 3 :{tempYs[i].months[j].name = "Апрель";break;}
                    case 4 :{tempYs[i].months[j].name = "Май";break;}
                    case 5 :{tempYs[i].months[j].name = "Июнь";break;}
                    case 6 :{tempYs[i].months[j].name = "Июль";break;}
                    case 7 :{tempYs[i].months[j].name = "Август";break;}
                    case 8 :{tempYs[i].months[j].name = "Сентябрь";break;}
                    case 9 :{tempYs[i].months[j].name = "Октябрь";break;}
                    case 10 :{tempYs[i].months[j].name = "Ноябрь";break;}
                    case 11 :{tempYs[i].months[j].name = "Декабрь";break;}

                }
            }
        }

        console.log(JSON.stringify(tempYs));
*/

        $scope.yearClick = function (y) {
            for (var i = 0; i < $scope.years.length; i++) {
                if ($scope.years[i].year == y) {
                    $scope.years[i].show = $scope.years[i].show ? false : true;
                }
            }
            $scope.refreshListYear();
        }
    });
