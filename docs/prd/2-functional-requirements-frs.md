# 2. 🌟 Functional Requirements (FRs)

## A. Public Presence & Visitor Access (Supports Epic 1 & 2)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **P-001** | **Public Website:** Responsive landing page with About Us, Services, and Contact info. | US-VIS-001 | Pure White BG, High-quality imagery, Calm tone. |
| **P-002** | **Service Catalog:** Public display of dental services with descriptions. | US-VIS-002 | Clean typography (Prompt font). |
| **P-003** | **Public Booking Request:** Unauthenticated form to request appointments (Time/Date preference). | US-VIS-003 | Simple inputs, Teal Blue CTA buttons. |
| **P-004** | **Booking Confirmation:** System feedback confirming request receipt (not final booking). | US-VIS-004 | Friendly & Trustworthy messaging. |

## B. Foundation: Authentication & Identity (Supports Epic 3)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **F-001** | Secure login supporting all authenticated roles (Staff, Dentist, Patient). | F-AUTH-001 | Deep Navy text, Teal Blue button, Session timeout. |
| **F-002** | Role-Based Access Control (RBAC) enforcing the hierarchy in Section 1. | F-SEC-001 | Strict database-level permission checks. |
| **F-003** | Patient Portal Dashboard (View upcoming appts, history). | F-REG-001 | Data Encryption (S-SEC-002). |

## C. Core Operations: Staff & Clinical (Supports Epic 4)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **C-001** | **Queue Management:** Dashboard to view today's appointments and status. | US-OPS-001 | Color-coded statuses (Pending/Confirmed/Arrived). |
| **C-002** | **Booking Approval:** Staff interface to approve/reject Visitor requests. | US-OPS-002 | 3-Click efficiency. |
| **C-003** | **Patient Registration:** Full CRUD for patient records (Staff/Dentist). | US-REG-002 | Professional forms, Audit logging. |
| **C-004** | **Treatment Charting:** Digital recording of procedures and notes. | US-TREAT-002 | Clear layout, Historical tracking. |
| **C-005** | **Invoicing:** Generate receipts from completed treatments. | US-BILL-001 | Professional, Printable format. |

## D. Intelligence & Admin (Supports Epic 5)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **I-001** | **Executive Dashboard:** Real-time KPIs (Revenue, Visits). | US-INT-001 | **Critical:** 3 official colors only for charts. |
| **I-002** | **Financial Reports:** P&L, A/R Aging, Daily Collections. | US-INT-002 | Clean data visualization. |
| **I-003** | **User Management:** Admin tools to add/remove Staff and Dentists. | US-ADM-001 | High security access. |

---
