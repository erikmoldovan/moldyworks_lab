/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 11/26/12
 * Time: 3:15 PM
 * To change this template use File | Settings | File Templates.
 */
function TodoCtrl($scope){
    $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}
    ];

    $scope.addTodo = function(){
        $scope.todos.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
    };

    $scope.remaining = function(){
        var count = 0;
        angular.forEach($scope.todos, function(todo){
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function(){
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo){
            if(!todo.done) $scope.todos.push(todo);
        });
    };
}