angular.module('persistence.services')

.service ('PersistenceService',

    function($routeParams) {

        var saveKey = function (key, object) {
            localStorage.setItem(key, angular.toJson(object)); 
        };

        var verifyKey = function(key) {
            return angular.fromJson(localStorage.getItem(key));
        };

        var removeKey = function(key) {
            localStorage.removeItem(key);
        };

        /**Esta funcion es para retornar el Id de cada tarea*/
        var getItem = function(tasksCollection, targetID) {
            var item;

            for (var i = 0; i < tasksCollection.length; i++) {
                if (tasksCollection[i].id == targetID) {
                    item = tasksCollection[i];
                }
            };

            return item;
        };

        /**Esta función es para retornar la posición de las tareas*/
        var getItemIndex = function (tasksCollection, targetID) {
            var index;

            for (var i = 0; i < tasksCollection.length; i++) {
                if (tasksCollection[i].id == targetID) {
                    index = i;
                }
            };

            return index;
        };

        return {
            save         : saveKey,
            verify       : verifyKey,
            remove       : removeKey,
            getItem      : getItem,
            getItemIndex : getItemIndex
        };
    }
);