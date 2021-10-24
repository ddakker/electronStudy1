'use strict'
// var $ = require('jquery');
// window.$ = window.jQuery = require('jquery');
window.$ = window.jQuery = require('jquery')
// window.w2ui = require('w2ui');
window.Bootstrap = require('bootstrap')
// window.Grid = require('gridjs')
var Grid = require('gridjs').Grid
// var Grid = require('../node_modules/gridjs/dist/gridjs.js').Grid;

// if (module) module.exports = {w2ui: w2ui};
// var w2ui_top = require("../lib/w2ui/w2ui-1.4.2.js"); //use explicit path (loading via browser path in package.json didn't seem to work)

// global.w2ui = w2ui_top.w2ui; //kludge: w2ui also expects its own objects to be global

const button2 = document.getElementById('btSql');
button2.addEventListener('click', () => {
  console.log("click");
  sql();
});

function sql() {
  console.log('test2');

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: '192.168.23.23',
    user: 'test',
    password: 'test',
    database: 'test'
  });

  connection.connect();
  var sql = 'SELECT * FROM user LIMIT 5';
  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error.code);
    } else {
      console.log(results);
      var data = [];
      results.forEach((row) => {
        console.log(row);
        data.push({username: row.username, password: row.password})
      })
      console.log('data: ', data);
      /* $('#grid').w2grid({
        name: 'grid',
        method: 'GET', // need this to avoid 412 error on Safari
        columns: [
          { field: 'name', text: 'Name', size: '50%' },
          { field: 'password', text: 'Password', size: '50%' }
        ],
        records: [
          { recid: 1, name: 'John', password: 'Doe' },
          { recid: 2, name: 'John', password: 'Doe' }
        ]
      }); */
      const grid = new Grid({
        columns: [{
           id: 'username',
           name: 'Username'
        }, {
           id: 'password',
           name: 'Password'
        }],
        data: data
      }).render(document.getElementById('grid'));;
    }
  });
  connection.end();
}


$('#btMain').click(function () {
  location.href = '../index.html'
})