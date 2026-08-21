# Sales Analysis System

B.Tech CSE mini project — **HTML5, CSS3, Vanilla JavaScript, Core Java, JDBC, MySQL**.
No React, Angular, Vue, Spring Boot, REST API, Chart.js or any external framework.

## Folder structure

```
public/
├── login.html          Admin login
├── dashboard.html      Stat cards, monthly trend, quarterly summary, recent sales
├── sales-entry.html    Add / edit / delete sales records
├── search.html         Search by Date Range, Month, Quarter, Festival
├── reports.html        Daily, Monthly, Quarterly, Festival, Product performance
├── settings.html       Profile and change password
├── css/                app.css (design system) + one file per page
├── js/                 common.js (shared logic) + one file per page
├── java/               Core Java + JDBC backend classes
└── sql/sales_analysis.sql   Database script
```

## Architecture

```
HTML / CSS / JavaScript   (presentation layer)
        |
     Core Java            (business logic - Login.java, SalesManager.java)
        |
       JDBC               (DBConnection, AdminDAO, SalesDAO)
        |
      MySQL               (database sales_analysis: admin, sales)
```

## Database setup

1. Open MySQL Workbench or the MySQL command line.
2. Run the whole script `sql/sales_analysis.sql`.
   It creates the `sales_analysis` database, the `admin` and `sales` tables and
   inserts sample records.

Default login: **admin / admin123**

## Compiling and running the Java part

```bash
cd public/java
javac -d classes *.java
java -cp classes:mysql-connector-j-8.x.x.jar com.sales.app.Login
```

Update the URL, user and password constants in `DBConnection.java` to match your
MySQL installation.

## Java classes

| File                       | Purpose                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `DBConnection.java`        | Loads the JDBC driver and returns a `Connection`                |
| `Admin.java`, `Sales.java` | POJOs (model classes)                                           |
| `AdminDAO.java`            | Login validation and password update using `PreparedStatement`  |
| `SalesDAO.java`            | Insert, update, delete, all searches and dashboard aggregations |
| `FestivalConfig.java`      | Festival date windows (Holi, Eid, Diwali, Christmas)            |
| `Login.java`               | Console entry point, validates the admin                        |
| `SalesManager.java`        | Menu-driven operations with input validation                    |

## Browser demo

The HTML pages run directly in a browser. Because a browser cannot open a JDBC
connection, the pages store records in `localStorage` using exactly the same
fields, calculations and festival windows as the Java/MySQL layer, so the demo
output matches the SQL results.

## Features

- Admin login with session guard on every page
- Dashboard: today's sales, monthly sales, quantity sold, best product,
  monthly trend bars (plain CSS), quarterly summary
- Sales entry with validation, edit and confirm-delete
- Search by date range, month, quarter and festival with totals, transaction
  count and average sale
- Reports with year and product filters, product and person-category
  performance bars
- Export to CSV and Print (print-specific CSS)
- Settings: profile and change password

## Viva points

- Three-tier architecture: presentation, business logic, database.
- `PreparedStatement` is used everywhere to prevent SQL injection.
- MySQL functions `MONTH()`, `YEAR()` and `QUARTER()` power the month and
  quarter analysis; festivals use a `BETWEEN` date window per year.
- DAO pattern separates SQL from business logic.
