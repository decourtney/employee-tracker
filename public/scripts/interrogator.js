"use strict";
const inquirer = require('inquirer');
const chalk = require('chalk');
class Interrogator {
    constructor() {
        this.departmentNames = [];
        this.roles = [];
        this.empNames = [];
        this.managerNames = [];
    }
    updateDBInfo(val) {
        // Index: 0 = List of Department names, 1 = List of Role names, 2 = List of Employees, 3 = List of Managers
        val[0].forEach(element => {
            this.departmentNames.push(element.department_name);
        });
        val[1].forEach(element => {
            this.roles.push(element.title);
        });
        val[2].forEach(element => {
            this.empNames.push(element.first_name + ' ' + element.last_name);
        });
        val[3].forEach(element => {
            this.managerNames.push(element.first_name + ' ' + element.last_name);
        });
    }
    async beginInterrogation(val) {
        let userInput = [];
        // This will be either Refresh DB prompt or the Main Menu questions
        let questions = this.getQuestions(val);
        // Check response for Exit, Rebuild database, or the default error catch
        userInput.push(await this.interrogate(questions));
        if (userInput[0].isBuild != null || userInput[0].menuOptions === 'Exit' || userInput[0].error === false) {
            console.log('Exiting Interrogator');
            return userInput;
        }
        // Get the group of questions based on Main Menu selection
        switch (userInput[0].menuOptions) {
            case 'View Data':
                // console.log('user wants to view data');
                questions = this.getQuestions('view');
                break;
            case 'Add Data':
                // console.log('user wants to add data');
                questions = this.getQuestions('add');
                break;
            case 'Update Data':
                // console.log('user wants to update data');
                questions = this.getQuestions('update');
                break;
            case 'Delete Data':
                // console.log('user wants to delete data');
                questions = this.getQuestions('delete');
                break;
            default:
                console.log('Selection Unaccounted For');
        }
        // Prompt questions
        userInput.push(await this.interrogate(questions));
        // Return collected user input
        return userInput;
    }
    getQuestions(menu) {
        let questions;
        switch (menu) {
            // Rebuild database questions
            case 'refresh':
                questions = [
                    {
                        type: 'confirm',
                        name: 'isBuild',
                        message: 'Would you like to rebuild the database?',
                        default: false
                    },
                    {
                        type: 'confirm',
                        name: 'isSeed',
                        message: 'Would you also like to seed the database?',
                        default: true,
                        when: (answers) => { return answers.isBuild; }
                    }
                ];
                break;
            // Main Menu questions
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
            // View Database Info questions
            case 'view':
                questions = [
                    {
                        type: 'list',
                        name: 'viewOptions',
                        message: 'What data would you like to see?:',
                        choices: ['Department', 'Role', 'Employee'],
                    },
                    {
                        type: 'list',
                        name: 'viewEmpOptions',
                        message: 'List the employees by:',
                        choices: ['All', 'Department', 'Role', 'Manager'],
                        when: (answers) => { if (answers.viewOptions === 'Employee') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'viewEmpByManager',
                        message: 'Which manager\'s employees would you like to see?:',
                        choices: this.managerNames,
                        when: (answers) => { if (answers.viewEmpOptions === 'Manager') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'viewEmpByDepartment',
                        message: 'Which department\'s employees would you like to see?:',
                        choices: this.departmentNames,
                        when: (answers) => { if (answers.viewEmpOptions === 'Department') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'viewEmpByRole',
                        message: 'Which role\'s employees would you like to see?:',
                        choices: this.roles,
                        when: (answers) => { if (answers.viewEmpOptions === 'Role') {
                            return true;
                        } }
                    }
                ];
                break;
            // Insert Into Database questions
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
                        } },
                        validate: this.validateIsName
                    },
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'Enter the role name:',
                        when: (answers) => { if (answers.addOptions === 'Role') {
                            return true;
                        } },
                        validate: this.validateIsName
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'Enter the role salary:',
                        when: (answers) => { if (answers.addOptions === 'Role') {
                            return true;
                        } },
                        validate: this.validateIsID
                    },
                    {
                        type: 'list',
                        name: 'roleDept',
                        message: 'Enter the department this role belongs to:',
                        choices: this.departmentNames,
                        when: (answers) => { if (answers.addOptions === 'Role') {
                            return true;
                        } }
                    },
                    {
                        type: 'input',
                        name: 'empFname',
                        message: 'Enter the employee\'s first name:',
                        when: (answers) => { if (answers.addOptions === 'Employee') {
                            return true;
                        } },
                        validate: this.validateIsName
                    },
                    {
                        type: 'input',
                        name: 'empLname',
                        message: 'Enter the employee\'s last name:',
                        when: (answers) => { if (answers.addOptions === 'Employee') {
                            return true;
                        } },
                        validate: this.validateIsName
                    },
                    {
                        type: 'list',
                        name: 'empRole',
                        message: 'Enter the employee\'s role:',
                        choices: this.roles,
                        when: (answers) => { if (answers.addOptions === 'Employee') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'empManager',
                        message: 'Enter the employee\'s manager:',
                        choices: this.empNames,
                        when: (answers) => { if (answers.addOptions === 'Employee') {
                            return true;
                        } }
                    }
                ];
                break;
            // Update Database questions
            case 'update':
                questions = [
                    {
                        type: 'list',
                        name: 'updateOptions',
                        message: 'What would you like to update?:',
                        choices: ['Employee\'s Role', 'Employee\'s Manager'],
                    },
                    {
                        type: 'list',
                        name: 'updateEmp',
                        message: 'Which employee do you want to update?:',
                        choices: this.empNames,
                    },
                    {
                        type: 'list',
                        name: 'updateEmpRole',
                        message: 'What role do you want to assign to this employee?:',
                        choices: this.roles,
                        when: (answers) => { if (answers.updateOptions === 'Employee\'s Role') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'updateEmpManager',
                        message: 'What manager do you want to assign the employee to?:',
                        choices: this.empNames,
                        when: (answers) => { if (answers.updateOptions === 'Employee\'s Manager') {
                            return true;
                        } }
                    }
                ];
                break;
            // Delete Info from Database questions
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
                        choices: this.departmentNames,
                        when: (answers) => { if (answers.deleteOptions === 'Department') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'deleteRole',
                        message: 'Which role would you like to delete?:',
                        choices: this.roles,
                        when: (answers) => { if (answers.deleteOptions === 'Role') {
                            return true;
                        } }
                    },
                    {
                        type: 'list',
                        name: 'deleteEmp',
                        message: 'Which employee would you like to delete?:',
                        choices: this.empNames,
                        when: (answers) => { if (answers.deleteOptions === 'Employee') {
                            return true;
                        } }
                    }
                ];
                break;
            // Default Error-catch
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
    }
    validateIsName(val) {
        // Checks for just about any variation of an english character name
        if (!/^[a-z ,.'-]+$/i.test(val)) {
            return chalk.redBright('Please enter a valid name.');
        }
        return true;
    }
    validateIsID(val) {
        // Checks for 12 digit number including up to 2 decimal places
        if (!/^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(val)) {
            return chalk.redBright('Please enter a valid salary.');
        }
        return true;
    }
    interrogate(questions) {
        return new Promise((resolve, reject) => {
            inquirer.prompt(questions)
                .then((answers) => { resolve(answers); })
                .catch((err) => { reject(err); });
        });
    }
}
module.exports = Interrogator;
