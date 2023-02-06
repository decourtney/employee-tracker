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

// [{ menuOptions: 'View Data' }, { viewOptions: 'Department' }]
query.get('/employee', (req, res) =>
{
  const sql = queryBuilder.buildQuery([{ menuOptions: 'View Data' }, { viewOptions: 'Department' }]).command;

  db.query(sql, (err, rows) =>
  {
    if (err)
    {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Get',
      data: rows
    });
  });
});

query.get('/employee/:department_name', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([{ menuOptions: 'View Data' }, { viewOptions: 'Employee', viewEmpOptions: 'Department', viewEmpByDepartment: params.department_name }]).command;

  db.query(sql, (err, rows) =>
  {
    if (err)
    {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Get',
      data: rows
    });
  });
});

module.exports = query;