class SQLQueries
{
  buildQuery(val)
  {
    let query;
    switch (val[0].menuOptions)
    {
      case 'View Data':
        query = this.createViewQuery(val[1]);
        break;
      case 'Add Data':
        query = this.createAddQuery(val[1]);
        break;
      case 'Update Data':
        query = this.createUpdateQuery(val[1]);
        break;
      case 'Delete Data':
        query = this.createDeleteQuery(val[1]);
        break;
    }

    return query;
  }

  createViewQuery(val)
  {
    let q;

    switch (val.viewOptions)
    {
      case 'Employee':
        switch (val.viewEmpOptions)
        {
          case 'All':
            q = {
              query: `SELECT e1.id AS ID, 
                        CONCAT (e1.first_name, ' ', e1.last_name) AS Name, 
                        role.title AS Title, department.department_name AS Department, 
                        role.salary AS Salary, 
                        CONCAT (e2.first_name, ' ', e2.last_name) AS Manager 
                      FROM employee e1 
                      LEFT JOIN employee e2 ON e2.id = e1.manager_id 
                      LEFT JOIN role ON e1.role_id = role.id 
                      LEFT JOIN department ON role.department_id = department.id 
                      ORDER BY e1.id`,
              isUpdate: false
            };
            break;

          case 'Department':
            q = {
              query: `SELECT e1.id AS ID, 
                        CONCAT (e1.first_name, ' ', e1.last_name) AS Name, 
                        role.title AS Title, department.department_name AS Department, 
                        role.salary AS Salary, 
                        CONCAT (e2.first_name, ' ', e2.last_name) AS Manager 
                      FROM employee e1 
                      LEFT JOIN employee e2 ON e2.id = e1.manager_id 
                      LEFT JOIN role ON e1.role_id = role.id 
                      LEFT JOIN department ON role.department_id = department.id 
                      WHERE department_name = '${ val.viewEmpByDepartment }' 
                      ORDER BY e1.id`,
              isUpdate: false
            };
            break;

          case 'Role':
            q = {
              query: `SELECT e1.id AS ID, 
                        CONCAT (e1.first_name, ' ', e1.last_name) AS Name, 
                        role.title AS Title, department.department_name AS Department, 
                        role.salary AS Salary, 
                        CONCAT (e2.first_name, ' ', e2.last_name) AS Manager 
                      FROM employee e1 
                      LEFT JOIN employee e2 ON e2.id = e1.manager_id 
                      LEFT JOIN role ON e1.role_id = role.id 
                      LEFT JOIN department ON role.department_id = department.id 
                      WHERE role.title = '${ val.viewEmpByRole }' 
                      ORDER BY e1.id`,
              isUpdate: false
            };
            break;

          case 'Manager':
            q = {
              query: `SELECT e1.id AS ID, 
                        CONCAT (e1.first_name, ' ', e1.last_name) AS Name, 
                        role.title AS Title, department.department_name AS Department, 
                        role.salary AS Salary, 
                        CONCAT (e2.first_name, ' ', e2.last_name) AS Manager 
                      FROM employee e1 
                      LEFT JOIN employee e2 ON e2.id = e1.manager_id 
                      LEFT JOIN role ON e1.role_id = role.id 
                      LEFT JOIN department ON role.department_id = department.id 
                      WHERE CONCAT (e2.first_name, ' ', e2.last_name) = '${ val.viewEmpByManager }' 
                      ORDER BY e1.id`,
              isUpdate: false
            };
            break;
        }
        break;

      case 'Role':
        q = {
          query: `SELECT role.id AS ID, role.title AS Title, department.department_name AS Department, role.salary AS Salary
                  FROM role
                  LEFT JOIN department ON department.id = role.department_id
                  ORDER BY role.id`,
          isUpdate: false
        };
        break;

      case 'Department':
        q = {
          query: `SELECT department.id AS ID, department_name AS Department
                  FROM department
                  ORDER BY department.id`,
          isUpdate: false
        };
        break;
    }

    return q;
  }

  createAddQuery(val)
  {
    let q;

    switch (val.addOptions)
    {
      case 'Department':
        q = {
          query: `INSERT INTO department (department_name) VALUES ('${ val.deptName }')`,
          isUpdate: true,
          message: `Added the ${ val.deptName } department to the database.`
        };
        break;
      case 'Role':
        q = {
          query: `INSERT INTO role (title, salary, department_id)
                  SELECT '${ val.roleName }', '${ val.roleSalary }', department.id
                  FROM department
                  WHERE department_name = '${ val.roleDept }'`,
          isUpdate: true,
          message: `Added the ${ val.roleName } role to the database.`
        };
        break;

      case 'Employee':
        q = {
          query: `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                  SELECT '${ val.empFname }', '${ val.empLname }', role.id, e.id
                  FROM employee AS e
                  LEFT JOIN role ON role.title = '${ val.empRole }'
                  WHERE CONCAT (e.first_name, ' ', e.last_name) = '${ val.empManager }';`,
          isUpdate: true,
          message: `Added ${ val.empFname } ${ val.empLname } to the database.`
        };
        break;
    }

    return q;
  }

  createUpdateQuery(val)
  {
    let q;

    switch (val.updateOptions)
    {
      case 'Employee\'s Role':
        q = {
          query: `UPDATE employee
                  LEFT JOIN role AS r ON r.title = '${ val.updateEmpRole }'
                  SET employee.role_id = r.id
                  WHERE CONCAT (employee.first_name, ' ', employee.last_name) = '${ val.updateEmp }'`,
          isUpdate: true,
          message: `Reassigned ${ val.updateEmp } as a ${ val.updateEmpRole }.`
        };
        break;
      case 'Employee\'s Manager':
        q = {
          query: `UPDATE employee
                  LEFT JOIN employee AS e2 ON CONCAT (e2.first_name, ' ', e2.last_name) = '${ val.updateEmpManager }'
                  SET employee.manager_id = e2.id
                  WHERE CONCAT (employee.first_name, ' ', employee.last_name) = '${ val.updateEmp }'`,
          isUpdate: true,
          message: `Reassigned ${ val.updateEmpManager } as ${ val.updateEmp }'s manager.`
        }
        break;
    }

    return q;
  }

  createDeleteQuery(val)
  {
    let q;

    switch (val.deleteOptions)
    {
      case 'Department':
        q = {
          query: `DELETE FROM department
                  WHERE department_name = '${ val.deleteDept }'`,
          isUpdate: true,
          message: `${ val.deleteDept } has been removed from the database.`
        }
        break;
      case 'Role':
        q = {
          query: `DELETE FROM role
                  WHERE role.title = '${ val.deleteRole }'`,
          isUpdate: true,
          message: `${ val.deleteRole } has been removed from the database.`
        }
        break;
      case 'Employee':
        q = {
          query: `DELETE FROM employee
                  WHERE CONCAT (employee.first_name, ' ', employee.last_name) = '${ val.deleteEmp }'`,
          isUpdate: true,
          message: `${ val.deleteEmp } has been removed from the database.`
        }
        break;
    }

    return q;
  }
}
module.exports = SQLQueries;