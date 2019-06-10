const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// push into production => heroku would automatically know to go into 80 (within .env)

const { Pool } = require('pg');

// var pool = new Pool({
//   user: 'postgres',
//   password: '12345',
//   host: 'localhost',
//   database: 'postgres'
// });


var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/addStudentData', (req, res) => {
    // adds one student entry
    const {
      stid,
      name,
      lName,
      weight,
      height,
      hairColor,
      gpa,
      gender
    } = req.body;
    
    var query = `
      INSERT INTO student
      VALUES (${stid}, '${name}', '${lName}', ${(weight)}, ${(height)}, '${hairColor}', ${(gpa)}, '${gender}');
      `;

    pool.query(query, function(error, result){
      // if there is an error, there will be an error object here
      // if successful, the result will have it there
      // var results = { 'results': (result.rows[0].id) ? result.rows : [] };
      // res.render('pages/db', results);
      // req.body
      console.log("this is good", result);
      console.log("this is error", error);
      pool.query('SELECT * FROM student;', (err, renderResults) => {
        var results = { 'results': (renderResults.rows[0].stid) ? renderResults.rows : [] };
        res.render('pages/index', results);
      });
    });

  })
  .get('/', (req, res) => {
    // returns an entire array of student data
    pool.query('SELECT * FROM student;', function(error, result){
      // if there is an error, there will be an error object here
      // if successful, the result will have it there
      var results = { 'results': (result.rows[0].stid) ? result.rows : [] };
      res.render('pages/index', results);
      // req.body
      console.log("this is the error", error);
      console.log("this is the result", result);
      // res.send(JSON.stringify({rows: result.rows}));
    });
  })
  // .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
