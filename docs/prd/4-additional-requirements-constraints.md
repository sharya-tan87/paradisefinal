# 4. 📋 Additional Requirements & Constraints

## Brand Guidelines Enforcement

All system interfaces, reports, and patient-facing materials must strictly adhere to:

- **Three-Color System Only:** `#CEE0F3`, `#2D7C9C`, `#214491` (NO other colors)
- **Background:** Pure white `#FFFFFF` always
- **Typography:** Prompt font family exclusively (Regular 400, SemiBold 600, Bold 700)
- **Design Language:** Rounded corners (8-12px), ample white space (70/30 ratio), soft shadows
- **Tone of Voice:** Friendly, calm, professional, trustworthy (Thai & English support)

## UX Efficiency Requirements (≤3 Click Rule)

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

## System Architecture Considerations

- **Platform:** Web-based application (browser-accessible)
- **Database:** MariaDB SQL (relational database)
- **Hosting:** Hostinger web hosting platform
- **Multi-tenancy:** Not required (single clinic system)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Responsive:** Fully responsive design for tablets and mobile devices
- **Localization:** Thai and English language support required

---
