angular.module ('todoList.controllers')
.controller('TaskCtrl',[
      '$scope',
      'PersistenceService',
      '$routeParams',
      '$location',
      function($scope, PersistenceService, $routeParams, $location) {
        var localStorageKey = "List";
        var currentID = $routeParams.id;

        /**
         * Retorna los valores en localStorage. Gracias
         * al servicio de Persistencia
         */
        $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
        $scope.lastID = PersistenceService.verify("taskLastID");


        /**Llamada a la función getItem */
        $scope.item = PersistenceService.getItem($scope.tasksCol, currentID);

        /**
         * Redirige al inicio, seteando el URL con un parámetro de control
         * de errores
         */
        if ($scope.item === undefined) {
          $location.path("/").search({error: 'notFound'});;
        }

        // Persiste los cambios de las variables @tasksCol y @lastID
        $scope.$watch('tasksCol', function(newValue, oldValue) {
            PersistenceService.save(localStorageKey, newValue);
        }, true);
        $scope.$watch('lastID', function(newValue, oldValue) {
            PersistenceService.save("taskLastID", newValue);
        }, true);

        $scope.deleteItem = function () {

          // Si solo existe una tarea, entonces limpia los valores
          if ($scope.tasksCol.length == 1) {
            $scope.tasksCol = [];
            $scope.lastID = 0;
          } else {
            /**
             * Retorna la posición actual de la tarea espcífica
             * en la colección de tareas almacenada en localStorage
             * para luego eliminarla
             */
            var target = PersistenceService.getItemIndex($scope.tasksCol, currentID);
            $scope.tasksCol.splice(target, 1);
          }

          $location.path('/');
        };

      }
    ])
;
