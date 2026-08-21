/* login.js - client side validation for the admin login form.
   In the Java version the credentials are posted to LoginServlet ->
   AdminDAO.validate(username, password) -> SELECT with PreparedStatement. */

var form = document.getElementById("loginForm");
var userEl = document.getElementById("username");
var passEl = document.getElementById("password");
var alertBox = document.getElementById("alertBox");

/* Restore remembered username */
var remembered = localStorage.getItem("sas_remember_user");
if (remembered) {
  userEl.value = remembered;
  document.getElementById("remember").checked = true;
}

document.getElementById("pwToggle").addEventListener("click", function () {
  var show = passEl.type === "password";
  passEl.type = show ? "text" : "password";
  this.textContent = show ? "Hide" : "Show";
});

function showError(id, input, message) {
  document.getElementById(id).textContent = message;
  if (message) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

function showAlert(message) {
  alertBox.textContent = message;
  alertBox.classList.add("show");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  alertBox.classList.remove("show");

  var u = userEl.value.trim();
  var p = passEl.value;
  var ok = true;

  if (u === "") {
    showError("errUsername", userEl, "Username is required.");
    ok = false;
  } else {
    showError("errUsername", userEl, "");
  }

  if (p === "") {
    showError("errPassword", passEl, "Password is required.");
    ok = false;
  } else if (p.length < 5) {
    showError("errPassword", passEl, "Password must be at least 5 characters.");
    ok = false;
  } else {
    showError("errPassword", passEl, "");
  }

  if (!ok) {
    return;
  }

  var account = getUser(u);
  var validPass =
    localStorage.getItem("sas_password_" + u) ||
    (u === "admin" && localStorage.getItem("sas_password")) ||
    (account && account.password);
  if (account && p === validPass) {
    if (document.getElementById("remember").checked) {
      localStorage.setItem("sas_remember_user", u);
      localStorage.setItem("sas_login", "1");
      localStorage.setItem("sas_current_user", u);
    } else {
      localStorage.removeItem("sas_remember_user");
      sessionStorage.setItem("sas_login", "1");
      sessionStorage.setItem("sas_current_user", u);
    }
    toast("Login successful. Loading dashboard...");
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 500);
  } else {
    showAlert("Invalid username or password. Please try again.");
  }
});
