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

  // Create Interrogator instance with current DB info
  let updateStuff = (await db.query('select first_name, last_name from employee'));
  console.log((updateStuff));


  // while (true)
  // {
  //   let answers = await interrogator.beginInterrogation('main');
  //   if (answers[0].menuOptions === 'Exit') break;

  //   // console.log(sqlQueries.buildQuery(answers));
  //   let qBuilderResponses = sqlQueries.buildQuery(answers);
  //   let [queryResponse] = await db.query(qBuilderResponses[0]);
  //   console.log(queryResponse);
  //   console.table(queryResponse);
  //   // printTable(queryResponse);

  //   if (qBuilderResponses[1] === true)
  //   {
  //     // update interrogator with db info
  //   }
  // }

  // Close connection to database
  db.end();
}

init();