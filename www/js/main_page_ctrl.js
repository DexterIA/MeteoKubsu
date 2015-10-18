angular.module('main.ctrl',['ionic'])
    .controller("main_ctrl", function ($scope, $http, $ionicPopup, dataService) {
        $scope.data = {};
        $scope.sym = '';
        $scope.windDir = '';
        var showAlert = function (title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refreshMain = function () {
            $http.get('http://meteo.kubsu.ru/Ajax/Latest').
                success(function (data, status, headers, config) {
                    $scope.data = data;
                    var date1 = new Date();
                    var date2 = new Date($scope.data.Time - 10680000);
                    if (date1 > date2){
                        showAlert("Внимание!", "Нет связи с метеостанцией уже " + diffDate(date1, date2));
                    }
                    $scope.sym = ($scope.data.Temperature >= 0) ? '+' : '-';
                    var windD = $scope.data.WindDirection;
                    switch (true){
                        case (windD < 23 && windD >= 337) : {$scope.windDir = 'северный';break;}
                        case (windD < 67 && windD >= 23) : {$scope.windDir = 'северо-восточный';break;}
                        case (windD < 113 && windD >= 67) : {$scope.windDir = 'восточный';break;}
                        case (windD < 158 && windD >= 113) : {$scope.windDir = 'юго-восточный';break;}
                        case (windD < 203 && windD >= 158) : {$scope.windDir = 'южный';break;}
                        case (windD < 248 && windD >= 203) : {$scope.windDir = 'юго-западный';break;}
                        case (windD < 293 && windD >= 248) : {$scope.windDir = 'западный';break;}
                        case (windD < 337 && windD >= 293) : {$scope.windDir = 'северо-западный';break;}
                    }
                    var curr = new Date(data.Time - 10800000);
                    var lastYear = new Date (curr.getFullYear() - 1, curr.getMonth(), curr.getDate(), curr.getHours());
                    var promiseObj = dataService.getData(lastYear.getTime() - 10800000, lastYear.getTime() + 10800000);
                    promiseObj.then(function (result) {
                      var diff = 1000;
                      result.forEach(function (item) {
                        var h1 = new Date(item[0]).getHours();
                        if (Math.abs(h1 - curr.getHours()) < diff ) {
                          $scope.tempLastYear = item[1];
                          diff = Math.abs(h1 - curr.getHours());
                        }
                      });
                      $scope.symLast = ($scope.tempLastYear >= 0) ? '+' : '-';
                    });
                }).
                error(function (data, status, headers, config, statusText) {
                    showAlert("Ошибка!", "Отсутствует подключение к сети");
                    $scope.$broadcast('scroll.refreshComplete');
                });
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.refreshMain();
    });

var diffDate = function (d1, d2){
    var dif = d1.getTime() - d2.getTime();
    return dif < 3600000 ? (dif / 60000).toFixed(0) + " минут(ы)" : (dif / 3600000).toFixed(0) + " часа(ов)";
};