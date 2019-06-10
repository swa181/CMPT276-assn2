const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// push into production => heroku would automatically know to go into 80 (within .env)

const { Pool } = require('pg');

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
      // console.log("this is good", result);
      // console.log("this is error", error);
      pool.query('SELECT * FROM student;', (err, renderResults) => {
        pool.query('SELECT MAX(stid) FROM student;', function(maxIdError, maxId) {
          var results = {
            'results': renderResults.rows ? renderResults.rows : [],
            'maxId': renderResults.rows ? maxId.rows[0].max : 0
          };
          res.render('pages/index', results);
        });
      });
    });

  })
  .get('/', (req, res) => {
    // returns an entire array of student data
    pool.query('SELECT * FROM student;', function(error, result){
      pool.query('SELECT MAX(stid) FROM student;', function(maxIdError, maxId) {
        var results = {
          'results': result.rows ? result.rows : [],
          'maxId': result.rows ? maxId.rows[0].max : 0
          };
        // console.log(results);
        res.render('pages/index', results);
      });

    });
  })
  .post('/sortStudentData', (req, res) => {
    const {
      studentSort
    } = req.body;

    var lastNameSort = studentSort === 'name' ? ', lname ASC' : '';

    var query = `
      SELECT *
      FROM student
      ORDER BY ${studentSort} ASC ${lastNameSort};
      `;

    pool.query(query, (err, renderResults) => {
      pool.query('SELECT MAX(stid) FROM student;', function(maxIdError, maxId) {
        var results = {
          'results': renderResults.rows ? renderResults.rows : [],
          'maxId': renderResults.rows ? maxId.rows[0].max : 0
        };
        res.render('pages/index', results);
      });
    });

  })
  .post('/editStudentData', (req, res) => {
    // edits one student entry
    const {
      stid,
      name,
      lName,
      weight,
      height,
      hairColor,
      gpa,
      gender,
      willDelete
    } = req.body;

    var query = '';
    
    // We need to keep track of the old values and the new values
    if (willDelete == "true") {
      query = `
        DELETE FROM student
        WHERE stid=${stid};
        `;
    } else {
      query = `
        UPDATE student
        SET name='${name}', lName='${lName}', weight=${weight}, height=${height}, hairColor='${hairColor}', gpa=${gpa}, gender='${gender}'
        WHERE stid=${stid};
        `;
    }

    pool.query(query, function(error, result){
      // var results = { 'results': (result.rows[0].id) ? result.rows : [] };
      // res.render('pages/db', results);
      pool.query('SELECT * FROM student;', (err, renderResults) => {
        pool.query('SELECT MAX(stid) FROM student;', function(maxIdError, maxId) {
          var results = {
            'results': renderResults.rows ? renderResults.rows : [],
            'maxId': renderResults.rows ? maxId.rows[0].max : 0
          };
          res.render('pages/index', results);
        });
      });
    });

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
