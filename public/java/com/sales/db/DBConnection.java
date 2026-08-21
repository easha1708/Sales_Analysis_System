package com.sales.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection.java
 * Single place where the JDBC connection to MySQL is created.
 * Requires mysql-connector-j.jar on the classpath (WEB-INF/lib for Tomcat).
 */
public class DBConnection {

    private static final String URL  = "jdbc:mysql://localhost:3306/sales_analysis";
    private static final String USER = "root";
    private static final String PASS = "your_password";

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");   // load JDBC driver
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC driver not found.", e);
        }
        return DriverManager.getConnection(URL, USER, PASS);
    }

    /** Quick connectivity test: java com.sales.db.DBConnection */
    public static void main(String[] args) {
        try (Connection con = getConnection()) {
            System.out.println("Connected to MySQL: " + !con.isClosed());
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}