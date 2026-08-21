-- =========================================================
-- Sales Analysis System - MySQL database script
-- Run in MySQL Workbench before starting the application.
-- =========================================================

CREATE DATABASE IF NOT EXISTS sales_analysis;
USE sales_analysis;

-- ---------------- Admin table ----------------
CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin(username, password)
VALUES ('admin', 'admin123');

-- ---------------- Sales table ----------------
CREATE TABLE IF NOT EXISTS sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sale_date DATE NOT NULL,
    product VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    person_category VARCHAR(30) NOT NULL
);

-- ---------------- Sample sales data ----------------
INSERT INTO sales(sale_date, product, quantity, amount, person_category) VALUES
('2026-01-08','Shoes',2,960.00,'Boy'),
('2026-01-19','T-Shirt',5,3085.00,'Girl'),
('2026-02-04','Jeans',8,6032.00,'Man'),
('2026-02-14','Watch',2,1902.00,'Woman'),
('2026-03-03','Bag',5,5225.00,'Child'),
('2026-03-04','Jacket',8,8560.00,'Old Age'),
('2026-03-19','Shoes',2,1934.00,'Boy'),
('2026-03-21','T-Shirt',5,3990.00,'Girl'),
('2026-04-11','Jeans',8,7256.00,'Man'),
('2026-08-15','Watch',3,2145.00,'Woman'),
('2026-11-07','Diwali Special Bag',6,7200.00,'Woman'),
('2026-11-09','Shoes',4,4800.00,'Man'),
('2026-12-22','Jacket',5,6250.00,'Old Age'),
('2026-12-24','Watch',3,4500.00,'Child');

-- =========================================================
-- Analysis queries used by the Java DAO classes
-- =========================================================

-- Date range
-- SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?;

-- Product + date range
-- SELECT * FROM sales WHERE product = ? AND sale_date BETWEEN ? AND ?;

-- Monthly sales
-- SELECT SUM(quantity), SUM(amount), COUNT(*) FROM sales
--  WHERE MONTH(sale_date) = ? AND YEAR(sale_date) = ?;

-- Quarterly sales
-- SELECT SUM(quantity), SUM(amount), COUNT(*) FROM sales
--  WHERE QUARTER(sale_date) = ? AND YEAR(sale_date) = ?;

-- Total sales / quantity
-- SELECT SUM(amount) FROM sales;
-- SELECT SUM(quantity) FROM sales;

-- Best selling product
-- SELECT product, SUM(amount) AS total FROM sales
--  GROUP BY product ORDER BY total DESC LIMIT 1;

-- Product performance
-- SELECT product, SUM(quantity), SUM(amount) FROM sales GROUP BY product;

-- Person category performance
-- SELECT person_category, SUM(quantity), SUM(amount) FROM sales GROUP BY person_category;