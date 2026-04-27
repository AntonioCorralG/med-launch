# DNV Healthcare Quote Request — Frontend Assessment

A multi-step form application built as part of the Medlaunch Frontend Developer interview assessment.

---

## Tech Stack

- **Framework:** React 18 (JavaScript)
- **Build Tool:** Vite
- **Styling:** Pure CSS with custom properties (no UI libraries)
- **State Management:** React Context API + useReducer
- **Testing (Unit):** React Testing Library + Vitest

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone

# 2. Navigate into the project
cd YOUR_REPO_NAME

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Development Approach

- **Context + Reducer:** All form data lives in a single `FormContext` powered by `useReducer`. Each step dispatches an `UPDATE_STEP_DATA` action to merge its fields into the global state.
- **Step Navigation:** Steps are driven by a numeric index. An array of step components maps index → component, keeping the router logic in one place.
- **Component Structure:** Shared UI primitives (Button, Input, Checkbox, etc.) live in `src/components/` and are reused across steps.
- **CSS Strategy:** All styling uses plain CSS with custom properties defined in `variables.css`. No third-party CSS libraries are used.

---

## Assumptions
- The email verification is UI only. It doesn't not send an actual email
- The 'Download CSV Template' in the file upload screen is a non-functioning placeholder
- The "Download as PDF" and "Export to CSV" on the Review screen do not generate real files.
- The conditional Facility Type options on Step 2 are treated as two distinct states based on the Figma variants shown.
- Figma shows two variants for the Facility Type radio list (step 2). No trigger condition is provided or annotates, a single list is used matching the primary view.

---

## Known Issues / Limitations


- None at this time.