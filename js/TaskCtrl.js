angular.module ('todoList.controllers')
.controller('TaskCtrl',[
      '$scope',
      'PersistenceService',
      '$routeParams',
      '$location',
      function($scope, PersistenceService, $routeParams, $location) {
        var localStorageKey = "List";
        var currentID = $routeParams.id;
        

        $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
        $scope.lastID = PersistenceService.verify("taskLastID");


        /**Llamada a la función getItem */
        $scope.item = PersistenceService.getItem($scope.tasksCol, currentID);

        if ($scope.item === undefined) {
          $location.path("/error");
        }

        $scope.$watch('tasksCol', function(newValue, oldValue) {
            PersistenceService.save(localStorageKey, newValue);
        }, true);

        $scope.$watch('lastID', function(newValue, oldValue) {
            PersistenceService.save("taskLastID", newValue);
        }, true);

        $scope.deleteItem = function () {

          if ($scope.tasksCol.length == 1) {
            $scope.tasksCol = [];
            $scope.lastID = 0;
          } else {
            var target = PersistenceService.getItemIndex($scope.tasksCol, currentID);
            $scope.tasksCol.splice(target, 1);
          }

          $location.path('/');
        };

      }
    ])
;
