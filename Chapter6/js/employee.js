/**
 * Created with JetBrains PhpStorm.
 * User: erik.moldovan
 * Date: 9/14/12
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */
function process(){
    'use strict';
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var department = document.getElementById('department').value;

    var output = document.getElementById('output');

    var employee = {
        firstName : firstName,
        lastName : lastName,
        department : department,
        hireDate: new Date()
    };

    var message = '<h2>Employee Added</h2>Name: ' + employee.lastName + ', ' + employee.firstName + '<br>';
    message += 'Department: ' + employee.department + '<br>';
    message += 'Hire Date: ' + employee.hireDate.toDateString();

    output.innerHTML = message;

    return false;
}

function init(){
    'use strict';
    document.getElementById('theForm').onsubmit = process;
}

window.onload = init;