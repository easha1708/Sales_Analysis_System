/* settings.js - admin profile, change password and logout.
   JAVA/JDBC: AdminDAO.updateProfile / AdminDAO.changePassword with PreparedStatement. */

requireLogin();
initChrome();

var admin = getAdmin();
document.getElementById("adminName").value = admin.name;
document.getElementById("adminEmail").value = admin.email;

document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("adminName").value.trim();
  var email = document.getElementById("adminEmail").value.trim();
  var ok = true;

  document.getElementById("errName").textContent = "";
  document.getElementById("errEmail").textContent = "";

  if (!name) {
    document.getElementById("errName").textContent =
      "Admin name cannot be empty.";
    ok = false;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById("errEmail").textContent =
      "Enter a valid email address.";
    ok = false;
  }
  if (!ok) {
    return;
  }

  saveAdmin({ name: name, email: email, username: admin.username });
  admin = getAdmin();
  initChrome();
  toast("Profile updated successfully.");
});

document
  .getElementById("passwordForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    var oldP = document.getElementById("oldPass").value;
    var newP = document.getElementById("newPass").value;
    var conP = document.getElementById("confirmPass").value;
    var current =
      localStorage.getItem("sas_password_" + getCurrentUsername()) ||
      (getCurrentUsername() === "admin" &&
        localStorage.getItem("sas_password")) ||
      (getUser(getCurrentUsername()) || {}).password;
    var ok = true;

    ["errOld", "errNew", "errConfirm"].forEach(function (id) {
      document.getElementById(id).textContent = "";
    });

    if (oldP !== current) {
      document.getElementById("errOld").textContent =
        "Current password is incorrect.";
      ok = false;
    }
    if (newP.length < 5) {
      document.getElementById("errNew").textContent =
        "New password must be at least 5 characters.";
      ok = false;
    }
    if (newP !== conP) {
      document.getElementById("errConfirm").textContent =
        "Passwords do not match.";
      ok = false;
    }
    if (!ok) {
      return;
    }

    localStorage.setItem("sas_password_" + getCurrentUsername(), newP);
    document.getElementById("passwordForm").reset();
    toast("Password changed successfully.");
  });
