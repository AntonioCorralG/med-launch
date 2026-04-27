# QA Test Report
**Project:** DNV Healthcare Quote Request — Frontend Assessment  
**Tester:** Gonzalo Corral
**Date:** April 2026  
---

## Tools Used
- **Browser:** Google Chrome DevTools (console, network, elements inspector)
- **React DevTools:** Chrome extension — used to inspect context state and component tree
- **Manual Testing:** Click-through testing of all 6 form steps
---

## Test Scenarios Executed

### Step 1 — DNV Quote Request

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 1 | Submit form with all fields empty | Error messages appear under each required field | ✅ Pass |
| 2 | Enter invalid email format | "Enter a valid email address" error appears | ✅ Pass |
| 3 | Check "Same as Legal Entity Name" checkbox | DBA field auto-fills with legal name and disables | ✅ Pass |
| 4 | Uncheck "Same as Legal Entity Name" | DBA field clears and re-enables | ✅ Pass |
| 5 | Fill all required fields and click Continue | Advances to Step 2, progress bar updates | ✅ Pass |
| 6 | Navigate back from Step 2 | Step 1 values are restored from context | ✅ Pass |

---

### Step 2 — Facility Details

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 7 | Click Continue with no radio selected | "Please select a facility type" error appears | ✅ Pass |
| 8 | Select a facility type and click Continue | Advances to Step 3 | ✅ Pass |
| 9 | Navigate back from Step 3 | Previously selected radio is still selected | ✅ Pass |

---

### Step 3 — Leadership Contacts

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 10 | Submit with CEO fields empty | Required field errors appear for CEO section | ✅ Pass |
| 11 | Check "Same as Primary Contact" on CEO | Fields auto-fill from Step 1 data and disable | ✅ Pass |
| 12 | Uncheck "Same as Primary Contact" on CEO | Fields clear and re-enable | ✅ Pass |
| 13 | Leave Director of Quality fields empty | No validation errors — fields are optional | ✅ Pass |
| 15 | Enter invalid ZIP code (letters) | "Enter a valid 5-digit ZIP code" error appears | ✅ Pass |
| 16 | Enter valid ZIP code (5 digits) | No error, Continue advances | ✅ Pass |
| 17 | Navigate back and return to Step 3 | All previously entered values restored | ✅ Pass |

---

### Step 4 — Site Information

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 18 | Click Continue with no card selected | Validation message appears | ✅ Pass |
| 19 | Select Single Location | Card highlights with blue border and light background | ✅ Pass |
--Bug -> Validation immediately displaying on screen load.
| 20 | Select Multiple Locations | Upload section appears below the cards | ✅ Pass |
--limitation -> upload is non functioning
| 21 | Switch from Multiple back to Single | Upload section disappears | ✅ Pass |
| 22 | Navigate back from Step 5 | Selected location type is restored | ✅ Pass |

---

### Step 5 — Services & Certifications

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 23 | Check multiple service checkboxes | All selected independently with no conflict | ✅ Pass |
| 24 | Select a standard from dropdown | Value saves and displays correctly on Review screen | ✅ Pass |
| 25 | Enter dates in both date pickers | Values accepted and saved to context | ❌ Fail |
| 26 | Click Continue with no services selected | Advances without error — services are optional | ✅ Pass |
| 27 | Navigate back from Step 6 | Checked services and dates are restored | ✅ Pass |

---

### Step 6 — Review & Submit

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 28 | All accordion sections render expanded by default | All five sections visible on load | ✅ Pass |
| 29 | Click accordion header | Section collapses, chevron changes to ▼ | ✅ Pass |
| 30 | Click collapsed accordion header | Section expands, chevron changes to ▲ | ✅ Pass |
| 31 | Verify data from all steps appears correctly | All entered values visible in correct sections | ✅ Pass |
| 32 | Click Submit without checking certification checkbox | Error message appears, form does not submit | ✅ Pass |
| 33 | Check certification checkbox and click Submit | Full payload logged to console, no errors | ✅ Pass |
| 34 | Click "Download as PDF" | Logs stub message to console | ✅ Pass |
| 35 | Click "Export to CSV" | Logs stub message to console | ✅ Pass |

---

### Navigation & Progress Bar

| # | Scenario | Expected Result | Status |
|---|----------|-----------------|--------|
| 36 | Click Continue through all 6 steps | Progress bar fills one segment per step | ✅ Pass |
| 37 | Click Previous on any step | Returns to prior step with data intact | ✅ Pass |
| 38 | Click a completed step label in progress bar | Jumps back to that step | ✅ Pass |
| 39 | Step counter "Step X of 6" updates correctly | Correct number shown on every step | ✅ Pass |

---

## Bugs Identified & Resolved

| # | Bug | Root Cause | Resolution |
|---|-----|------------|------------|
| 1 | Navigation buttons not working — no errors but clicks had no effect | Action type mismatch: code referenced `ACTIONS.SET_CURRENT_STEP` but constant was defined as `ACTIONS.SET_STEP` | Renamed all references to `ACTIONS.SET_STEP` to match the constant |
| 2 | `updateStepData` was undefined in step components | Function was defined in `useFormContext` hook but omitted from the return object | Added `updateStepData` to the hook's return statement |
| 3 | StepNav segment CSS not applying | BEM class typo — `step--nav__segment--complete` (double dash) instead of `step-nav__segment--complete` | Fixed class name to use consistent BEM naming |
| 4 | HMR not updating Leadership Contacts page after file saves | A special character `ƒ` (Option+F on Mac) was present in the JSX instead of a regular `f`, causing Vite's parser to silently fail on that file | Identified and replaced the invalid character |
| 5 | Leadership Contacts crashing on render | `useForm` from `react-hook-form` was used but never imported | Added the missing import statement |
| 6 | Dev server not reflecting changes across all pages | VPN was intercepting local file system events, preventing Vite HMR from detecting saves | Disabled VPN during local development |

---

## Known Limitations

- Multi-date tag inputs for thrombolytic and thrombectomy dates are static placeholders
- Service category tabs and search filter are not implemented — all services shown in flat grid
- File upload in Site Information (Multiple Locations) is a static UI — no actual file handling
- Email verification flow is static UI only — no email is sent
- Edit buttons on Review & Submit accordions log to console but do not navigate back to steps
- Download as PDF and Export to CSV are stub buttons