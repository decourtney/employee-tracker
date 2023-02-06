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
query.post('/department/create/:name', ({body}, res) =>
{
  const params = body.name;
  console.log(params);
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'Add Data' },
    {
      addOptions: 'Department',
      deptName: params.name
    }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get all employees',
      data: rows
    });
  }).catch(console.log)
});

// READ
query.get('/employee', (req, res) =>
{
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'View Data' },
    {
      viewOptions: 'Department'
    }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get all employees',
      data: rows
    });
  }).catch(console.log)
});

query.get('/employee/department/:name', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'View Data' },
    {
      viewOptions: 'Employee',
      viewEmpOptions: 'Department',
      viewEmpByDepartment: params.name
    }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get employees by department',
      data: rows
    });
  }).catch(console.log)
});

query.get('/employee/role/:title', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'View Data' },
    {
      viewOptions: 'Employee',
      viewEmpOptions: 'Role',
      viewEmpByRole: params.title
    }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get employees by role',
      data: rows
    });
  }).catch(console.log)
});

query.get('/employee/manager/:name', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'View Data' },
    {
      viewOptions: 'Employee',
      viewEmpOptions: 'Manager',
      viewEmpByManager: params.name
    }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get employees by manager',
      data: rows
    });
  }).catch(console.log)
});

query.get('/role', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([
    { menuOptions: 'View Data' },
    { viewOptions: 'Role' }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get all roles',
      data: rows
    });
  }).catch(console.log)
});

query.get('/department', (req, res) =>
{
  const params = req.params
  console.log(params);
  const sql = queryBuilder.buildQuery([{ menuOptions: 'View Data' }, { viewOptions: 'Department' }]).command;

  db.promise().query(sql).then(([rows, fields]) =>
  {
    res.json({
      message: 'Get all departments',
      data: rows
    });
  }).catch(console.log)
});
module.exports = query;