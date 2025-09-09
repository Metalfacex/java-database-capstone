// header.js

function renderHeader() {
  const headerDiv = document.getElementById("header");

  // ✅ 1. Check if homepage → clear session
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // ✅ 2. Get role + token from localStorage
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // ✅ 3. Handle invalid/expired sessions
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // ✅ 4. Start building header
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  // ✅ 5. Add role-specific content
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" id="logout">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button id="doctorHome" class="adminBtn">Home</button>
      <a href="#" id="logout">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" id="logoutPatient">Logout</a>`;
  }

  // ✅ 6. Close header
  headerContent += `</nav></header>`;

  // ✅ 7. Inject into DOM
  headerDiv.innerHTML = headerContent;

  // ✅ 8. Attach listeners
  attachHeaderButtonListeners();
}

// -------------------------------
// 🔹 Helper Functions
// -------------------------------

// Attach event listeners for dynamic buttons
function attachHeaderButtonListeners() {
  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("loginPatient"));
  }

  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("signupPatient"));
  }

  const doctorHomeBtn = document.getElementById("doctorHome");
  if (doctorHomeBtn) {
    doctorHomeBtn.addEventListener("click", () => {
      window.location.href = "/pages/doctorDashboard.html";
    });
  }

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  const logoutPatientBtn = document.getElementById("logoutPatient");
  if (logoutPatientBtn) {
    logoutPatientBtn.addEventListener("click", logoutPatient);
  }
}

// Admin/Doctor/General logout
function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  window.location.href = "/";
}

// Patient logout → goes back to dashboard as plain patient
function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

// ✅ Initialize header when DOM loads
document.addEventListener("DOMContentLoaded", renderHeader);
