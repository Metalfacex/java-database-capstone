// doctorDashboard.js
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// ----------------------
// Global Variables
// ----------------------
const tableBody = document.getElementById("patientTableBody");

// Today’s date in YYYY-MM-DD format
let selectedDate = new Date().toISOString().split("T")[0];

// Auth token
const token = localStorage.getItem("authToken");

// Search filter
let patientName = null;

// ----------------------
// Search Bar Logic
// ----------------------
document.getElementById("searchBar").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  patientName = value !== "" ? value : "null";
  loadAppointments();
});

// ----------------------
// Today Button
// ----------------------
document.getElementById("todayButton").addEventListener("click", () => {
  selectedDate = new Date().toISOString().split("T")[0];
  document.getElementById("datePicker").value = selectedDate;
  loadAppointments();
});

// ----------------------
// Date Picker
// ----------------------
document.getElementById("datePicker").addEventListener("change", (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

// ----------------------
// Load Appointments
// ----------------------
async function loadAppointments() {
  try {
    // Fetch from backend
    const appointments = await getAllAppointments(selectedDate, patientName, token);

    // Clear existing rows
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      // No appointments found
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" style="text-align:center;">No Appointments found for this date.</td>`;
      tableBody.appendChild(row);
      return;
    }

    // Render appointments
    appointments.forEach((appt) => {
      const patient = {
        id: appt.patientId,
        name: appt.patientName,
        phone: appt.patientPhone,
        email: appt.patientEmail,
        time: appt.time,
        status: appt.status,
      };

      const row = createPatientRow(patient);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:red;">
          Error loading appointments. Try again later.
        </td>
      </tr>`;
  }
}

// ----------------------
// On Page Load
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Optional: if you have a UI renderer
  if (typeof renderContent === "function") {
    renderContent();
  }

  // Default load
  document.getElementById("datePicker").value = selectedDate;
  loadAppointments();
});
