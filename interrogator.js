"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Interrogator_instances, _Interrogator_getQuestions, _Interrogator_interrogate;
const inquirer = require('inquirer');
const cTable = require('console.table');
class Interrogator {
    constructor() {
        _Interrogator_instances.add(this);
    }
    async displayMainMenu() {
        let answers;
        while (true) {
            let questions = __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_getQuestions).call(this, 'main');
            answers = await __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_interrogate).call(this, questions);
            if (answers.menuOptions === 'Exit') {
                console.log('Exiting Interrogator');
                break;
            }
            switch (answers.menuOptions) {
                case 'View Data':
                    console.log('user wants to view data');
                    questions = __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_getQuestions).call(this, 'view');
                    break;
                case 'Add Data':
                    console.log('user wants to add data');
                    questions = __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_getQuestions).call(this, 'add');
                    break;
                case 'Update Data':
                    console.log('user wants to update data');
                    questions = __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_getQuestions).call(this, 'update');
                    break;
                case 'Delete Data':
                    console.log('user wants to delete data');
                    questions = __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_getQuestions).call(this, 'delete');
                    break;
                default:
                    console.log('Selection Unaccounted For');
            }
            answers = await __classPrivateFieldGet(this, _Interrogator_instances, "m", _Interrogator_interrogate).call(this, questions);
            // Do stuff with returned data
            console.log(answers);
        }
        return answers;
    }
}
_Interrogator_instances = new WeakSet(), _Interrogator_getQuestions = function _Interrogator_getQuestions(menu) {
    let questions;
    switch (menu) {
        case 'main':
            questions = [
                {
                    type: 'list',
                    name: 'menuOptions',
                    message: 'What would you like to do?:',
                    choices: [
                        'View Data',
                        'Add Data',
                        'Update Data',
                        'Delete Data',
                        'Exit'
                    ]
                }
            ];
            break;
        case 'view':
            questions = [
                {
                    type: 'list',
                    name: 'viewOptions',
                    message: 'What data would you like to see?:',
                    choices: ['Departments', 'Roles', 'Employees'],
                },
                {
                    type: 'list',
                    name: 'viewEmpOptions',
                    message: 'How would you like to list employees?:',
                    choices: ['All', 'By Manager', 'By Department'],
                    when: (answers) => { if (answers.viewOptions === 'Employees') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'viewEmpByManager',
                    message: 'Which manager\'s employees would you like to see?:',
                    choices: ['Names of Managers'],
                    when: (answers) => { if (answers.viewEmpOptions === 'By Manager') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'viewEmpByDepartment',
                    message: 'Which departments employees would you like to see?:',
                    choices: ['Names of Departments'],
                    when: (answers) => { if (answers.viewEmpOptions === 'By Department') {
                        return true;
                    } }
                }
            ];
            break;
        case 'add':
            questions = [
                {
                    type: 'list',
                    name: 'addOptions',
                    message: 'What data would you like to add?:',
                    choices: ['Department', 'Role', 'Employee']
                },
                {
                    type: 'input',
                    name: 'deptName',
                    message: `Enter the department name:`,
                    when: (answers) => { if (answers.addOptions === 'Department') {
                        return true;
                    } }
                },
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the role name:',
                    when: (answers) => { if (answers.addOptions === 'Role') {
                        return true;
                    } }
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter the role salary:',
                    when: (answers) => { if (answers.addOptions === 'Role') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'roleDept',
                    message: 'Enter the department this role belongs to:',
                    choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'],
                    when: (answers) => { if (answers.addOptions === 'Role') {
                        return true;
                    } }
                },
                {
                    type: 'input',
                    name: 'empFname',
                    message: 'Enter the employee first name:',
                    when: (answers) => { if (answers.addOptions === 'Employee') {
                        return true;
                    } }
                },
                {
                    type: 'input',
                    name: 'empLname',
                    message: 'Enter the employee last name:',
                    when: (answers) => { if (answers.addOptions === 'Employee') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'Enter the employee role:',
                    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountatn', 'Legal Team Lead', 'Lawyer'],
                    when: (answers) => { if (answers.addOptions === 'Employee') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'Enter the employee manager:',
                    choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown'],
                    when: (answers) => { if (answers.addOptions === 'Employee') {
                        return true;
                    } }
                }
            ];
            break;
        case 'update':
            questions = [
                {
                    type: 'list',
                    name: 'updateOptions',
                    message: 'What would you like to update?:',
                    choices: ['Employee Role', 'Employee Manager'],
                },
                {
                    type: 'list',
                    name: 'updateEmp',
                    message: 'Which employee do you want to update?:',
                    choices: ['Name of Employees'],
                },
                {
                    type: 'list',
                    name: 'updateEmpRole',
                    message: 'What role do you want to assign the employee?:',
                    choices: ['Sales Lead', 'Sales Person'],
                    when: (answers) => { if (answers.updateOptions === 'Employee Role') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'updateEmpManager',
                    message: 'What manager do you want to assign the employee?:',
                    choices: ['Names of Managers'],
                    when: (answers) => { if (answers.updateOptions === 'Employee Manager') {
                        return true;
                    } }
                }
            ];
            break;
        case 'delete':
            questions = [
                {
                    type: 'list',
                    name: 'deleteOptions',
                    message: 'What data would you like to delete?:',
                    choices: ['Department', 'Role', 'Employee']
                },
                {
                    type: 'list',
                    name: 'deleteDept',
                    message: 'Which department would you like to delete?:',
                    choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
                    when: (answers) => { if (answers.deleteOptions === 'Department') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'deleteRole',
                    message: 'Which role would you like to delete?:',
                    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer'],
                    when: (answers) => { if (answers.deleteOptions === 'Role') {
                        return true;
                    } }
                },
                {
                    type: 'list',
                    name: 'deleteEmp',
                    message: 'Which employee would you like to delete?:',
                    choices: ['Names of Employees'],
                    when: (answers) => { if (answers.deleteOptions === 'Employee') {
                        return true;
                    } }
                }
            ];
            break;
        default:
            questions = [
                {
                    type: 'confirm',
                    name: 'error',
                    message: 'Oops, something went wrong!\nCan we start over?:',
                    default: true
                }
            ];
    }
    return questions;
}, _Interrogator_interrogate = function _Interrogator_interrogate(questions) {
    return new Promise((resolve, reject) => {
        inquirer.prompt(questions)
            .then((answers) => { resolve(answers); })
            .catch((err) => { reject(err); });
    });
};
module.exports = Interrogator;