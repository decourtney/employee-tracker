"use strict";
const Interrogator = require('./interrogator');
const Titler = require('./titler');
const mysql = require('mysql2');
const query = require('./query');
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3306;
const app = express();
const interrogator = new Interrogator();
const titler = new Titler();
const schemaSql = fs.readFileSync('./schema.sql').toString().split(';');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function init()
{
  let schemaCommands = [];
  titler.displayTitle('main');

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'workforce_db'
  });

  schemaSql.forEach(element =>
  {
    console.log(element.replace('\n', ''));
  });
  

  // After connecting to the database check if the user wants to DROP, CREATE, and RESEED the database for a fresh start.

  // while (true)
  // {
  //   let answers = await interrogator.displayMainMenu();
  //   if (answers[0].menuOptions === 'Exit') break;

  //   console.log(answers);
  // }

  // let answers = await interrogator.displayMainMenu();
  // console.log('Server received from Interrogator:')
  // console.log(answers);
}

init();