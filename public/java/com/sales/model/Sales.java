package com.sales.model;

import java.sql.Date;

/** Sales.java - model class for the sales table. */
public class Sales {

    private int id;
    private Date saleDate;
    private String product;
    private int quantity;
    private double amount;
    private String personCategory;

    public Sales() { }

    public Sales(int id, Date saleDate, String product, int quantity,
                 double amount, String personCategory) {
        this.id = id;
        this.saleDate = saleDate;
        this.product = product;
        this.quantity = quantity;
        this.amount = amount;
        this.personCategory = personCategory;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Date getSaleDate() { return saleDate; }
    public void setSaleDate(Date saleDate) { this.saleDate = saleDate; }

    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPersonCategory() { return personCategory; }
    public void setPersonCategory(String personCategory) { this.personCategory = personCategory; }

    @Override
    public String toString() {
        return id + " | " + saleDate + " | " + product + " | " + quantity
                + " | " + amount + " | " + personCategory;
    }
}