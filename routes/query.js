"use strict";
const query = require('express').Router();
const queryBuilder = require('../helpers/query-builder');
const mysql = require('mysql2/promise');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'workforce_db'
});
// [{ menuOptions: 'View Data' }, { viewOptions: 'Department' }]
query.get('/department', (req, res) => {
    const sql = `SELECT e1.id AS ID, 
                        CONCAT (e1.first_name, ' ', e1.last_name) AS Name, 
                        role.title AS Title, department.department_name AS Department, 
                        role.salary AS Salary, 
                        CONCAT (e2.first_name, ' ', e2.last_name) AS Manager 
                      FROM employee e1 
                      LEFT JOIN employee e2 ON e2.id = e1.manager_id 
                      LEFT JOIN role ON e1.role_id = role.id 
                      LEFT JOIN department ON role.department_id = department.id 
                      ORDER BY e1.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Get all department success',
            data: rows
        });
    });
});
module.exports = query;
