// adminDashboard.js
import { openModal, closeModal } from "../components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

/**
 * Load and render all doctor cards on page load
 */
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
    alert("Failed to load doctors.");
  }
}

/**
 * Render a list of doctors into the content area
 * @param {Array} doctors
 */
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = `<p>No doctors found.</p>`;
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/**
 * Event handler for search/filter changes
 */
async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  try {
    const doctors = await filterDoctors(name, time, specialty);
    if (!doctors || doctors.length === 0) {
      document.getElementById("content").innerHTML =
        "<p>No doctors found with the given filters.</p>";
      return;
    }
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Failed to filter doctors.");
  }
}

/**
 * Collect form data and add a new doctor
 */
async function adminAddDoctor(event) {
  event.preventDefault();

  const name = document.getElementById("doctorName").value.trim();
  const email = document.getElementById("doctorEmail").value.trim();
  const password = document.getElementById("doctorPassword").value.trim();
  const phone = document.getElementById("doctorPhone").value.trim();
  const specialty = document.getElementById("doctorSpecialty").value.trim();

  // collect checked availability values
  const availability = Array.from(
    document.querySelectorAll('input[name="doctorAvailability"]:checked')
  ).map((el) => el.value);

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("You must be logged in as admin to add doctors.");
    return;
  }

  const newDoctor = { name, email, password, phone, specialty, availability };

  try {
    const result = await saveDoctor(newDoctor, token);
    if (result.success) {
      alert("Doctor added successfully!");
      closeModal("addDoctor");
      loadDoctorCards();
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("Failed to add doctor.");
  }
}

/* ------------------------
   Event Listeners
------------------------- */

// Open "Add Doctor" modal
document.getElementById("addDocBtn").addEventListener("click", () => {
  openModal("addDoctor");
});

// On DOM ready, load doctors
document.addEventListener("DOMContentLoaded", loadDoctorCards);

// Filters + search
document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

// Bind Add Doctor form submit
document
  .getElementById("addDoctorForm")
  .addEventListener("submit", adminAddDoctor);
