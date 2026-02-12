# Little Lemon — Booking Form

Simple, accessible React app (Vite) to handle table bookings for the Little Lemon restaurant.

## Features
- UX/UI: semantic layout (header, main, footer) with responsive grid.
- Accessibility: labeled inputs, fieldset/legend, skip link, focus styles, `aria-invalid`, error regions with `role="alert"`, success with `role="status"`.
- Validation: required fields, email pattern, guest count (1–10), date not in the past.
- Error handling: inline validation + API error banner; disabled submit while submitting.
- Tests: Vitest + Testing Library covering rendering, validation, successful submit, and error state.

## Requirements
- Node.js 18+

## Setup
```bash
npm install
```

## Run dev server
```bash
npm run dev
```
Then open the printed URL in your browser.

## Run tests
```bash
npm test
```
Watch mode:
```bash
npm run test:watch
```
Coverage:
```bash
npm run coverage
```

## Build for production
```bash
npm run build && npm run preview
```

## Project structure
- `src/App.jsx`: semantic layout and page scaffolding.
- `src/components/BookingForm.jsx`: form UI + validation and submission.
- `src/services/bookings.js`: small fake API you can replace with real backend.
- `src/components/BookingForm.test.jsx`: unit tests.
- `src/App.css`, `src/index.css`: styles and responsive rules.

## Notes on UX/UI
- Brand-inspired colors (`#495E57` green, `#F4CE14` yellow) for recognition.
- Clear visual hierarchy: hero heading + concise lead, then the form.
- Inputs grouped into Reservation and Contact details for clarity.
- Strong keyboard support (skip link, visible focus, proper labels/ids).

## Replacing the fake API
Swap `submitBooking` in `src/services/bookings.js` with a real `fetch` call when backend is ready.
# little-leon-booking
"# little-leon-booking-main" 
