# 📝 FINAL PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Paradise Dental Clinic Management System (PDCMS)

| Attribute | Detail |
|:---|:---|
| **Document Version** | **2.3 (Final Master)** |
| **Product Type** | **Web-Based System** (Public Website + Management Portal) |
| **Product Goal** | To create a modern, trusted, and caring management system that streamlines clinic operations, enhances patient experience, ensures data security, and delivers business clarity, fully adhering to the Paradise Dental Clinic brand guidelines. |
| **Target Users** | **Visitor**, **Patient**, **Staff** (Operation/Dentist Assist), **Dentist**, **Manager**, **Admin**. |
| **Brand Essence** | Clean • Bright • Calm • Professional |
| **Color Palette** | Light Blue: `#CEE0F3` • Teal Blue: `#2D7C9C` • Deep Navy: `#214491` |
| **Database** | MariaDB SQL (via XAMPP for Local, Hostinger for Prod) |
| **Hosting** | Hostinger (Production Deployment) |
| **UX Principle** | **≤ 3 clicks/actions** to complete any primary function |

---

## 1. 👥 User Roles & Access Hierarchy

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

## 2. 🌟 Functional Requirements (FRs)

### A. Public Presence & Visitor Access (Supports Epic 1 & 2)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **P-001** | **Public Website:** Responsive landing page with About Us, Services, and Contact info. | US-VIS-001 | Pure White BG, High-quality imagery, Calm tone. |
| **P-002** | **Service Catalog:** Public display of dental services with descriptions. | US-VIS-002 | Clean typography (Prompt font). |
| **P-003** | **Public Booking Request:** Unauthenticated form to request appointments (Time/Date preference). | US-VIS-003 | Simple inputs, Teal Blue CTA buttons. |
| **P-004** | **Booking Confirmation:** System feedback confirming request receipt (not final booking). | US-VIS-004 | Friendly & Trustworthy messaging. |

### B. Foundation: Authentication & Identity (Supports Epic 3)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **F-001** | Secure login supporting all authenticated roles (Staff, Dentist, Patient). | F-AUTH-001 | Deep Navy text, Teal Blue button, Session timeout. |
| **F-002** | Role-Based Access Control (RBAC) enforcing the hierarchy in Section 1. | F-SEC-001 | Strict database-level permission checks. |
| **F-003** | Patient Portal Dashboard (View upcoming appts, history). | F-REG-001 | Data Encryption (S-SEC-002). |

### C. Core Operations: Staff & Clinical (Supports Epic 4)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **C-001** | **Queue Management:** Dashboard to view today's appointments and status. | US-OPS-001 | Color-coded statuses (Pending/Confirmed/Arrived). |
| **C-002** | **Booking Approval:** Staff interface to approve/reject Visitor requests. | US-OPS-002 | 3-Click efficiency. |
| **C-003** | **Patient Registration:** Full CRUD for patient records (Staff/Dentist). | US-REG-002 | Professional forms, Audit logging. |
| **C-004** | **Treatment Charting:** Digital recording of procedures and notes. | US-TREAT-002 | Clear layout, Historical tracking. |
| **C-005** | **Invoicing:** Generate receipts from completed treatments. | US-BILL-001 | Professional, Printable format. |

### D. Intelligence & Admin (Supports Epic 5)

| FR ID | Requirement Description | Key User Stories | Branding/Security Focus |
|:---|:---|:---|:---|
| **I-001** | **Executive Dashboard:** Real-time KPIs (Revenue, Visits). | US-INT-001 | **Critical:** 3 official colors only for charts. |
| **I-002** | **Financial Reports:** P&L, A/R Aging, Daily Collections. | US-INT-002 | Clean data visualization. |
| **I-003** | **User Management:** Admin tools to add/remove Staff and Dentists. | US-ADM-001 | High security access. |

---

## 3. 🛡️ Non-Functional Requirements (NFRs)

### NFR A: Security & Compliance

| NFR ID | Requirement Description | Rationale | Priority |
|:---|:---|:---|:---|
| **S-SEC-001** | **Audit Logging:** Track all user actions, including data modifications and views. | Essential for accountability and Trustworthy brand promise. | High |
| **S-SEC-002** | **Data Encryption:** All sensitive patient and financial data must be encrypted at rest (database). | Critical for patient privacy and Professional standards. | High |
| **S-SEC-003** | **Access Control:** Role permissions must be strictly enforced at the database/API level, not just the UI. | Prevents unauthorized data access across the hierarchy. | High |
| **S-SEC-004** | **Data Backup:** Automated daily backups with defined RPO and RTO. | Ensures business continuity. | High |

### NFR B: Performance & Usability

| NFR ID | Requirement Description | Standard/Metric | Priority |
|:---|:---|:---|:---|
| **G-PERF-001** | **Load Speed:** Major pages (e.g., Calendar, Patient Dashboard) ≤ 2 seconds. | Performance benchmark | High |
| **G-PERF-003** | **Scalability:** Support 100% growth in users and data volume. | Must handle 50 concurrent staff/dentist users with no performance drop. | Medium |
| **G-BRAND-003** | **UI/UX:** Adherence to white space and rounded design language. | All screen designs must pass brand review against Section 2 guidelines. | High |
| **G-BRAND-004** | **Typography:** Exclusive use of the **Prompt** typeface. | Ensures **Professional** and **Modern** aesthetic across all system outputs. | High |

