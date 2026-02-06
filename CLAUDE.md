# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Paradise Dental Clinic Management System (PDCMS)** - A web-based dental clinic management system for streamlining operations, enhancing patient experience, and ensuring data security.

**Tech Stack:**
- Frontend: React 18.x + Vite 7.x + Tailwind CSS v4
- Router: React Router v7
- Icons: Lucide React v0.556.0
- Backend: Node.js (18/20 LTS) + Express.js 4.x
- Database: MariaDB 10.6+ with Sequelize 6.x ORM
- Auth: JWT (jsonwebtoken + bcryptjs)
- Deployment Target: Hostinger Business Shared Hosting

**Design Philosophy:**
- Strict brand compliance with three-color system ONLY: `#CEE0F3`, `#2D7C9C`, `#214491`
- Pure white background (`#FFFFFF`) always
- Prompt font family exclusively (Google Fonts)
- Mobile-first responsive design with rounded corners (8-12px)
- ≤3 click rule for all primary functions
- 70/30 white space to design elements ratio

## BMad Method Integration

This project uses the **BMad Method** for agentic development workflow. The `.bmad-core/` directory contains the complete multi-agent system configuration.

### Slash Command Prefix

All BMad commands use the `/BMad:` prefix (configured in `.bmad-core/core-config.yaml`).

### Available Agents

Access specialized agents via `/BMad:agents:{agent-id}`:

- **po** (Product Owner - Sarah 📝) - Backlog management, story refinement, document sharding
- **sm** (Scrum Master - Bob 📋) - Story creation from PRD, sprint planning
- **dev** (Developer - James 💻) - Story implementation, code standards enforcement
- **qa** (QA Engineer - Quinn 🧪) - Testing strategy, quality gates, risk assessment
- **architect** - System architecture, technical decisions
- **pm** (Product Manager) - Requirements, PRD creation
- **ux-expert** - UI/UX design, brand compliance validation
- **analyst** - Data analysis, reporting requirements
- **bmad-master** - Meta-orchestration
- **bmad-orchestrator** - Multi-agent task coordination

### Key BMad Commands

**Product Owner (po):**
- `*shard-doc {document} {destination}` - Split large documents by level 2 sections (uses md-tree)
- `*validate-story-draft {story}` - Validate story against template
- `*create-epic` - Create epic for brownfield projects
- `*create-story` - Create user story from requirements

**Scrum Master (sm):**
- `*draft` - Create next story from PRD/epics (sequential story generation)

**Developer (dev):**
- `*develop-story {story}` - Execute development checklist for story
- `*explain` - Teach implementation details for learning
- `*review-qa` - Apply QA fixes from quality gate
- `*run-tests` - Execute linting and tests

**QA (qa):**
- `*risk {story}` - Risk assessment (probability × impact)
- `*design {story}` - Test strategy and scenario design
- `*review {story}` - **Required** comprehensive quality gate review
- `*trace {story}` - Requirements-to-test coverage verification
- `*gate {story}` - Update quality gate decision post-fixes

## Documentation Structure

### Core Documents (Sharded)

Documentation is split into manageable sections using `md-tree explode` command:

**PRD Location:** `docs/prd/`
- Index: `docs/prd/index.md`
- Sharded sections:
  - `paradise-dental-clinic-management-system-pdcms.md` - Document metadata
  - `1-user-roles-access-hierarchy.md` - 6 user roles with strict hierarchy
  - `2-functional-requirements-frs.md` - Public, Foundation, Core, Intelligence FRs
  - `3-non-functional-requirements-nfrs.md` - Security, Performance, UI/UX compliance
  - `4-additional-requirements-constraints.md` - Brand guidelines, ≤3 click rule, architecture
  - `5-success-metrics.md` - Adoption, efficiency, uptime targets
  - `6-epic-structure-development-roadmap.md` - 5 epics (E1-E5) with task breakdown
  - `7-technical-stack-specifications.md` - Frontend, backend, hosting specs
  - `8-uiux-specifications.md` - Color palette, typography, components

