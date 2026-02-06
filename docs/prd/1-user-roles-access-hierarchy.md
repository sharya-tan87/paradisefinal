# 1. 👥 User Roles & Access Hierarchy

The system enforces a strict hierarchy where higher roles inherit the permissions of the roles below them (e.g., Dentist can perform all Staff tasks).

| Role | Access Level | Foundation | Core Operations | Business Logic | Reporting |
|:---|:---|:---|:---|:---|:---|
| **Admin** | System-Wide Control | All functions, User/Role Mgmt. | All Appointment/Treatment functions. | All Billing/Expense functions. | All Financial/Operational Reports. |
| **Manager** | Strategic/Oversight | Login, Patient Mgmt, User Mgmt (below self). | All Appointment/Treatment functions. | All Billing/Expense functions. | All Financial/Operational Reports. |
| **Dentist** | Clinical/Staff | Login, View all patient records, **Create patient.** | **Create/Update treatments**, Full schedule view. | Process Payments (Staff work). | N/A (Can view own production). |
| **Staff** | Operational/Front Office | Login, **Create patient**, View basic patient info. | Book/Reschedule appointments, **Approve Visitor bookings.** | Process Payments, Generate Invoices, Inventory. | N/A |
| **Patient** | Self-Service | Login (own portal). | View own appointments, treatment history, and balance. | View own invoices. | N/A |
| **Visitor** | Public Access | Public Pages (Index, About, Service, Contact). | Submit Appointment Request (requires Staff approval). | N/A | N/A |

---
