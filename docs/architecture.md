I have activated the **Architect** agent (`architect`) to finalize the System Architecture Document.

I have updated the architecture to strictly enforce **JWT-only authentication** (removing Passport/OAuth) and applied a **modern, minimalist white-background design system** while retaining the "Stock Manager" layout patterns and the Dental domain.

-----

# 🏗️ SYSTEM ARCHITECTURE DOCUMENT

## Paradise Dental Clinic Management System (PDCMS)

| Attribute | Detail |
|:---|:---|
| **Document Version** | **1.2 (Minimalist Refactor)** |
| **Architecture Type** | Monolithic Web Application |
| **Platform** | Web-Based (Full-Screen Responsive) |
| **Hosting** | Hostinger Business Shared Hosting |
| **Database** | **MariaDB SQL** |
| **ORM** | **Sequelize** (Prisma Explicitly Excluded) |
| **Auth Strategy** | **JWT Only** (No External OAuth) |
| **Design Style** | **Modern Clean Minimalist (White Backgrounds)** |

-----

## 1. Architecture Overview

### 1.1 System Architecture

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

### 1.2 Key Design Principles (Minimalist)

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

## 2. Technology Stack

### 2.1 Complete Stack

```yaml
Frontend:
  Framework: React 18.x
  Language: JavaScript/TypeScript
  UI Framework: Tailwind CSS 3.x
  Components: Headless UI (Unstyled, accessible primitives)
  Charts: Recharts (Minimalist styling)
  Icons: Heroicons (Outline style for minimalism)
  Forms: React Hook Form + Yup
  Calendar: FullCalendar.io (Customized to match white theme)
  Font: Google Fonts (Prompt)

Backend:
  Runtime: Node.js 18 LTS or 20 LTS
  Framework: Express.js 4.x
  API: RESTful JSON
  Auth: jsonwebtoken (JWT) + bcryptjs
  Validation: Joi or express-validator
  File Upload: Multer
  Email: Nodemailer

Database:
  DBMS: MariaDB 10.6+
  ORM: Sequelize 6.x (Strictly NO Prisma)
  Driver: mysql2
  Migrations: Sequelize CLI
```

-----

## 3. Frontend Architecture & UX Patterns

### 3.1 Design Layout Reference

We adopt the **layout structure** of the "Stock Manager" reference but apply the **Minimalist Dental** theme.

**A. Dashboard (White Canvas)**

  * **Stats Row:** 4 Cards. White background, subtle gray border.
      * *Icon:* Teal circle background, white icon.
      * *Text:* Dark Navy numbers.
  * **Main Content:**
      * *Charts:* Clean lines, minimal grid lines.
      * *Tables:* "Clean" variant (no zebra striping), just bottom borders on rows.
  * **Typography:** `Prompt` font. High contrast for readability.

**B. List Views (Responsive)**

  * **Desktop:** Clean data tables with `border-b border-gray-100`. Hover effect is a very light gray (`hover:bg-gray-50`).
  * **Mobile:** Cards with `shadow-sm` and `border border-gray-100`.

### 3.2 Tailwind Configuration (Minimalist Dental Theme)

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds (Strictly White/Neutral)
        bg: {
          main: '#FFFFFF',    // Main Canvas
          panel: '#FFFFFF',   // Cards/Panels
          hover: '#F9FAFB',   // Very subtle hover gray
        },
        // Dental Brand (Accents Only)
        primary: {
          50: '#F0F7FF',      // Very light tint for active states
          100: '#CEE0F3',     // Light Blue (Subtle highlights/borders)
          500: '#2D7C9C',     // Teal Blue (Primary Actions/Buttons)
          600: '#236b88',     // Hover state
          900: '#214491',     // Deep Navy (Headings/Text)
        },
        // Text
        text: {
          main: '#1F2937',    // Gray-900 equivalent
          muted: '#6B7280',   // Gray-500 equivalent
        },
        // Status
        status: {
          success: '#10B981', // Emerald
          warning: '#F59E0B', // Amber
          danger: '#EF4444',  // Red
        }
      },
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)', // Ultra-soft shadow for depth
      }
    }
  },
  plugins: []
};
```

### 3.3 Component Styling Examples

  * **Primary Button:** `bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 transition-colors shadow-sm`
  * **Card:** `bg-white rounded-xl border border-gray-100 shadow-soft p-6`
  * **Input:** `bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none`
  * **Sidebar:** `w-64 bg-white border-r border-gray-100 h-full` (Text: Navy for active, Gray for inactive)

-----

## 4. Authentication Architecture (JWT Only)

### 4.1 Auth Flow

1.  **Login:**
      * Client sends `POST /auth/login` with `{ username, password }`.
      * Backend verifies hash (bcrypt).
      * Backend issues `accessToken` (15m expiry) and `refreshToken` (7d expiry).
      * Tokens returned in JSON body (or HTTPOnly cookies if preferred).
2.  **Protected Requests:**
      * Client sends `Authorization: Bearer <accessToken>`.
      * Middleware verifies signature.
3.  **Refresh:**
      * Client sends `POST /auth/refresh` with `refreshToken`.
      * Backend verifies and issues new pair.

### 4.2 Auth Controller Structure

```javascript
// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Find User
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // 2. Check Password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // 3. Generate Tokens