**Architecture Location:** `docs/architecture/`
- Index: `docs/architecture/index.md`
- Sharded sections:
  - `paradise-dental-clinic-management-system-pdcms.md` - Document header
  - `1-architecture-overview.md` - System architecture, design principles
  - `2-technology-stack.md` - Complete stack with YAML specification
  - `3-frontend-architecture-ux-patterns.md` - Tailwind config, component patterns
  - `4-authentication-architecture-jwt-only.md` - JWT flow, auth controller

### Always Load These Files Before Development

Per `.bmad-core/core-config.yaml` → `devLoadAlwaysFiles`:
1. `docs/architecture/coding-standards.md`
2. `docs/architecture/tech-stack.md`
3. `docs/architecture/source-tree.md`

**Note:** These files don't exist yet. When implementing stories, the Dev Notes section in each story contains all necessary context.

### Story Location

User stories are stored in: `docs/stories/`
- Pattern: `{epic}.{story}-{slug}.md`
- Story template: `.bmad-core/templates/story-tmpl.yaml`

### QA Artifacts

- Assessments: `docs/qa/assessments/`
- Quality Gates: `docs/qa/gates/`
- Pattern: `{epic}.{story}-{type}-{YYYYMMDD}.md`

## Development Workflow

### Standard Story Implementation Flow

1. **Story Creation** (Scrum Master)
   ```
   /BMad:agents:sm
   *draft
   ```
   - Generates next story from PRD Epic structure
   - Review in `docs/stories/`
   - Story status: "Draft" → "Approved" (manual update)

2. **Pre-Development QA** (Optional for complex changes)
   ```
   /BMad:agents:qa
   *risk {story}
   *design {story}
   ```

3. **Implementation** (Developer)
   ```
   /BMad:agents:dev
   *develop-story {story-file-path}
   ```
   - Developer reads story and implements tasks sequentially
   - Updates Dev Agent Record section with completion notes
   - Marks tasks as complete with `[x]`
   - Updates File List with modified files
   - Sets status to "Ready for Review" when complete

4. **Story Review** (QA - **REQUIRED**)
   ```
   /BMad:agents:qa
   *review {completed-story}
   ```
   - Creates quality gate in `docs/qa/gates/`
   - Gate statuses: PASS / CONCERNS / FAIL / WAIVED

5. **Post-Review** (If needed)
   ```
   /BMad:agents:dev
   *review-qa {story}
   ```
   - Address review feedback
   - Re-run QA gate update: `/BMad:agents:qa` → `*gate {story}`

## Epic Structure & Development Roadmap

The system is organized into 5 epics (see `docs/prd/6-epic-structure-development-roadmap.md`):

1. **Epic 1: Website Foundation** (5 stories)
   - Setup environment, develop public pages (Home, About, Services, Contact), implement global navigation

2. **Epic 2: Public Booking System** (4 stories)
   - Public appointment request form, email/SMS notifications, validation

3. **Epic 3: Authentication & User Management** (5 stories)
   - JWT auth, role-based access (Admin/Manager/Dentist/Staff/Patient), patient/staff dashboards

4. **Epic 4: Staff Operations** (5 stories)
   - Queue management, patient registration, calendar, treatment charting, billing

5. **Epic 5: Analytics & Management** (4 stories)
   - Executive dashboard, reporting engine, admin tools, expense/inventory tracking

## Brand Compliance Requirements

### Three-Color System (CRITICAL)

**NO other colors allowed** - only these three plus white:

| Color Role | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| **Light Blue** | `#CEE0F3` | `bg-brand-light`, `border-brand-light` | Section backgrounds, cards, dividers, icon containers |
| **Teal Blue** | `#2D7C9C` | `text-brand-DEFAULT`, `bg-brand-DEFAULT` | Icons, subheadings, hover states, primary buttons |
| **Deep Navy** | `#214491` | `text-brand-dark`, `bg-brand-dark` | Headings, main nav, button hover states |
| **White** | `#FFFFFF` | `bg-white` | Main background (ALWAYS) |

### Typography

- **Font Family:** Prompt (Google Fonts) - **EXCLUSIVE USE**
- **H1 (Headline):** Bold (700), 48px, Color: `#214491`
- **H2 (Section Title):** Semibold (600), 32px, Color: `#214491`
- **Body:** Regular (400), 16px, Color: `#334155`
- **Line Height:** 1.5× for body text
- **Thai Text:** +0.5% letter spacing

