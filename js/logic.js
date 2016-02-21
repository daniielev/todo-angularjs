angular.module('todoList',[
    'ngRoute',
    'persistence',
    'todoList.controllers'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/taskList.html',
            controller : 'ToDoCtrl'
        })
        .when('/description/:id', {
            templateUrl: 'views/taskDescription.html',
            controller : 'TaskCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);