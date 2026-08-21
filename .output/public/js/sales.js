/* sales.js - sales entry form validation + add/update/delete.
   JAVA/JDBC: SalesDAO.addSale / updateSale / deleteSale / getAllSales
   using PreparedStatement (never string concatenation). */

requireLogin();
initChrome();

var form = document.getElementById("saleForm");
var idEl = document.getElementById("saleId");
var dateEl = document.getElementById("saleDate");
var productEl = document.getElementById("product");
var qtyEl = document.getElementById("quantity");
var amtEl = document.getElementById("amount");
var catEl = document.getElementById("category");

dateEl.max = today();
fillSelect(catEl, PERSON_CATEGORIES, "-- Select category --");
dateEl.value = today();
refreshSuggestions();
renderTable();

function refreshSuggestions() {
  document.getElementById("productSuggestions").innerHTML = productList()
    .map(function (p) {
      return '<option value="' + escapeHtml(p) + '">';
    })
    .join("");
}

function setErr(id, el, msg) {
  document.getElementById(id).textContent = msg;
  if (msg) {
    el.classList.add("invalid");
  } else {
    el.classList.remove("invalid");
  }
}

function validate() {
  var ok = true;

  if (!dateEl.value) {
    setErr("errDate", dateEl, "Sale date cannot be empty.");
    ok = false;
  } else if (dateEl.value > today()) {
    setErr("errDate", dateEl, "Future sale dates are not allowed.");
    ok = false;
  } else {
    setErr("errDate", dateEl, "");
  }

  if (!productEl.value.trim()) {
    setErr("errProduct", productEl, "Product name cannot be empty.");
    ok = false;
  } else {
    setErr("errProduct", productEl, "");
  }

  var q = Number(qtyEl.value);
  if (qtyEl.value === "" || isNaN(q) || q <= 0) {
    setErr("errQuantity", qtyEl, "Quantity must be greater than 0.");
    ok = false;
  } else {
    setErr("errQuantity", qtyEl, "");
  }

  var a = Number(amtEl.value);
  if (amtEl.value === "" || isNaN(a)) {
    setErr("errAmount", amtEl, "Sale amount is required.");
    ok = false;
  } else if (a < 0) {
    setErr("errAmount", amtEl, "Amount cannot be negative.");
    ok = false;
  } else {
    setErr("errAmount", amtEl, "");
  }

  if (!catEl.value) {
    setErr("errCategory", catEl, "Please select a person category.");
    ok = false;
  } else {
    setErr("errCategory", catEl, "");
  }

  return ok;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) {
    toast("Please correct the highlighted fields.", "error");
    return;
  }

  var data = {
    sale_date: dateEl.value,
    product: productEl.value.trim(),
    quantity: Number(qtyEl.value),
    amount: Number(amtEl.value),
    person_category: catEl.value,
  };

  if (idEl.value) {
    updateSale(Number(idEl.value), data);
    toast("Sale updated successfully.");
    exitEditMode();
  } else {
    addSale(data);
    toast("Sale saved successfully.");
    form.reset();
    dateEl.value = today();
    fillSelect(catEl, PERSON_CATEGORIES, "-- Select category --");
  }
  refreshSuggestions();
  renderTable();
});

document.getElementById("resetBtn").addEventListener("click", function () {
  setTimeout(function () {
    dateEl.value = today();
    [
      "errDate",
      "errProduct",
      "errQuantity",
      "errAmount",
      "errCategory",
    ].forEach(function (id) {
      document.getElementById(id).textContent = "";
    });
    document.querySelectorAll(".invalid").forEach(function (el) {
      el.classList.remove("invalid");
    });
  }, 0);
});

document.getElementById("cancelEdit").addEventListener("click", exitEditMode);

function exitEditMode() {
  idEl.value = "";
  form.reset();
  dateEl.value = today();
  fillSelect(catEl, PERSON_CATEGORIES, "-- Select category --");
  document.getElementById("formTitle").textContent = "New Sale";
  document.getElementById("saveBtn").textContent = "SAVE SALE";
  document.getElementById("cancelEdit").style.display = "none";
}

function renderTable() {
  var rows = getSales().sort(function (a, b) {
    return a.sale_date < b.sale_date ? 1 : -1;
  });
  var body = document.getElementById("salesBody");
  if (!rows.length) {
    body.innerHTML =
      '<tr><td colspan="6" class="empty">No sales records found.</td></tr>';
    return;
  }
  body.innerHTML = rows
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
        "</td>" +
        '<td class="no-print">' +
        '<button class="btn-ghost btn-sm" data-edit="' +
        s.id +
        '">Edit</button> ' +
        '<button class="btn-danger btn-sm" data-del="' +
        s.id +
        '">Delete</button>' +
        "</td></tr>"
      );
    })
    .join("");

  body.querySelectorAll("[data-edit]").forEach(function (b) {
    b.addEventListener("click", function () {
      startEdit(Number(b.getAttribute("data-edit")));
    });
  });
  body.querySelectorAll("[data-del]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = Number(b.getAttribute("data-del"));
      confirmModal(
        "Delete sale",
        "This sales record will be permanently deleted. Continue?",
        function () {
          deleteSale(id);
          toast("Sale record deleted.");
          renderTable();
        },
      );
    });
  });
}

function startEdit(id) {
  var s = getSaleById(id);
  if (!s) {
    return;
  }
  idEl.value = s.id;
  dateEl.value = s.sale_date;
  productEl.value = s.product;
  qtyEl.value = s.quantity;
  amtEl.value = s.amount;
  catEl.value = s.person_category;
  document.getElementById("formTitle").textContent = "Edit Sale #" + s.id;
  document.getElementById("saveBtn").textContent = "UPDATE SALE";
  document.getElementById("cancelEdit").style.display = "inline-block";
  window.scrollTo({ top: 0 });
}

document.getElementById("exportBtn").addEventListener("click", function () {
  exportCSV(getSales(), "all_sales.csv");
});
