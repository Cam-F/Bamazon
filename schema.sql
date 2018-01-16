DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(100) NULL,
    category VARCHAR(100) NULL,
    price INT NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("Dark Souls 3", "Video Games", 40, 100);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("Bloodborne", "Video Games", 30, 90);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("The 4 Hour Body", "Books", 12, 50);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("K70 Corsair Keyboard", "Electronics", 70, 50);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("Caddyshack", "Movies", 10, 100);

INSERT INTO products (item_name, category, price, quantity)
VALUE ("Ash vs Evil Dead", "Movies", 15, 80);