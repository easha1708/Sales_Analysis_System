/* dashboard.js - dashboard cards and summaries.
   JAVA/JDBC equivalents:
     Today's sales  : SELECT SUM(amount) FROM sales WHERE sale_date = CURDATE();
     Monthly sales  : SELECT SUM(amount) FROM sales WHERE MONTH(sale_date)=? AND YEAR(sale_date)=?;
     Quantity sold  : SELECT SUM(quantity) FROM sales;
     Best product   : SELECT product, SUM(amount) t FROM sales GROUP BY product ORDER BY t DESC LIMIT 1; */

requireLogin();
initChrome();

var all = getSales();
var t = today();
var year = t.slice(0, 4);
var monthIndex = Number(t.slice(5, 7)) - 1;

/* Today's sales */
var todayRows = all.filter(function (s) {
  return s.sale_date === t;
});
var todaySum = summarize(todayRows);
document.getElementById("cardToday").textContent = money(todaySum.amount);
document.getElementById("cardTodayHint").textContent =
  todaySum.transactions + " transaction(s) today";

/* Monthly sales */
var monthRows = searchSales(
  monthStart(year, monthIndex),
  monthEnd(year, monthIndex),
  "",
);
var monthSum = summarize(monthRows);
document.getElementById("cardMonth").textContent = money(monthSum.amount);
document.getElementById("cardMonthHint").textContent =
  MONTHS[monthIndex] + " " + year;

/* Total quantity */
document.getElementById("cardQty").textContent = num(summarize(all).quantity);

/* Best selling product */
var byProduct = {};
all.forEach(function (s) {
  if (!byProduct[s.product]) {
    byProduct[s.product] = { qty: 0, amt: 0 };
  }
  byProduct[s.product].qty += Number(s.quantity);
  byProduct[s.product].amt += Number(s.amount);
});
var best = null;
Object.keys(byProduct).forEach(function (p) {
  if (!best || byProduct[p].amt > byProduct[best].amt) {
    best = p;
  }
});
document.getElementById("cardBest").textContent = best || "-";
if (best) {
  document.getElementById("cardBestHint").textContent =
    money(byProduct[best].amt) + " from " + num(byProduct[best].qty) + " units";
}

/* Monthly bars for the current year (plain CSS bars, no chart library) */
var monthTotals = MONTHS.map(function (m, i) {
  return summarize(searchSales(monthStart(year, i), monthEnd(year, i), ""))
    .amount;
});
var maxMonth = Math.max.apply(null, monthTotals.concat([1]));
document.getElementById("monthBars").innerHTML = MONTHS.map(function (m, i) {
  var pct = Math.round((monthTotals[i] / maxMonth) * 100);
  return (
    '<div class="bar-row"><div>' +
    m +
    "</div>" +
    '<div class="bar"><span style="width:' +
    pct +
    '%"></span></div>' +
    '<div class="bar-val">' +
    money(monthTotals[i]) +
    "</div></div>"
  );
}).join("");

/* Quarterly table */
var quarters = [
  ["Q1", "January - March", 0, 2],
  ["Q2", "April - June", 3, 5],
  ["Q3", "July - September", 6, 8],
  ["Q4", "October - December", 9, 11],
];
document.getElementById("quarterBody").innerHTML = quarters
  .map(function (q) {
    var s = summarize(
      searchSales(monthStart(year, q[2]), monthEnd(year, q[3]), ""),
    );
    return (
      '<tr><td><span class="tag">' +
      q[0] +
      "</span></td><td>" +
      q[1] +
      '</td><td class="num">' +
      num(s.quantity) +
      '</td><td class="num">' +
      money(s.amount) +
      "</td></tr>"
    );
  })
  .join("");

/* Recent sales (latest 8) */
var recent = all
  .slice()
  .sort(function (a, b) {
    return a.sale_date < b.sale_date ? 1 : -1;
  })
  .slice(0, 8);
document.getElementById("recentBody").innerHTML = recent.length
  ? recent
      .map(function (s) {
        return (
          "<tr><td>" +
          dmy(s.sale_date) +
          "</td><td>" +
          escapeHtml(s.product) +
          '</td><td class="num">' +
          num(s.quantity) +
          "</td><td>" +
          escapeHtml(s.person_category) +
          '</td><td class="num">' +
          money(s.amount) +
          "</td></tr>"
        );
      })
      .join("")
  : '<tr><td colspan="5" class="empty">No sales records found.</td></tr>';
