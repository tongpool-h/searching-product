CREATE DATABASE products;

USE products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, price)
VALUES
('Laptop', 'High-performance laptop', 1200.00),
('Smartphone', 'Latest model smartphone', 800.00),
('Tablet', 'Lightweight tablet', 300.00),
('Headphones', 'Noise-cancelling headphones', 150.00),
('Smartwatch', 'Feature-packed smartwatch', 200.00);