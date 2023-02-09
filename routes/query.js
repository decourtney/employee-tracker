"use strict";
// This is a large collection of routes for specific DB queries
const query = require('express').Router();
const QueryBuilder = require('../helpers/query-builder');
const mysql = require('mysql2');
const queryBuilder = new QueryBuilder;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'workforce_db'
});
// Create
query.post('/department/create', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Add Data' },
        {
            addOptions: 'Department',
            deptName: params.deptName
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Create department',
            data: rows
        });
    }).catch(console.log);
});
query.post('/role/create', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Add Data' },
        {
            addOptions: 'Role',
            roleName: params.roleName,
            roleDept: params.roleDept,
            roleSalary: params.roleSalary
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Create role',
            data: rows, fields
        });
    }).catch(console.log);
});
query.post('/employee/create', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Add Data' },
        {
            addOptions: 'Employee',
            empFname: params.empFname,
            empLname: params.empLname,
            empRole: params.empRole,
            empManager: params.empManager
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Create employee',
            data: rows, fields
        });
    }).catch(console.log);
});
// READ
query.get('/employee', (req, res) => {
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'View Data' },
        {
            viewOptions: 'Employee',
            viewEmpOptions: 'All'
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get all employees',
            data: rows
        });
    }).catch(console.log);
});
query.get('/employee/department', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'View Data' },
        {
            viewOptions: 'Employee',
            viewEmpOptions: 'Department',
            viewEmpByDepartment: params.viewEmpByDepartment
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get employees by department',
            data: rows
        });
    }).catch(console.log);
});
query.get('/employee/role', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'View Data' },
        {
            viewOptions: 'Employee',
            viewEmpOptions: 'Role',
            viewEmpByRole: params.viewEmpByRole
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get employees by role',
            data: rows
        });
    }).catch(console.log);
});
query.get('/employee/manager', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'View Data' },
        {
            viewOptions: 'Employee',
            viewEmpOptions: 'Manager',
            viewEmpByManager: params.viewEmpByManager
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get employees by manager',
            data: rows
        });
    }).catch(console.log);
});
query.get('/role', (req, res) => {
    const params = req.params;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'View Data' },
        { viewOptions: 'Role' }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get all roles',
            data: rows
        });
    }).catch(console.log);
});
query.get('/department', (req, res) => {
    const params = req.params;
    const sql = queryBuilder.buildQuery([{ menuOptions: 'View Data' }, { viewOptions: 'Department' }]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Get all departments',
            data: rows
        });
    }).catch(console.log);
});
// Update
query.put('/employee/role', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Update Data' },
        {
            updateOptions: 'Employee\'s Role',
            updateEmp: params.updateEmp,
            updateEmpRole: params.updateEmpRole
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Update employee role',
            data: rows
        });
    }).catch(console.log);
});
query.put('/employee/manager', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Update Data' },
        {
            updateOptions: 'Employee\'s Manager',
            updateEmp: params.updateEmp,
            updateEmpManager: params.updateEmpManager
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Update employee manager',
            data: rows
        });
    }).catch(console.log);
});
// Delete
query.delete('/department', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Delete Data' },
        {
            deleteOptions: 'Department',
            deleteDept: params.deleteDept
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Delete department',
            data: rows
        });
    }).catch(console.log);
});
query.delete('/role', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Delete Data' },
        {
            deleteOptions: 'Role',
            deleteRole: params.deleteRole
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Delete role',
            data: rows
        });
    }).catch(console.log);
});
query.delete('/employee', ({ body }, res) => {
    const params = body;
    const sql = queryBuilder.buildQuery([
        { menuOptions: 'Delete Data' },
        {
            deleteOptions: 'Employee',
            deleteEmp: params.deleteEmp
        }
    ]).command;
    db.promise().query(sql).then(([rows, fields]) => {
        res.json({
            message: 'Delete employee',
            data: rows
        });
    }).catch(console.log);
});
module.exports = query;
