// patientDashboard.js
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

document.addEventListener("DOMContentLoaded", () => {
  // Load all doctors on page load
  loadDoctorCards();

  // Bind modal buttons
  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) signupBtn.addEventListener("click", () => openModal("patientSignup"));

  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) loginBtn.addEventListener("click", () => openModal("patientLogin"));

  // Bind search & filter controls
  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

// ----------------------
// Load All Doctors
// ----------------------
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error(" Failed to load doctors:", error);
    document.getElementById("content").innerHTML = "<p>Error loading doctors. Please try again later.</p>";
  }
}

// ----------------------
// Filter Doctors
// ----------------------
async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = Array.isArray(response) ? response : response.doctors || [];
    renderDoctorCards(doctors);
  } catch (error) {
    console.error(" Failed to filter doctors:", error);
    alert("An error occurred while filtering doctors.");
  }
}

// ----------------------
// Render Utility
// ----------------------
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (doctors.length > 0) {
    doctors.forEach(doctor => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } else {
    contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
  }
}

// ----------------------
// Patient Signup
// ----------------------
window.signupPatient = async function () {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);

    if (success) {
      alert(message);
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(" Signup failed:", error);
    alert("An error occurred while signing up.");
  }
};

// ----------------------
// Patient Login
// ----------------------
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email, password };
    const response = await patientLogin(data);

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("authToken", result.token); // 🔑 consistent key
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert(" Invalid credentials!");
    }
  } catch (error) {
    console.error(" Login failed:", error);
    alert("An error occurred while logging in.");
  }
};
