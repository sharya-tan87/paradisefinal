# 8. 🎨 UI/UX Specifications

## Visual Identity & Style Guide

### Color Palette (Strict Adherence)

| Color Role | Hex Code | Usage |
|:-----------|:---------|:------|
| **Primary Blue** | `#214491` | Headings, Main Nav, Primary Buttons, Footer |
| **Secondary Blue** | `#2D7C9C` | Icons, Subheadings, Hover States |
| **Soft Sky Blue** | `#CEE0F3` | Section Backgrounds, Cards, Dividers |
| **White** | `#FFFFFF` | Main Background, Text Contrast |

### Typography

- **Font Family:** Prompt (Google Fonts)
- **H1 (Headline):** Bold (700), 48px. Color: `#214491`
- **H2 (Section Title):** Semibold (600), 32px. Color: `#214491`
- **Body:** Regular (400), 16px. Color: `#334155`

## Core UI Components (Brand-Compliant)

### Buttons
```css
Primary Button:
- Background: #2D7C9C (Teal Blue)
- Text: #FFFFFF (White)
- Border-radius: 8px
- Font: Prompt SemiBold (600)
- Hover: Background → #214491 (Deep Navy)
````

### Cards & Containers

```css
Card:
- Background: #FFFFFF (White)
- Border: 1px solid #CEE0F3
- Border-radius: 12px
- Padding: 24px
- Shadow: 0 4px 12px rgba(33, 68, 145, 0.08)
```

### Icons

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