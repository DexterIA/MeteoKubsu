angular.module('DataService', [])
  .factory('dataService', function ($http, $q) {
    return {
      getData: function (startDate, endDate) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: 'https://meteo.kubsu.ru/Ajax/Weather',
          data: 'start=' + startDate + '&end=' + endDate,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
          deferred.resolve(data);
        }).error(function (data, status, headers, config) {
          deferred.reject(status);
        });
        return deferred.promise;
      }
    }
  });