package com.sales.dao;

import com.sales.db.DBConnection;
import com.sales.model.Sales;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * SalesDAO.java - all sales CRUD and analysis queries through JDBC.
 * Every query uses PreparedStatement with ? parameters.
 */
public class SalesDAO {

    /* ---------------- Add ---------------- */
    public boolean addSale(Sales s) {
        String sql = "INSERT INTO sales(sale_date, product, quantity, amount, person_category) "
                   + "VALUES(?, ?, ?, ?, ?)";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setDate(1, s.getSaleDate());
            ps.setString(2, s.getProduct());
            ps.setInt(3, s.getQuantity());
            ps.setDouble(4, s.getAmount());
            ps.setString(5, s.getPersonCategory());
            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            System.out.println("addSale() error: " + e.getMessage());
            return false;
        }
    }

    /* ---------------- Update ---------------- */
    public boolean updateSale(Sales s) {
        String sql = "UPDATE sales SET sale_date = ?, product = ?, quantity = ?, "
                   + "amount = ?, person_category = ? WHERE id = ?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setDate(1, s.getSaleDate());
            ps.setString(2, s.getProduct());
            ps.setInt(3, s.getQuantity());
            ps.setDouble(4, s.getAmount());
            ps.setString(5, s.getPersonCategory());
            ps.setInt(6, s.getId());
            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            System.out.println("updateSale() error: " + e.getMessage());
            return false;
        }
    }

    /* ---------------- Delete ---------------- */
    public boolean deleteSale(int id) {
        String sql = "DELETE FROM sales WHERE id = ?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            System.out.println("deleteSale() error: " + e.getMessage());
            return false;
        }
    }

    /* ---------------- View all ---------------- */
    public List<Sales> getAllSales() {
        String sql = "SELECT * FROM sales ORDER BY sale_date DESC";
        List<Sales> list = new ArrayList<>();
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) { list.add(map(rs)); }

        } catch (Exception e) {
            System.out.println("getAllSales() error: " + e.getMessage());
        }
        return list;
    }

    /* ---------------- Search by date range (+ optional product) ---------------- */
    public List<Sales> searchByDateRange(Date from, Date to, String product) {
        boolean hasProduct = product != null && !product.trim().isEmpty();
        String sql = hasProduct
            ? "SELECT * FROM sales WHERE product = ? AND sale_date BETWEEN ? AND ? ORDER BY sale_date"
            : "SELECT * FROM sales WHERE sale_date BETWEEN ? AND ? ORDER BY sale_date";

        List<Sales> list = new ArrayList<>();
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            int i = 1;
            if (hasProduct) { ps.setString(i++, product); }
            ps.setDate(i++, from);
            ps.setDate(i, to);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) { list.add(map(rs)); }
            }
        } catch (Exception e) {
            System.out.println("searchByDateRange() error: " + e.getMessage());
        }
        return list;
    }

    /* ---------------- Search by month ---------------- */
    public List<Sales> searchByMonth(int month, int year, String product) {
        boolean hasProduct = product != null && !product.trim().isEmpty();
        String sql = "SELECT * FROM sales WHERE MONTH(sale_date) = ? AND YEAR(sale_date) = ?"
                   + (hasProduct ? " AND product = ?" : "") + " ORDER BY sale_date";

        List<Sales> list = new ArrayList<>();
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, month);
            ps.setInt(2, year);
            if (hasProduct) { ps.setString(3, product); }

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) { list.add(map(rs)); }
            }
        } catch (Exception e) {
            System.out.println("searchByMonth() error: " + e.getMessage());
        }
        return list;
    }

    /* ---------------- Search by quarter (1 to 4) ---------------- */
    public List<Sales> searchByQuarter(int quarter, int year, String product) {
        boolean hasProduct = product != null && !product.trim().isEmpty();
        String sql = "SELECT * FROM sales WHERE QUARTER(sale_date) = ? AND YEAR(sale_date) = ?"
                   + (hasProduct ? " AND product = ?" : "") + " ORDER BY sale_date";

        List<Sales> list = new ArrayList<>();
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, quarter);
            ps.setInt(2, year);
            if (hasProduct) { ps.setString(3, product); }

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) { list.add(map(rs)); }
            }
        } catch (Exception e) {
            System.out.println("searchByQuarter() error: " + e.getMessage());
        }
        return list;
    }

    /* ---------------- Festival sales ----------------
       Festival dates come from FestivalConfig, then the normal
       date-range query is reused. */
    public List<Sales> searchByFestival(String festival, int year, String product) {
        Date[] window = FestivalConfig.getWindow(festival, year);
        if (window == null) { return new ArrayList<>(); }
        return searchByDateRange(window[0], window[1], product);
    }

    /* ---------------- Dashboard figures ---------------- */
    public double getTodaySales() {
        return single("SELECT IFNULL(SUM(amount),0) FROM sales WHERE sale_date = CURDATE()");
    }

    public double getMonthlySales(int month, int year) {
        String sql = "SELECT IFNULL(SUM(amount),0) FROM sales WHERE MONTH(sale_date) = ? AND YEAR(sale_date) = ?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, month);
            ps.setInt(2, year);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? rs.getDouble(1) : 0;
            }
        } catch (Exception e) {
            System.out.println("getMonthlySales() error: " + e.getMessage());
            return 0;
        }
    }

    public double getTotalSales()    { return single("SELECT IFNULL(SUM(amount),0) FROM sales"); }
    public double getTotalQuantity() { return single("SELECT IFNULL(SUM(quantity),0) FROM sales"); }

    /** Best selling product by total sales amount. */
    public String getBestSellingProduct() {
        String sql = "SELECT product, SUM(amount) AS total FROM sales "
                   + "GROUP BY product ORDER BY total DESC LIMIT 1";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            return rs.next() ? rs.getString("product") : "-";
        } catch (Exception e) {
            System.out.println("getBestSellingProduct() error: " + e.getMessage());
            return "-";
        }
    }

    /* ---------------- Helpers ---------------- */
    private double single(String sql) {
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            return rs.next() ? rs.getDouble(1) : 0;
        } catch (Exception e) {
            System.out.println("query error: " + e.getMessage());
            return 0;
        }
    }

    private Sales map(ResultSet rs) throws Exception {
        return new Sales(
            rs.getInt("id"),
            rs.getDate("sale_date"),
            rs.getString("product"),
            rs.getInt("quantity"),
            rs.getDouble("amount"),
            rs.getString("person_category")
        );
    }
}