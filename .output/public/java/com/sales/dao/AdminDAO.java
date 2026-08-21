package com.sales.dao;

import com.sales.db.DBConnection;
import com.sales.model.Admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * AdminDAO.java - admin login and password change using JDBC.
 * PreparedStatement is used everywhere (no SQL string concatenation).
 */
public class AdminDAO {

    /** Returns the Admin row when username + password match, else null. */
    public Admin validate(String username, String password) {
        String sql = "SELECT id, username, password FROM admin WHERE username = ? AND password = ?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, password);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Admin(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
                }
            }
        } catch (Exception e) {
            System.out.println("validate() error: " + e.getMessage());
        }
        return null;
    }

    /** UPDATE admin SET password = ? WHERE username = ? AND password = ? */
    public boolean changePassword(String username, String oldPassword, String newPassword) {
        String sql = "UPDATE admin SET password = ? WHERE username = ? AND password = ?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, newPassword);
            ps.setString(2, username);
            ps.setString(3, oldPassword);
            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            System.out.println("changePassword() error: " + e.getMessage());
            return false;
        }
    }
}