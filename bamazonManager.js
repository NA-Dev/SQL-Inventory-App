var mysql = require("mysql");
var inquirer = require('inquirer');
var json_tb = require('json-table');

var connection = {}; //global variable so I don't have to pass it around

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
		connection = mysql.createConnection(
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
      selectAction();
		});
	});
}

// I skipped the checking for and creating the database here
// It should already be created from running bamazonCustomer.js

function selectAction() {
  inquirer.prompt(
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      default: 'View Products for Sale',
      choices: [
        'View Products for Sale',
        'View Low Inventory Products',
        'Re-Stock Inventory',
        'Add New Product to Inventory'
      ]
    }
  ).then(function(answers) {
    if (answers.action === 'View Products for Sale') {
      displayInventory();
    } else if (answers.action === 'View Low Inventory Products') {
      displayLowInventory();
    } else if (answers.action === 'Re-Stock Inventory') {
      restockInventory();
    } else if (answers.action === 'Add New Product to Inventory') {
      addNewProduct();
    }
  });
}

function displayInventory() {

	console.log('\n- - -~~~ Bamazon Store Inventory ~~~ - - -\n');

	connection.query(
		'USE bamazon',
		function (err, res) {
			if (err) throw err;
		}
	);

	connection.query(
		'SELECT * FROM products',
		function (err, res) {
			if (err) throw err;
			if (res) {
				//prints JSON object into a table
				var json_tb_out = new json_tb(res, {
					chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
				}, 
				
				function(table) {
					table.show();
				});

			}
		}
	);
}

function displayLowInventory() {

	console.log('\n- - -~~~ Bamazon Store: Low-Inventory Items ~~~ - - -\n');

	connection.query(
		'USE bamazon',
		function (err, res) {
			if (err) throw err;
		}
	);

	connection.query(
    'SELECT * FROM products WHERE stock_quantity < 5',
		function (err, res) {
			if (err) throw err;
			if (res) {
				//prints JSON object into a table
				var json_tb_out = new json_tb(res, {
					chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
				}, 
				
				function(table) {
					table.show();
				});

			}
		}
	);
}

function restockInventory() {

	console.log('\n- - -~~~ Bamazon Store Inventory ~~~ - - -\n');

	connection.query(
		'USE bamazon',
		function (err, res) {
			if (err) throw err;
		}
	);

	connection.query(
		'SELECT * FROM products',
		function (err, res) {
			if (err) throw err;
			if (res) {
				//prints JSON object into a table
				var json_tb_out = new json_tb(res, {
					chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
				}, 
				
				function(table) {
					table.show();
				});

			}
		}
	);
}

function addNewProduct() {

	console.log('\n- - -~~~ Bamazon Store Inventory ~~~ - - -\n');

	connection.query(
		'USE bamazon',
		function (err, res) {
			if (err) throw err;
		}
  );
  
  connection.query(
		'INSERT INTO products ' +
		'(item_id, product_name, department_name, price, stock_quantity) ' +
		'VALUES ?', [values],
		function (err, res) {
			if (err) throw err;
		}
  );

	connection.query(
		'SELECT * FROM products',
		function (err, res) {
			if (err) throw err;
			if (res) {
				//prints JSON object into a table
				var json_tb_out = new json_tb(res, {
					chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
				}, 
				
				function(table) {
					table.show();
				});

			}
		}
	);
}