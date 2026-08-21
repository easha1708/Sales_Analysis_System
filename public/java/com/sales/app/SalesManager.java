package com.sales.app;

import com.sales.dao.SalesDAO;
import com.sales.model.Sales;

import java.sql.Date;
import java.util.List;
import java.util.Scanner;

/**
 * SalesManager.java
 * Menu-driven Core Java class that performs every sales operation
 * (add, view, search, update, delete, reports) using SalesDAO + JDBC.
 */
public class SalesManager {

    private static final SalesDAO dao = new SalesDAO();

    public static void menu(Scanner sc) {
        while (true) {
            System.out.println("\n===== SALES ANALYSIS SYSTEM =====");
            System.out.println("1. Add Sale");
            System.out.println("2. View All Sales");
            System.out.println("3. Search by Date Range");
            System.out.println("4. Search by Month");
            System.out.println("5. Search by Quarter");
            System.out.println("6. Search by Festival");
            System.out.println("7. Update Sale");
            System.out.println("8. Delete Sale");
            System.out.println("9. Dashboard Summary");
            System.out.println("0. Logout");
            System.out.print("Choice: ");

            String choice = sc.nextLine().trim();

            switch (choice) {
                case "1": addSale(sc); break;
                case "2": print(dao.getAllSales()); break;
                case "3": byRange(sc); break;
                case "4": byMonth(sc); break;
                case "5": byQuarter(sc); break;
                case "6": byFestival(sc); break;
                case "7": update(sc); break;
                case "8": delete(sc); break;
                case "9": dashboard(); break;
                case "0": System.out.println("Logged out."); return;
                default:  System.out.println("Invalid choice.");
            }
        }
    }

    /* ---------- Add ---------- */
    private static void addSale(Scanner sc) {
        Sales s = readSale(sc);
        if (s == null) { return; }
        System.out.println(dao.addSale(s) ? "Sale saved successfully." : "Failed to save sale.");
    }

    /* ---------- Update ---------- */
    private static void update(Scanner sc) {
        System.out.print("Sale id to update: ");
        int id = Integer.parseInt(sc.nextLine().trim());
        Sales s = readSale(sc);
        if (s == null) { return; }
        s.setId(id);
        System.out.println(dao.updateSale(s) ? "Sale updated successfully." : "Update failed.");
    }

    /* ---------- Delete ---------- */
    private static void delete(Scanner sc) {
        System.out.print("Sale id to delete: ");
        int id = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Confirm delete (y/n): ");
        if (!sc.nextLine().trim().equalsIgnoreCase("y")) {
            System.out.println("Delete cancelled.");
            return;
        }
        System.out.println(dao.deleteSale(id) ? "Sale record deleted." : "Delete failed.");
    }

    /* ---------- Searches ---------- */
    private static void byRange(Scanner sc) {
        System.out.print("From date (yyyy-mm-dd): ");
        Date from = Date.valueOf(sc.nextLine().trim());
        System.out.print("To date (yyyy-mm-dd): ");
        Date to = Date.valueOf(sc.nextLine().trim());
        System.out.print("Product (blank = all): ");
        print(dao.searchByDateRange(from, to, sc.nextLine().trim()));
    }

    private static void byMonth(Scanner sc) {
        System.out.print("Month (1-12): ");
        int m = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Year: ");
        int y = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Product (blank = all): ");
        print(dao.searchByMonth(m, y, sc.nextLine().trim()));
    }

    private static void byQuarter(Scanner sc) {
        System.out.print("Quarter (1-4): ");
        int q = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Year: ");
        int y = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Product (blank = all): ");
        print(dao.searchByQuarter(q, y, sc.nextLine().trim()));
    }

    private static void byFestival(Scanner sc) {
        System.out.print("Festival (Holi/Eid/Diwali/Christmas): ");
        String f = sc.nextLine().trim();
        System.out.print("Year: ");
        int y = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Product (blank = all): ");
        print(dao.searchByFestival(f, y, sc.nextLine().trim()));
    }

    /* ---------- Dashboard ---------- */
    private static void dashboard() {
        java.util.Calendar c = java.util.Calendar.getInstance();
        System.out.println(String.format("Today's Sales   : %s", dao.getTodaySales()));
        System.out.println(String.format("Monthly Sales   : %s",
            dao.getMonthlySales(c.get(java.util.Calendar.MONTH) + 1, c.get(java.util.Calendar.YEAR))));
        System.out.println(String.format("Total Sales     : %s", dao.getTotalSales()));
        System.out.println(String.format("Quantity Sold   : %s", dao.getTotalQuantity()));
        System.out.println(String.format("Best Product    : %s", dao.getBestSellingProduct()));
    }

    /* ---------- Input + validation ---------- */
    private static Sales readSale(Scanner sc) {
        try {
            System.out.print("Sale date (yyyy-mm-dd): ");
            Date date = Date.valueOf(sc.nextLine().trim());

            System.out.print("Product: ");
            String product = sc.nextLine().trim();
            if (product.isEmpty()) { System.out.println("Product cannot be empty."); return null; }

            System.out.print("Quantity: ");
            int qty = Integer.parseInt(sc.nextLine().trim());
            if (qty <= 0) { System.out.println("Quantity must be greater than 0."); return null; }

            System.out.print("Amount: ");
            double amount = Double.parseDouble(sc.nextLine().trim());
            if (amount < 0) { System.out.println("Amount cannot be negative."); return null; }

            System.out.print("Person category (Boy/Girl/Man/Woman/Child/Old Age): ");
            String cat = sc.nextLine().trim();
            if (cat.isEmpty()) { System.out.println("Person category is required."); return null; }

            return new Sales(0, date, product, qty, amount, cat);

        } catch (Exception e) {
            System.out.println(String.format("Invalid input: %s", e.getMessage()));
            return null;
        }
    }

    /* ---------- Output ---------- */
    private static void print(List<Sales> list) {
        if (list.isEmpty()) {
            System.out.println("No sales records found.");
            return;
        }
        int qty = 0;
        double amt = 0;
        System.out.println("ID | DATE | PRODUCT | QTY | AMOUNT | CATEGORY");
        for (Sales s : list) {
            System.out.println(s);
            qty += s.getQuantity();
            amt += s.getAmount();
        }
        System.out.println(String.format("Total Quantity : %s", qty));
        System.out.println(String.format("Total Sales    : %s", amt));
        System.out.println(String.format("Transactions   : %s", list.size()));
        System.out.println(String.format("Average Sale   : %s", (amt / list.size())));
    }
}