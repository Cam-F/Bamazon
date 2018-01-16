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

        console.table(res);
    });
    bamazon();
};

// Prompt two messages
function bamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            //      1. ID of the item you would like to buy
            {
                name: "selection",
                type: "input",
                message: "What is the ID# of the item you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n Sorry, you must enter an ID number first.");
                    return false;
                }
            },
            //      2. How many would you like to buy
            {
                name: "sQuantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n Sorry, you must enter a number.");
                    return false;
                }
            }
        ]).then(function (answer) {

            // Assigning the selected item to a var

            var selected;
            for (var i = 0; i < res.length; i++) {
                if (res[i].id === parseInt(answer.selection)) {
                    selected = res[i];
                }
            }

            // Comparing the selected quantity to our inventory
            // Fulfill the order
            //      1. update the SQL to reflect remaining quanity
            //      2. Show the total price of the order

            var inventory = parseInt(selected.quantity - answer.sQuantity);
            if (inventory >= answer.sQuantity) {
                var total = parseFloat(answer.sQuantity * selected.price);
                console.log("You have successfully purchased " + answer.sQuantity + " " + selected.item_name + "'s for a total of $" + total);

                reset();

                // Updating the DB

                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        quantity: inventory
                    },
                    {
                        id: selected.id
                    }
                    ]);

                // Proper error handling

            } else {
                console.log("Sorry, we currently only have " + selected.quantity + " in stock.");

                reset();
            }
        })
    })
}
// Function to reset and display
function reset() {
    inquirer.prompt({
        name: "reset",
        type: "rawlist",
        message: "Would you like to continue shopping?",
        choices: ["YES", "NO"]
    }).then(function(answer){
        if (answer.reset === "YES"){
            displayProducts();
        } else {
            connection.end();
        }
    })
}