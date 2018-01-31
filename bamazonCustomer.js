var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require('table');

getCredentials();

function getCredentials() {
	inquirer.prompt([
		{
			name: 'mySQLPort',
			type: 'input',
			message: 'What port do you use to connect to mySQL@localhost?',
			default: '3306',
			validate: function(input) {
				pattern = '^[0-9]+$';
				isValid = input.match(pattern);
				if(isValid) {
					return true;
				} else {
					return 'Invalid input. Enter an integer port number.';
				}
			}
		},
		{
			name: 'mySQLUser',
			type: 'input',
			message: 'What is your mySQL@localhost username?',
			default: 'root'
		},
		{
			name: 'mySQLPass',
			type: 'password',
			message: 'What is your mySQL@localhost password?',
			default: ''
		}
	])
	.then(function(answers) {
		var connection = mysql.createConnection(
			{
				host: 'localhost',
				port: answers.mysqlPort,
				user: answers.mySQLUser,
				password: answers.mySQLPass
			}
		);

		connection.connect(function(err) {
			if (err) throw err;
			console.log("connected as id " + connection.threadId);
			checkIfDB(connection);
			displayTable(connection);
		});
	});
}

//checks to see if database already exists
function checkIfDB(connection) {
	connection.query(
		'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "bamazon"',
		function (err, res) {
			if (err) throw err;
			if (!res[0].SCHEMA_NAME) createDB(connection);
		}
	);
}

// creates database and table if it does not exist
function createDB(connection) {
  console.log('creating db');

  connection.query(
		'CREATE DATABASE IF NOT EXISTS bamazon',
		function (err, result) {
			if (err) throw err;
		}
	);

	connection.query(
		'USE bamazon',
		function (err, result) {
			if (err) throw err;
		}
	);
		
	connection.query(
		'CREATE TABLE IF NOT EXISTS products (' +
		  'item_id INT NOT NULL AUTO_INCREMENT,' +
		  'product_name VARCHAR(32) NOT NULL,' +
 		  'department_name VARCHAR(32) NOT NULL,' +
 		  'price DEC(10,2) NOT NULL DEFAULT 0,' +
 		  'stock_quantity INT(10) DEFAULT 0,' +
		 'PRIMARY KEY (item_id)' +
	  ')',
		function (err, result) {
			if (err) throw err;
		}
	);

	var values = [
		[1, 'apples', 'produce', 0.50, 25],
		[2, 'bananas', 'produce', 0.25, 48],
		[3, 'Doritos chips', 'snacks', 1.99, 18],
		[4, 'tortilla chips', 'snacks', 1.29, 20],
		[5, 'salsa', 'snacks', 1.89, 25],
		[6, 'beef filet mignon', 'meats', 15.00, 10],
		[7, 'chicken wing', 'meats', 0.59, 50],
		[8, 'milk', 'dairy', 1.68, 30],
		[9, 'parmesean cheese', 'dairy', 2.00, 22],
		[10, 'pork loin', 'meat', 8.95, 14],
		[11, 'Amy\'s pizza', 'frozen', 9.15, 10],
		[12, 'peas', 'frozen', 2.05, 30]
	];

	connection.query(
		'INSERT INTO products ' +
		'(item_id, product_name, department_name, price, stock_quantity) ' +
		'VALUES ?', [values],
		function (err, result) {
			if (err) throw err;
		}
  );
}

function displayTable(connection) {

	connection.query(
		'USE bamazon',
		function (err, result) {
			if (err) throw err;
		}
	);

	connection.query(
		'SELECT * FROM products',
		function (err, res) {
			if (err) throw err;
			if (res) console.log(res);
		}
	);
}