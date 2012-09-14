/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/13/12
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */
var tasks = [];

function addTask(){
    'use strict';
    var task = document.getElementById('task');
    var output = document.getElementById('output');

    var message = '';

    if(task.value){
        tasks.push(task.value);

        message = '<h2>To-Do</h2><ol>';

        for(var i = 0, count = tasks.length; i < count; i++){
            message += '<li>' + tasks[i] + '</li>';
        }

        message += '</ol>';

        output.innerHTML = message;
    }

    return false;
}

function init(){
    'use strict';
    document.getElementById('theForm').onsubmit = addTask;
}

window.onload = init;