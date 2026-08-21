package com.sales.app;

import com.sales.dao.AdminDAO;
import com.sales.model.Admin;

import java.util.Scanner;

/**
 * Login.java
 * Console login check against the MySQL admin table (Core Java + JDBC).
 * The same AdminDAO.validate() is called from LoginServlet when the
 * project is deployed on Apache Tomcat.
 */
public class Login {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        AdminDAO dao = new AdminDAO();

        System.out.print("Username: ");
        String username = sc.nextLine().trim();
        System.out.print("Password: ");
        String password = sc.nextLine();

        Admin admin = dao.validate(username, password);

        if (admin != null) {
            System.out.println("Login successful. Welcome " + admin.getUsername() + ".");
            SalesManager.menu(sc);            // continue to the main menu
        } else {
            System.out.println("Invalid username or password.");
        }
        sc.close();
    }
}