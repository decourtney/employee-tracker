"use strict";
const express = require('express');
const Interrogator = require('./public/scripts/interrogator');
const Titler = require('./helpers/titler');
const QueryBuilder = require('./helpers/query-builder');
const mysql = require('mysql2/promise');
const fs = require('fs');
const { printTable } = require('console-table-printer');
const chalk = require('chalk');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const titler = new Titler();
const queryBuilder = new QueryBuilder();
const interrogator = new Interrogator();

// Read in the .sql files, convert to string and split by ';' = returns an array of commands and ';' is removed
const schemaSql = fs.readFileSync('./db/schema.sql').toString().split(';');
const seedSql = fs.readFileSync('./db/seeds.sql').toString().split(';');

// Queries for updating Interrogator
const updateQuery = [
  'SELECT department_name FROM department',
  'SELECT title FROM role',
  'SELECT first_name, last_name FROM employee',
  'SELECT distinct e1.first_name, e1.last_name FROM employee e1 INNER JOIN employee e2 ON e1.id = e2.manager_id'];


// Simple logging middleware
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${ PORT } 🚀`)
);


// Begin main
async function init()
{
  // Initialize mysql
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password'
  });

  // Ask if the user wants to rebuild the database (DROP, CREATE)
  // And if so, reseed the database?
  const isRebuildDatabase = await interrogator.beginInterrogation('refresh');

  // If user selected to rebuild database or the database doesn't exist
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

  // Display Main Title
  await titler.displayTitle('main');

  // Loop prompting questions, building queries, querying database, and displaying results
  while (true)
  {
    // Load main menu. If user selects exit then break out of loop
    let answers = await interrogator.beginInterrogation('main');
    if (answers[0].menuOptions === 'Exit') break;

    // Build query from answer
    let qBuilderResponses = queryBuilder.buildQuery(answers);
    // Query database
    let [queryResponse] = await db.query(qBuilderResponses.command);

    // DB Accessed Title
    await titler.displayTitle('accessed');

    // If the database was modified (CrUD)
    if (qBuilderResponses.isUpdate)
    {
      // Display message from built query
      console.log(chalk.yellowBright('\t' + qBuilderResponses.message + '\n'));

      // Update Interrogator (so choices match database)
      updateInterrogator(db)
    }
    else
    {
      // Display requested db info
      printTable(queryResponse);
    }
  }

  await titler.displayTitle('exit');
  // Close command-line connection to database
  db.end();
}

async function updateInterrogator(db)
{
  let currentDBInfo = [];

  // Iterate through updateQuery and perform db queries then pass results to Interrogator
  for (let q of updateQuery)
  {
    currentDBInfo.push((await db.query(q))[0]);
  }

  interrogator.updateDBInfo(currentDBInfo);
}

init();