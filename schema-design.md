# Smart Clinic Management System – Schema Design

This document describes the database design for the Smart Clinic portal using both **MySQL (relational)** and **MongoDB (document-based)** approaches.

---

## MySQL Database Design

Structured, relational data such as patients, doctors, admins, and appointments is stored in MySQL.  

### Table: patients
- **id**: INT, Primary Key, Auto Increment  
- **first_name**: VARCHAR(100), NOT NULL  
- **last_name**: VARCHAR(100), NOT NULL  
- **email**: VARCHAR(150), UNIQUE, NOT NULL  
- **phone**: VARCHAR(20), UNIQUE  
- **date_of_birth**: DATE, NOT NULL  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

---

### Table: doctors
- **id**: INT, Primary Key, Auto Increment  
- **first_name**: VARCHAR(100), NOT NULL  
- **last_name**: VARCHAR(100), NOT NULL  
- **specialization**: VARCHAR(150), NOT NULL  
- **email**: VARCHAR(150), UNIQUE, NOT NULL  
- **phone**: VARCHAR(20), UNIQUE  
- **availability_hours**: VARCHAR(255) (e.g., “Mon-Fri 09:00-17:00”)  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

---

### Table: admins
- **id**: INT, Primary Key, Auto Increment  
- **username**: VARCHAR(100), UNIQUE, NOT NULL  
- **password_hash**: VARCHAR(255), NOT NULL  
- **role**: VARCHAR(50) DEFAULT 'admin'  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

---

### Table: appointments
- **id**: INT, Primary Key, Auto Increment  
- **doctor_id**: INT, Foreign Key → doctors(id)  
- **patient_id**: INT, Foreign Key → patients(id)  
- **appointment_time**: DATETIME, NOT NULL  
- **status**: ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled'  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

---

### Table: payments (optional)
- **id**: INT, Primary Key, Auto Increment  
- **appointment_id**: INT, Foreign Key → appointments(id)  
- **amount**: DECIMAL(10,2), NOT NULL  
- **payment_date**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
- **method**: ENUM('Cash', 'Credit Card', 'Insurance')  

---

### Notes
- **Cascade deletes**: If a patient is deleted, appointments can also be deleted (`ON DELETE CASCADE`).  
- **Doctor availability**: Controlled by schedules or availability_hours. No overlapping appointments allowed per doctor.  
- **History**: Appointment history is retained for medical and audit purposes.  

---

## MongoDB Collection Design

Flexible or unstructured data such as **prescriptions, notes, and feedback** is stored in MongoDB.

### Collection: prescriptions
```json
{
  "_id": { "$oid": "64abc123456789" },
  "appointmentId": 51,
  "patientId": 12,
  "doctorId": 7,
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "instructions": "Take 1 tablet every 6 hours",
      "duration": "5 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "instructions": "Take after meals",
      "duration": "3 days"
    }
  ],
  "doctorNotes": "Patient has mild fever. Prescribed rest and fluids.",
  "refillCount": 1,
  "pharmacy": {
    "name": "City Pharmacy",
    "location": "Downtown Clinic Street"
  },
  "created_at": { "$date": "2025-09-09T12:00:00Z" }
}
