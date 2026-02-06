# 3. 🛡️ Non-Functional Requirements (NFRs)

## NFR A: Security & Compliance

| NFR ID | Requirement Description | Rationale | Priority |
|:---|:---|:---|:---|
| **S-SEC-001** | **Audit Logging:** Track all user actions, including data modifications and views. | Essential for accountability and Trustworthy brand promise. | High |
| **S-SEC-002** | **Data Encryption:** All sensitive patient and financial data must be encrypted at rest (database). | Critical for patient privacy and Professional standards. | High |
| **S-SEC-003** | **Access Control:** Role permissions must be strictly enforced at the database/API level, not just the UI. | Prevents unauthorized data access across the hierarchy. | High |
| **S-SEC-004** | **Data Backup:** Automated daily backups with defined RPO and RTO. | Ensures business continuity. | High |

## NFR B: Performance & Usability

| NFR ID | Requirement Description | Standard/Metric | Priority |
|:---|:---|:---|:---|
| **G-PERF-001** | **Load Speed:** Major pages (e.g., Calendar, Patient Dashboard) ≤ 2 seconds. | Performance benchmark | High |
| **G-PERF-003** | **Scalability:** Support 100% growth in users and data volume. | Must handle 50 concurrent staff/dentist users with no performance drop. | Medium |
| **G-BRAND-003** | **UI/UX:** Adherence to white space and rounded design language. | All screen designs must pass brand review against Section 2 guidelines. | High |
| **G-BRAND-004** | **Typography:** Exclusive use of the **Prompt** typeface. | Ensures **Professional** and **Modern** aesthetic across all system outputs. | High |

## NFR C: UX/UI Brand Compliance

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
