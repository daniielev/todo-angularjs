angular.module ('todoList.controllers')
.controller('ToDoCtrl', [
        '$scope',
        '$routeParams',
        'PersistenceService',
        function($scope, $routeParams, PersistenceService) {
            var localStorageKey = "List";

            /**
             * Busca en localStorage si existen las llaves @localStorageKey y
             *  @taskLastID, si existen entonces retorna sus valores, si no
             *  entonces los crea
             */
            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = PersistenceService.verify("taskLastID") || 0;

            $scope.notFound = false;

            $scope.addTask = function () {
              $scope.lastID++;

              // Creal el ojecto de la tarea, y luego lo agrega a la colección
              var taskItem = {
                  id : $scope.lastID,
                  name : $scope.name,
                  description : $scope.description,
                  dueDate : $scope.dueDate,
                  done : false
              }
              $scope.tasksCol.push(taskItem);

              // Limpia el formulario, tanto en valores como en estado de variables
              if ($scope.taskForm) {
                $scope.taskForm.$setPristine();
                $scope.taskForm.$setUntouched();
                $scope.name = "";
                $scope.description = "";
                $scope.dueDate = "";
              }
            }

            // Enciende el estado de error
            if ($routeParams.error != "" && $routeParams.error == "notFound") {
              $scope.notFound = true;
            }

            // Persiste los cambios en las variables
            $scope.$watch('tasksCol', function(newValue, oldValue) {
                PersistenceService.save(localStorageKey, newValue);
            }, true);
            $scope.$watch('lastID', function(newValue, oldValue) {
                PersistenceService.save("taskLastID", newValue);
            }, true);
        }
    ])