### Core UI Components

**Primary Button:**
```css
Background: #2D7C9C (Teal Blue)
Text: #FFFFFF (White)
Border-radius: 8px
Font: Prompt SemiBold (600)
Hover: Background → #214491 (Deep Navy)
```

**Card:**
```css
Background: #FFFFFF (White)
Border: 1px solid #CEE0F3
Border-radius: 12px
Padding: 24px
Shadow: 0 4px 12px rgba(33, 68, 145, 0.08)
```

**Icons:**
- Library: Lucide React (line style)
- Color: `#2D7C9C` (Teal Blue)
- Size: 24px
- Stroke: 2-3px

## Architecture Principles

### Key Constraints

1. **Sequelize Only** - NO Prisma allowed
2. **JWT Only** - No OAuth/social login
3. **Hostinger Deployment** - Optimize for shared hosting
4. **MariaDB** - 10.6+ with mysql2 driver
5. **White Background Always** - `#FFFFFF` on all pages
6. **Mobile-First** - Full-screen responsive design

### Database Schema

- 18 core tables (relational schema)
- Sequelize migrations via Sequelize CLI
- Proper foreign keys and indexes

### Frontend Patterns

- **UI Framework:** Tailwind CSS v4 (using @import directives)
- **Components:** Headless UI (accessible primitives)
- **Charts:** Recharts (minimalist styling)
- **Icons:** Lucide React (outline/line style)
- **Forms:** React Hook Form + Yup validation
- **Calendar:** FullCalendar.io (customized to white theme)

### Component Guidelines

- Tables → Info Cards on mobile
- Sticky headers for actions
- Whitespace separation (70/30 ratio)
- Subtle borders (`border-brand-light`) and soft shadows
- Colors for actions/status only (never decorative)
- Rounded corners: 8-12px

## Configuration Files

- **BMad Config:** `.bmad-core/core-config.yaml`
- **markdownExploder:** `true` (uses md-tree for document splitting)
- **slashPrefix:** `BMad`
- **Story Location:** `docs/stories/`
- **PRD Sharded:** `docs/prd/`
- **Architecture Sharded:** `docs/architecture/`

## Document Sharding

When large documents need to be split:

```bash
# Automatic (md-tree is installed globally)
md-tree explode [source-file] [destination-folder]

# Install globally if needed
npm install -g @kayvan/markdown-tree-parser

# Via Product Owner agent
/BMad:agents:po
*shard-doc {document-path} {destination-path}
```

**Sharding Rules:**
- Splits by level 2 (##) sections
- Heading levels decrease by 1 in shards
- Creates index.md with table of contents
- Preserves code blocks, diagrams, tables, and all formatting

## Important Notes

- **UX Efficiency Rule:** All primary functions must be completable in ≤3 clicks
- **QA Review is Mandatory:** Every story requires quality gate approval before merge
- **Story Files:** Follow YAML template in `.bmad-core/templates/story-tmpl.yaml`
- **Dev Agent Record:** Only section developers should modify in story files
- **Brand Colors:** Strictly enforced - no exceptions to three-color system
- **Background:** Always pure white `#FFFFFF` - no gray backgrounds
- **Font:** Prompt font family exclusively - no fallback fonts in production

## Common Development Commands

### Frontend (from frontend/ directory)
```bash
npm run dev        # Start Vite dev server (default: http://localhost:5173)
npm run build      # Production build
npm run lint       # ESLint check
npm run test       # Run Vitest tests
npm run test:ui    # Vitest UI mode
npm run test:coverage  # Coverage report
```

### Backend (from backend/ directory)
```bash
npm run dev        # Start with nodemon
npm start          # Production start
npm test           # Jest with coverage
npm run test:watch # Jest watch mode
npm run test:unit  # Unit tests only
npm run test:integration  # Integration tests only
```

### Document Operations
```bash
# Shard PRD
md-tree explode docs/PRD.md docs/prd

# Shard Architecture
md-tree explode docs/architecture.md docs/architecture
```