### NFR C: UX/UI Brand Compliance

| NFR ID | Requirement Description | Brand Guideline Reference | Priority |
|:---|:---|:---|:---|
| **UI-001** | **Three-Color System Only:** All interface elements use ONLY `#CEE0F3`, `#2D7C9C`, `#214491` | Section 3: Color Palette | **Critical** |
| **UI-002** | **Background Color:** All pages use pure white `#FFFFFF` background | Section 2: Core Design Principles | **Critical** |
| **UI-003** | **Typography:** Prompt font family exclusively across all text elements | Section 4: Typography | **Critical** |
| **UI-004** | **Button Design:** Primary buttons in Teal Blue `#2D7C9C`, hover state Deep Navy `#214491` | Section 8: Layout & Design Application | High |
| **UI-005** | **Text Color:** Main text in Deep Navy `#214491`, links underlined in Teal Blue `#2D7C9C` | Section 8: Digital/Web | High |
| **UI-006** | **Shape Language:** All UI elements use rounded corners (border-radius: 8-12px) | Section 2: Shape Language | High |
| **UI-007** | **White Space:** Maintain 70% white space, 30% design elements ratio | Section 8: Print Collateral (applied to web) | High |
| **UI-008** | **Icons:** Simple line icons (2-3px stroke) in Teal Blue or Deep Navy only | Section 7: Iconography | Medium |
| **UI-009** | **Shadows:** Soft blur (10-15px, opacity <15%) for depth | Section 8: Digital/Web | Medium |
| **UI-010** | **≤3 Click Rule:** Any primary function completable in 3 clicks or less | UX Efficiency Principle | **Critical** |
| **UI-011** | **Responsive Design:** Mobile-first approach, optimized for tablets and desktops | Web-based system requirement | High |
| **UI-012** | **Line Height:** 1.5× for body text, +0.5% letter spacing for Thai text | Section 4: Typography Rules | Medium |

---

## 4. 📋 Additional Requirements & Constraints

### Brand Guidelines Enforcement

All system interfaces, reports, and patient-facing materials must strictly adhere to:

- **Three-Color System Only:** `#CEE0F3`, `#2D7C9C`, `#214491` (NO other colors)
- **Background:** Pure white `#FFFFFF` always
- **Typography:** Prompt font family exclusively (Regular 400, SemiBold 600, Bold 700)
- **Design Language:** Rounded corners (8-12px), ample white space (70/30 ratio), soft shadows
- **Tone of Voice:** Friendly, calm, professional, trustworthy (Thai & English support)

### UX Efficiency Requirements (≤3 Click Rule)

**Primary functions must be completable within 3 clicks/actions maximum:**

| Function | Click Flow | Max Clicks |
|:---|:---|:---|
| **Book Appointment** | 1. Calendar → 2. Select slot → 3. Confirm | 3 |
| **View Patient Record** | 1. Search patient → 2. Select patient → View loads | 2 |
| **Process Payment** | 1. Select treatment → 2. Enter amount → 3. Confirm | 3 |
| **Generate Invoice** | 1. Select patient → 2. Select treatments → 3. Generate | 3 |
| **Check Schedule** | 1. Click calendar (default view shows today) | 1 |
| **Add Treatment Note** | 1. In patient record → 2. Add note → 3. Save | 3 |
| **View Reports** | 1. Dashboard → 2. Select report type | 2 |

### System Architecture Considerations

- **Platform:** Web-based application (browser-accessible)
- **Database:** MariaDB SQL (relational database)
- **Hosting:** Hostinger web hosting platform
- **Multi-tenancy:** Not required (single clinic system)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Responsive:** Fully responsive design for tablets and mobile devices
- **Localization:** Thai and English language support required

---

## 5. 🎯 Success Metrics

| Metric | Target | Measurement Method |
|:---|:---|:---|
| **User Adoption Rate** | 90% of staff actively using system within 3 months | Login frequency tracking |
| **Appointment Booking Efficiency** | 50% reduction in booking time vs. manual process | Time study comparison |
| **Patient Portal Engagement** | 40% of patients use portal within 6 months | Patient portal registration rate |
| **System Uptime** | 99.5% availability | Server monitoring logs |
| **Data Accuracy** | <1% error rate in patient records | Audit sampling |

---

## 6. 🛣️ Epic Structure & Development Roadmap

This roadmap is structured to deliver value incrementally, starting with the public presence and moving into deep operational management.

### Epic 1: Website Foundation
**Goal:** Establish the clinic's digital presence and navigation structure compliant with brand guidelines.
- **E1-01:** Setup Localhost environment (XAMPP for MariaDB), React/Next.js frontend, Node.js backend.
- **E1-02:** Develop "Home" landing page with clinic introduction (White BG, Teal accents).
- **E1-03:** Develop "About Us" and "Services" pages displaying treatments.
- **E1-04:** Develop "Contact" page with map integration and basic info.
- **E1-05:** Implement global navigation (Header/Footer) and mobile responsiveness.

