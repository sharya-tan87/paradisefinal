# 3. Frontend Architecture & UX Patterns

## 3.1 Design Layout Reference

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

## 3.2 Tailwind Configuration (Minimalist Dental Theme)

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

## 3.3 Component Styling Examples

  * **Primary Button:** `bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 transition-colors shadow-sm`
  * **Card:** `bg-white rounded-xl border border-gray-100 shadow-soft p-6`
  * **Input:** `bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none`
  * **Sidebar:** `w-64 bg-white border-r border-gray-100 h-full` (Text: Navy for active, Gray for inactive)

-----
