// Import modal handler and config
import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";
import { selectRole } from "../render.js"; // helper to set role & navigate

// API endpoints
const ADMIN_API = API_BASE_URL + "/admin";
const DOCTOR_API = API_BASE_URL + "/doctor/login";

// Wait until page is loaded to bind events
window.onload = function () {
  const adminBtn = document.getElementById("adminLogin");
  const doctorBtn = document.getElementById("doctorLogin");

  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      openModal("adminLogin"); // shows admin modal
    });
  }

  if (doctorBtn) {
    doctorBtn.addEventListener("click", () => {
      openModal("doctorLogin"); // shows doctor modal
    });
  }
};

// ========================
// ADMIN LOGIN HANDLER
// ========================
window.adminLoginHandler = async function () {
  try {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    const admin = { username, password };

    const response = await fetch(ADMIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      selectRole("admin"); // proceed as admin
    } else {
      alert("Invalid admin credentials!");
    }
  } catch (err) {
    console.error("Admin login error:", err);
    alert("Something went wrong. Please try again later.");
  }
};

// ========================
// DOCTOR LOGIN HANDLER
// ========================
window.doctorLoginHandler = async function () {
  try {
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;

    const doctor = { email, password };

    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      selectRole("doctor"); // proceed as doctor
    } else {
      alert("Invalid doctor credentials!");
    }
  } catch (err) {
    console.error("Doctor login error:", err);
    alert("Something went wrong. Please try again later.");
  }
};
