"use strict";
const Interrogator = require('./interrogator');
const Titler = require('./titler');
const mysql = require('mysql2/promise');
const SQLQueries = require('./sql-queries');
const express = require('express');
const fs = require('fs');
const { printTable } = require('console-table-printer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3306;
const app = express();

const titler = new Titler();
const sqlQueries = new SQLQueries();
const interrogator = new Interrogator();

// Read in the .sql files, convert to string and split by ';' = returns an array of commands and ';' is removed
const schemaSql = fs.readFileSync('./schema.sql').toString().split(';');
const seedSql = fs.readFileSync('./seeds.sql').toString().split(';');

const updateQuery = [
  'SELECT department_name FROM department',
  'SELECT title FROM role',
  'SELECT first_name, last_name FROM employee',
  'SELECT distinct e1.first_name, e1.last_name FROM employee e1 INNER JOIN employee e2 ON e1.id = e2.manager_id']

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function init()
{
  titler.displayTitle('main');

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
  });

  // Ask if the user wants to rebuild the database (DROP, CREATE)
  // And if so, reseed the database?
  const isRebuildDatabase = await interrogator.beginInterrogation('refresh');
  // If user selected to rebuild database  
  if (isRebuildDatabase[0].isBuild)
  {
    schemaSql.forEach(async element =>
    {
      // Make sure the element isnt an empty string (Any space between commands or trailing white space)
      if (element.trim())
        await db.query(element.trim());
    });
    console.log('Database has been rebuilt');

    // If user selected to seed rebuilt database
    if (isRebuildDatabase[0].isSeed)
    {
      seedSql.forEach(async element =>
      {
        // Make sure the element isnt an empty string with trim() (Any space between commands or trailing white space)
        if (element.trim())
          await db.query(element.trim());
      });
      console.log('Database has been seeded');
    }
  }

  // If the database wasn't rebuilt then we need to utilize the existing.
  await db.query('use workforce_db');

  // Update Interrogator instance with initial DB info
  await updateInterrogator(db);

  while (true)
  {
    let answers = await interrogator.beginInterrogation('main');
    if (answers[0].menuOptions === 'Exit') break;

    let qBuilderResponses = sqlQueries.buildQuery(answers);
    let [queryResponse] = await db.query(qBuilderResponses.query);

    if (qBuilderResponses.isUpdate)
    {
      console.log(qBuilderResponses.message);
      // update interrogator with db info
      updateInterrogator(db)
    }
    else
    {
      printTable(queryResponse);
    }
  }

  // Close connection to database
  db.end();
}

async function updateInterrogator(db)
{
  let currentDBInfo = [];

  for (let q of updateQuery)
  {
    currentDBInfo.push((await db.query(q))[0]);
  }

  interrogator.updateDBInfo(currentDBInfo);
}

init();