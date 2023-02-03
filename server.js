"use strict";
const Interrogator = require('./interrogator');
const Titler = require('./titler');
const mysql = require('mysql2');
const query = require('./query');
const interrogator = new Interrogator();
const titler = new Titler();
async function init() {
    titler.displayTitle('main');
    // const pool = mysql.createPool({
    //   host: 'localhost',
    //   user: 'root',
    //   database: 'workforce_db',
    //   waitForConnections: true,
    //   connectionLimit: 10,
    //   maxIdle: 10,
    //   idleTimeout: 60000,
    //   queueLimit: 0
    // });
    // const promisePool = pool.promise();
    // const [rows, fields] = await promisePool.query();
    // After connecting to the database check if the user wants to DROP, CREATE, and RESEED the database for a fresh start.
    while (true) {
        let answers = await interrogator.displayMainMenu();
        if (answers[0].menuOptions === 'Exit')
            break;
        console.log(answers);
    }
    // let answers = await interrogator.displayMainMenu();
    // console.log('Server received from Interrogator:')
    // console.log(answers);
}
init();
