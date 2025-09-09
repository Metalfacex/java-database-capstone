# User Stories for Smart Clinic Portal

---

## Admin User Stories

**Title:** Admin Login  
_As an admin, I want to log into the portal with my username and password, so that I can securely manage the platform._  
**Acceptance Criteria:**  
1. Admin can enter username and password.  
2. Credentials are validated securely.  
3. Admin is redirected to the admin dashboard after successful login.  
**Priority:** High  
**Story Points:** 3  
**Notes:** Use secure password hashing.  

---

**Title:** Admin Logout  
_As an admin, I want to log out of the portal, so that I can protect system access._  
**Acceptance Criteria:**  
1. Logout button is available on every admin page.  
2. Session is terminated after logout.  
3. Redirect to login page.  
**Priority:** High  
**Story Points:** 2  

---

**Title:** Add Doctor Profile  
_As an admin, I want to add doctors to the portal, so that they can provide services to patients._  
**Acceptance Criteria:**  
1. Admin can fill doctor’s details (name, specialization, contact).  
2. System saves doctor’s data in database.  
3. Confirmation message is shown.  
**Priority:** High  
**Story Points:** 5  

---

**Title:** Delete Doctor Profile  
_As an admin, I want to delete a doctor’s profile, so that the portal has only active and valid doctors._  
**Acceptance Criteria:**  
1. Admin selects a doctor from list.  
2. System asks for confirmation before deletion.  
3. Doctor record is removed from database.  
**Priority:** Medium  
**Story Points:** 3  

---

**Title:** View Monthly Appointment Statistics  
_As an admin, I want to run a stored procedure to get the number of appointments per month, so that I can track usage statistics._  
**Acceptance Criteria:**  
1. Stored procedure retrieves appointment counts per month.  
2. Results are displayed in tabular form.  
3. Data can be exported.  
**Priority:** Medium  
**Story Points:** 5  

---

## Patient User Stories

**Title:** View Doctor List  
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._  
**Acceptance Criteria:**  
1. Doctor list shows name, specialization, and availability.  
2. Data is pulled from database.  
3. Available without authentication.  
**Priority:** High  
**Story Points:** 3  

---

**Title:** Patient Registration  
_As a patient, I want to sign up using my email and password, so that I can book appointments._  
**Acceptance Criteria:**  
1. Patient enters email and password.  
2. System validates email uniqueness.  
3. Account is created and confirmation shown.  
**Priority:** High  
**Story Points:** 5  

---

**Title:** Patient Login  
_As a patient, I want to log into the portal, so that I can manage my bookings._  
**Acceptance Criteria:**  
1. Patient can log in with credentials.  
2. Secure authentication.  
3. Redirect to patient dashboard.  
**Priority:** High  
**Story Points:** 3  

---

**Title:** Patient Logout  
_As a patient, I want to log out of the portal, so that I can secure my account._  
**Acceptance Criteria:**  
1. Logout option available on all pages.  
2. Session is terminated.  
3. Redirect to homepage.  
**Priority:** High  
**Story Points:** 2  

---

**Title:** Book Appointment  
_As a patient, I want to book an hour-long appointment with a doctor, so that I can consult for my health issues._  
**Acceptance Criteria:**  
1. Patient selects doctor and time slot.  
2. System checks slot availability.  
3. Appointment is saved and confirmation shown.  
**Priority:** High  
**Story Points:** 8  

---

**Title:** View Upcoming Appointments  
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._  
**Acceptance Criteria:**  
1. Upcoming appointments shown in dashboard.  
2. Includes doctor, date, and time.  
3. Option to cancel or reschedule.  
**Priority:** Medium  
**Story Points:** 5  

---

## Doctor User Stories

**Title:** Doctor Login  
_As a doctor, I want to log into the portal, so that I can manage my appointments._  
**Acceptance Criteria:**  
1. Doctor can enter credentials.  
2. Successful login redirects to doctor dashboard.  
3. Failed login shows error message.  
**Priority:** High  
**Story Points:** 3  

---

**Title:** Doctor Logout  
_As a doctor, I want to log out of the portal, so that I can protect my data._  
**Acceptance Criteria:**  
1. Logout option available on every page.  
2. Session terminated after logout.  
3. Redirect to homepage.  
**Priority:** High  
**Story Points:** 2  

---

**Title:** View Appointment Calendar  
_As a doctor, I want to view my appointment calendar, so that I can stay organized._  
**Acceptance Criteria:**  
1. Calendar shows appointments by day/week/month.  
2. Includes patient details and appointment type.  
3. Updates in real-time.  
**Priority:** High  
**Story Points:** 8  

---

**Title:** Mark Unavailability  
_As a doctor, I want to mark my unavailability, so that patients only book available slots._  
**Acceptance Criteria:**  
1. Doctor can select unavailable dates/times.  
2. System blocks those slots for patients.  
3. Confirmation message shown.  
**Priority:** High  
**Story Points:** 5  

---

**Title:** Update Profile  
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._  
**Acceptance Criteria:**  
1. Doctor can edit profile details.  
2. Changes are saved in database.  
3. Updated info visible to patients.  
**Priority:** Medium  
**Story Points:** 3  

---

**Title:** View Patient Details  
_As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared._  
**Acceptance Criteria:**  
1. Patient info shown in appointment details.  
2. Includes medical history if available.  
3. Data is secure and accessible only to assigned doctor.  
**Priority:** High  
**Story Points:** 5  
