// doctorCard.js

// Import required helper functions
import { showBookingOverlay } from "../loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

/**
 * Creates and returns a DOM element for a doctor card
 * @param {Object} doctor - doctor object { id, name, specialization, email, availability }
 * @returns {HTMLElement} doctor card
 */
export function createDoctorCard(doctor) {
  // Main card container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Get current user role
  const role = localStorage.getItem("userRole");

  // Doctor info section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialization: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${doctor.availability?.join(", ") || "N/A"}`;

  // Append info elements
  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Actions container
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // === ADMIN ROLE ===
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("delete-btn");

    removeBtn.addEventListener("click", async () => {
      if (!confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      try {
        const success = await deleteDoctor(doctor.id, token);
        if (success) {
          card.remove();
          alert(`Dr. ${doctor.name} has been deleted.`);
        } else {
          alert("Failed to delete doctor. Please try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting doctor.");
      }
    });

    actionsDiv.appendChild(removeBtn);

  // === PATIENT (NOT LOGGED-IN) ===
  } else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("book-btn");

    bookNow.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
    });

    actionsDiv.appendChild(bookNow);

  // === LOGGED-IN PATIENT ===
  } else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("book-btn");

    bookNow.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      try {
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (err) {
        console.error(err);
        alert("Error fetching patient details.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  // Final assembly
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
