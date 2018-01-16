// NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

// Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Pinkwindow420",
    database: "bamazonDB"
});

// Connect (run first func)
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId + "\n");
    displayProducts();
});

// Display all items

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.table([
                {
                    id: res[i].id,
                    item_name: res[i].item_name,
                    department: res[i].category,
                    price: res[i].price,
                    quantity: res[i].quantity
                }
            ])
        }
    });
};

// Prompt two messages
//      1. ID of the item you would like to buy
//      2. How many would you like to buy

// If not enough quantity display proper error handling

// Fulfill the order
//      1. update the SQL to reflect remaining quanity
//      2. Show the total price of the order

// 