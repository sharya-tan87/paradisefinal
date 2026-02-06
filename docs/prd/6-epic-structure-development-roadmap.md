# 6. 🛣️ Epic Structure & Development Roadmap

This roadmap is structured to deliver value incrementally, starting with the public presence and moving into deep operational management.

## Epic 1: Website Foundation
**Goal:** Establish the clinic's digital presence and navigation structure compliant with brand guidelines.
- **E1-01:** Setup Localhost environment (XAMPP for MariaDB), React/Next.js frontend, Node.js backend.
- **E1-02:** Develop "Home" landing page with clinic introduction (White BG, Teal accents).
- **E1-03:** Develop "About Us" and "Services" pages displaying treatments.
- **E1-04:** Develop "Contact" page with map integration and basic info.
- **E1-05:** Implement global navigation (Header/Footer) and mobile responsiveness.

## Epic 2: Public Booking System
**Goal:** Enable visitors to request appointments without logging in, increasing lead generation.
- **E2-01:** Create public "Request Appointment" form (Name, Contact, Preferred Time).
- **E2-02:** Implement email/SMS notification system for received requests.
- **E2-03:** Create "Booking Success" confirmation page.
- **E2-04:** Implement basic validation (phone number format, date validity).

## Epic 3: Authentication & User Management
**Goal:** Secure the system and provide personalized dashboards for different roles.
- **E3-01:** Implement JWT Authentication & Session Management.
- **E3-02:** Create Login Screen (Branded).
- **E3-03:** Implement Role-Based Access Control (Admin, Manager, Dentist, Staff, Patient).
- **E3-04:** Develop "Patient Portal" shell (View own profile).
- **E3-05:** Develop "Staff/Admin Dashboard" shell (Navigation to internal tools).

## Epic 4: Staff Operations
**Goal:** Digitize the daily workflow of the clinic (The "Core" of the system).
- **E4-01:** **Queue Management:** Dashboard to view/manage incoming booking requests from Epic 2.
- **E4-02:** **Patient Registration:** Internal CRUD for detailed patient records (HN, Medical History).
- **E4-03:** **Calendar Management:** Internal view for Staff/Dentists to finalize/reschedule bookings.
- **E4-04:** **Treatment Charting:** Interface for Dentists to record procedures done.
- **E4-05:** **Billing:** Generate invoices from treatment records and mark as paid.

## Epic 5: Analytics & Management
**Goal:** Provide business insights and administrative control.
- **E5-01:** **Executive Dashboard:** Visual charts for Revenue, Patient Count, Appointment Efficiency.
- **E5-02:** **Reporting Engine:** Generate PDF/CSV reports for P&L and Daily Collections.
- **E5-03:** **Admin Tools:** User account management (Create Staff/Dentist users).
- **E5-04:** **Expense/Inventory:** Basic tracking of clinic supplies and overhead costs.

---
