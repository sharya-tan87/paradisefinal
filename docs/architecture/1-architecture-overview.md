# 1. Architecture Overview

## 1.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                MONOLITHIC WEB APPLICATION                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Frontend (React + Tailwind CSS)                  │  │
│  │  - Full-Screen Responsive (Mobile-First)          │  │
│  │  - Theme: Modern Minimalist (White Canvas)        │  │
│  │  - Font: Prompt (Thai/English support)            │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │ HTTPS/JSON API                      │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │  Backend (Node.js + Express)                      │  │
│  │  - RESTful API                                    │  │
│  │  - Custom JWT Authentication (Access/Refresh)     │  │
│  │  - Business Logic (Appointments/Billing)          │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │ SQL Queries (Sequelize)             │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │  Database (MariaDB)                               │  │
│  │  - 18 Core Tables                                 │  │
│  │  - Relational Schema (SQL)                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Deployed on: Hostinger Business Shared Hosting         │
└─────────────────────────────────────────────────────────┘
```

## 1.2 Key Design Principles (Minimalist)

```yaml
✓ Clean & Minimalist Aesthetic
  - Background: Always White (#FFFFFF) for a sterile, medical feel
  - Separation: Use whitespace, subtle borders (gray-100), and soft shadows
  - No dense colored backgrounds; colors used strictly for actions/status

✓ Mobile-First & Full-Screen Layout
  - Layout structure mimics "Stock Manager" (Cards/Grid)
  - Tables transform to Info Cards on mobile
  - Sticky headers for actions; maximum data visibility

✓ Simplified Security
  - JWT Only: No dependency on Google/Facebook APIs
  - Stateless authentication
  - Secure HTTP-Only cookies for token storage recommended

✓ Performance & Constraints
  - No Prisma: Direct control via Sequelize
  - Optimized for shared hosting (MariaDB)
```

-----
