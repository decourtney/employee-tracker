const inquirer = require('inquirer');
const cTable = require('console.table');


class Interrogator
{
  private departmentNames = [];
  private roles = [];
  private empNames = [];
  private managerNames = [];

  updateDBInfo(val)
  {
    // console.log(val);
    val[0].forEach(element =>
    {
      this.departmentNames.push(element.department_name);
    });
    val[1].forEach(element =>
    {
      this.roles.push(element.title);
    });
    val[2].forEach(element =>
    {
      this.empNames.push(element.first_name + ' ' + element.last_name);
    })
    val[3].forEach(element =>
    {
      this.managerNames.push(element.first_name + ' ' + element.last_name);
    })

    // console.log(this.departmentNames);
    // console.log(this.roles);
    // console.log(this.empNames);
    // console.log(this.managerNames);
  }

  async beginInterrogation(val)
  {
    let userInput = [];

    let questions = this.#getQuestions(val);

    userInput.push(await this.#interrogate(questions));
    if (userInput[0].menuOptions === 'Exit' || userInput[0].error === false || userInput[0].isBuild != null) { console.log('Exiting Interrogator'); return userInput }

    switch (userInput[0].menuOptions)
    {
      case 'View Data':
        console.log('user wants to view data');
        questions = this.#getQuestions('view');
        break;
      case 'Add Data':
        console.log('user wants to add data');
        questions = this.#getQuestions('add');
        break;
      case 'Update Data':
        console.log('user wants to update data');
        questions = this.#getQuestions('update');
        break;
      case 'Delete Data':
        console.log('user wants to delete data');
        questions = this.#getQuestions('delete');
        break;
      default:
        console.log('Selection Unaccounted For');
    }

    userInput.push(await this.#interrogate(questions));

    return userInput;
  }

  // NEED TO ADD VALIDATIONS TO QUESTIONS
  #getQuestions(menu)
  {
    let questions;
    switch (menu)
    {
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
            when: (answers) => { return answers.isBuild }
          }];
        break;

      // Extra space for readability

      case 'main':
        questions = [
          {
            type: 'list',
            name: 'menuOptions',
            message: 'What would you like to do?:',
            choices:
              [
                'View Data',
                'Add Data',
                'Update Data',
                'Delete Data',
                'Exit'
              ]
          }];
        break;

      // Extra space for readability

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
            when: (answers) => { if (answers.viewOptions === 'Employee') { return true } }
          },
          {
            type: 'list',
            name: 'viewEmpByManager',
            message: 'Which manager\'s employees would you like to see?:',
            choices: this.managerNames,
            when: (answers) => { if (answers.viewEmpOptions === 'Manager') { return true } }
          },
          {
            type: 'list',
            name: 'viewEmpByDepartment',
            message: 'Which department\'s employees would you like to see?:',
            choices: this.departmentNames,
            when: (answers) => { if (answers.viewEmpOptions === 'Department') { return true } }
          },
          {
            type: 'list',
            name: 'viewEmpByRole',
            message: 'Which role\'s employees would you like to see?:',
            choices: this.roles,
            when: (answers) => { if (answers.viewEmpOptions === 'Role') { return true } }
          }];
        break;

      // Extra space for readability

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
            when: (answers) => { if (answers.addOptions === 'Department') { return true } }
          },
          {
            type: 'input',
            name: 'roleName',
            message: 'Enter the role name:',
            when: (answers) => { if (answers.addOptions === 'Role') { return true } }
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the role salary:',
            when: (answers) => { if (answers.addOptions === 'Role') { return true } }
          },
          {
            type: 'list',
            name: 'roleDept',
            message: 'Enter the department this role belongs to:',
            choices: this.departmentNames,
            when: (answers) => { if (answers.addOptions === 'Role') { return true } }
          },
          {
            type: 'input',
            name: 'empFname',
            message: 'Enter the employee\'s first name:',
            when: (answers) => { if (answers.addOptions === 'Employee') { return true } }
          },
          {
            type: 'input',
            name: 'empLname',
            message: 'Enter the employee\'s last name:',
            when: (answers) => { if (answers.addOptions === 'Employee') { return true } }
          },
          {
            type: 'list',
            name: 'empRole',
            message: 'Enter the employee\'s role:',
            choices: this.roles,
            when: (answers) => { if (answers.addOptions === 'Employee') { return true } }
          },
          {
            type: 'list',
            name: 'empManager',
            message: 'Enter the employee\'s manager:',
            choices: this.empNames,
            when: (answers) => { if (answers.addOptions === 'Employee') { return true } }
          }];
        break;

      // Extra space for readability

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
            when: (answers) => { if (answers.updateOptions === 'Employee\'s Role') { return true } }
          },
          {
            type: 'list',
            name: 'updateEmpManager',
            message: 'What manager do you want to assign the employee to?:',
            choices: this.empNames,
            when: (answers) => { if (answers.updateOptions === 'Employee\'s Manager') { return true } }
          }];
        break;

      // Extra space for readability

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
            when: (answers) => { if (answers.deleteOptions === 'Department') { return true } }
          },
          {
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to delete?:',
            choices: this.roles,
            when: (answers) => { if (answers.deleteOptions === 'Role') { return true } }
          },
          {
            type: 'list',
            name: 'deleteEmp',
            message: 'Which employee would you like to delete?:',
            choices: this.empNames,
            when: (answers) => { if (answers.deleteOptions === 'Employee') { return true } }
          }];
        break;

      // Extra space for readability

      default:
        questions = [
          {
            type: 'confirm',
            name: 'error',
            message: 'Oops, something went wrong!\nCan we start over?:',
            default: true
          }];
    }

    return questions;
  }


  #interrogate(questions)
  {
    return new Promise((resolve, reject) =>
    {
      inquirer.prompt(questions)
        .then((answers) => { resolve(answers); })
        .catch((err) => { reject(err); })
    });
  }
}

module.exports = Interrogator;