### Epic 2: Public Booking System
**Goal:** Enable visitors to request appointments without logging in, increasing lead generation.
- **E2-01:** Create public "Request Appointment" form (Name, Contact, Preferred Time).
- **E2-02:** Implement email/SMS notification system for received requests.
- **E2-03:** Create "Booking Success" confirmation page.
- **E2-04:** Implement basic validation (phone number format, date validity).

### Epic 3: Authentication & User Management
**Goal:** Secure the system and provide personalized dashboards for different roles.
- **E3-01:** Implement JWT Authentication & Session Management.
- **E3-02:** Create Login Screen (Branded).
- **E3-03:** Implement Role-Based Access Control (Admin, Manager, Dentist, Staff, Patient).
- **E3-04:** Develop "Patient Portal" shell (View own profile).
- **E3-05:** Develop "Staff/Admin Dashboard" shell (Navigation to internal tools).

### Epic 4: Staff Operations
**Goal:** Digitize the daily workflow of the clinic (The "Core" of the system).
- **E4-01:** **Queue Management:** Dashboard to view/manage incoming booking requests from Epic 2.
- **E4-02:** **Patient Registration:** Internal CRUD for detailed patient records (HN, Medical History).
- **E4-03:** **Calendar Management:** Internal view for Staff/Dentists to finalize/reschedule bookings.
- **E4-04:** **Treatment Charting:** Interface for Dentists to record procedures done.
- **E4-05:** **Billing:** Generate invoices from treatment records and mark as paid.

### Epic 5: Analytics & Management
**Goal:** Provide business insights and administrative control.
- **E5-01:** **Executive Dashboard:** Visual charts for Revenue, Patient Count, Appointment Efficiency.
- **E5-02:** **Reporting Engine:** Generate PDF/CSV reports for P&L and Daily Collections.
- **E5-03:** **Admin Tools:** User account management (Create Staff/Dentist users).
- **E5-04:** **Expense/Inventory:** Basic tracking of clinic supplies and overhead costs.

---

## 7. 🔧 Technical Stack Specifications

### Platform Architecture
**System Type:** Web-based Application (SaaS-style, browser-accessible)

### Frontend
- **Framework:** React.js (v18+) or Next.js (v13+)
- **UI Styling:** - **Primary:** Tailwind CSS
  - **Color Variables:** `#CEE0F3`, `#2D7C9C`, `#214491`
- **State Management:** Redux Toolkit or Zustand
- **Calendar Component:** FullCalendar.io or React Big Calendar
- **Form Handling:** React Hook Form
- **Font Integration:** Google Fonts (Prompt typeface)

### Backend
- **Runtime:** Node.js (v18+ LTS)
- **API Design:** RESTful API
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** **MariaDB** (MySQL-compatible)
- **ORM:** Sequelize or Prisma

### Hosting Environment
- **Development:** **Localhost with XAMPP** (Apache/MariaDB) + Node.js
- **Production:** **Hostinger** Web Hosting

---

## 8. 🎨 UI/UX Specifications

### Visual Identity & Style Guide

#### Color Palette (Strict Adherence)

| Color Role | Hex Code | Usage |
|:-----------|:---------|:------|
| **Primary Blue** | `#214491` | Headings, Main Nav, Primary Buttons, Footer |
| **Secondary Blue** | `#2D7C9C` | Icons, Subheadings, Hover States |
| **Soft Sky Blue** | `#CEE0F3` | Section Backgrounds, Cards, Dividers |
| **White** | `#FFFFFF` | Main Background, Text Contrast |

#### Typography

- **Font Family:** Prompt (Google Fonts)
- **H1 (Headline):** Bold (700), 48px. Color: `#214491`
- **H2 (Section Title):** Semibold (600), 32px. Color: `#214491`
- **Body:** Regular (400), 16px. Color: `#334155`

### Core UI Components (Brand-Compliant)

#### Buttons
```css
Primary Button:
- Background: #2D7C9C (Teal Blue)
- Text: #FFFFFF (White)
- Border-radius: 8px
- Font: Prompt SemiBold (600)
- Hover: Background → #214491 (Deep Navy)
````

#### Cards & Containers

```css
Card:
- Background: #FFFFFF (White)
- Border: 1px solid #CEE0F3
- Border-radius: 12px
- Padding: 24px
- Shadow: 0 4px 12px rgba(33, 68, 145, 0.08)
```

#### Icons

```css
Icons:
- Library: Lucide React (Line style)
- Color: #2D7C9C
- Size: 24px
```

-----

**CRITICAL REMINDERS:**

  - ✅ **Three colors only** - No exceptions to `#CEE0F3`, `#2D7C9C`, `#214491`
  - ✅ **White background always** - `#FFFFFF` on all pages
  - ✅ **Prompt font exclusively** - No alternative typefaces
  - ✅ **Hostinger & MariaDB** - Strict infrastructure constraints

-----

```
```