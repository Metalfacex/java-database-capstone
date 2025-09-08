# Smart Clinic Management System - Architecture

## Architecture Summary
The Smart Clinic Management System is a Spring Boot application that follows a layered architecture with a clean separation of concerns.  

- **UI Layer:** Provides two types of access:
  - **Thymeleaf dashboards** (Admin, Doctor) for server-rendered HTML views.
  - **REST APIs** (Appointments, PatientDashboard, PatientRecord) for JSON-based interactions used by mobile apps or frontend clients.  
- **Controller Layer:** Handles user requests. Thymeleaf controllers return `.html` templates; REST controllers return JSON responses.  
- **Service Layer:** Central layer for business logic, workflows, and validation.  
- **Repository Layer:** Manages data persistence using:
  - **Spring Data JPA** for MySQL (patients, doctors, admins, appointments).  
  - **Spring Data MongoDB** for document-based data (prescriptions).  
- **Databases:** Dual-database setup using MySQL (structured, relational data) and MongoDB (flexible, document-based data).  
- **Model Binding:** JPA entities and MongoDB documents provide object-oriented mapping of database records.  
- **Response Layer:** Data returned either as HTML (via Thymeleaf) or JSON (via REST APIs).  

The backend is containerized with **Docker**, and **GitHub Actions** handle CI/CD to automate builds and deployments.

---

## Step-by-Step Architecture Walkthrough

1. **User Interface Layer**  
   - Users access the system via Thymeleaf dashboards (Admin, Doctor) or REST API clients (mobile/web apps).  
   - This supports both traditional web-based access and scalable API integrations.  

2. **Controller Layer**  
   - Requests are routed to controllers depending on type:  
     - **Thymeleaf Controllers** → return `.html` views.  
     - **REST Controllers** → return JSON responses.  
   - Controllers validate requests and delegate work to the service layer.  

3. **Service Layer**  
   - Applies business rules and workflows.  
   - Handles operations like checking doctor availability before scheduling appointments.  
   - Keeps controller and repository logic separate.  

4. **Repository Layer**  
   - Service layer delegates persistence operations here.  
   - Includes:  
     - **MySQL Repositories (JPA):** Patients, doctors, appointments, admin.  
     - **MongoDB Repository (Document Model):** Prescriptions.  

5. **Database Access**  
   - MySQL ensures data integrity for relational entities (users, appointments, roles).  
   - MongoDB stores flexible, nested data for prescriptions.  

6. **Model Binding**  
   - MySQL data → mapped into **JPA entities** (`@Entity`).  
   - MongoDB data → mapped into **Document classes** (`@Document`).  
   - Models provide a unified object representation inside the app.  

7. **Application Models in Use**  
   - For MVC flows → Models passed to Thymeleaf templates for rendering dynamic HTML.  
   - For REST flows → Models/DTOs serialized into JSON responses.  

---

## Commit Message
When adding this file to GitHub, use:
