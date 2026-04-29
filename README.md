# CleanWave – React Project

A full conversion of the original HTML/CSS/JS CleanWave laundry app into a modern React project.
Everything is identical to the original — same UI, same CSS, same logic — just structured as React components.

---

## Deploy Link : https://agent-69f173a9cee7146784e3b7f2--lms09.netlify.app/

## Project Structure

```
cleanwave/
├── public/
│   └── index.html          ← CDN links for Font Awesome & Google Fonts
├── src/
│   ├── context/
│   │   └── AppContext.js   ← Global state (navigation, orders, toast) + all utility functions
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Toast.js
│   │   ├── HomePage.js
│   │   ├── ServicesPage.js
│   │   ├── BookingPage.js
│   │   ├── CalculatorPage.js
│   │   ├── OrdersPage.js
│   │   ├── InvoicePage.js
│   │   ├── LoginPage.js
│   │   └── ContactPage.js
│   ├── App.js              ← Root component + page router
│   ├── App.css             ← Original style.css (unchanged)
│   └── index.js            ← React entry point
└── package.json
```

---

## Setup Guide

### Prerequisites
- **Node.js** v16 or higher — download from https://nodejs.org
- **npm** (comes with Node.js)

### Step 1 — Install dependencies

Open a terminal, navigate to the project folder, and run:

```bash
cd cleanwave
npm install
```

This installs React, ReactDOM, and react-scripts (~5 minutes on first run).

### Step 2 — Start the development server

```bash
npm start
```

The app opens automatically at **http://localhost:3000** in your browser.
Hot reload is enabled — any file you save will instantly refresh the browser.

### Step 3 — Build for production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized `/build` folder you can upload to any static host
(Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.).

---

## What Changed (HTML → React)

| Original                        | React Version                                      |
|---------------------------------|----------------------------------------------------|
| `index.html` sections           | One component per page (`HomePage.js`, etc.)       |
| `script.js` global functions    | Moved to `AppContext.js` as hooks/helpers          |
| `navigate(pageId)`              | `useApp().navigate(page)` via React Context        |
| `localStorage` reads            | Centralized `orders` state in `AppContext`         |
| `onclick="..."` in HTML         | `onClick={...}` handlers in JSX                   |
| `document.getElementById(...)`  | Controlled inputs with `useState`                  |
| `style.css`                     | Copied as-is to `App.css` — zero changes           |
| Font Awesome & Google Fonts     | Loaded via `<link>` in `public/index.html`         |
| `sessionStorage`                | Used to pass selected service between pages        |

---

## Key Concepts Used

- **React Context API** — `AppContext.js` manages global state (current page, orders list, toast notification) so any component can read or update it without prop drilling.
- **useState / useEffect** — All form inputs, modals, and toggles are controlled via local component state.
- **Conditional rendering** — Pages are shown/hidden by rendering the matching component based on `currentPage`.
- **localStorage** — Orders and users are still persisted in `localStorage`, same as the original app.

---

## Deploying to Vercel (Free, Recommended)

1. Push the project to a GitHub repository.
2. Go to https://vercel.com → "New Project" → import your repo.
3. Vercel auto-detects Create React App — just click **Deploy**.
4. Your app is live in ~60 seconds with a public URL.

---

## Deploying to Netlify

1. Run `npm run build` locally.
2. Go to https://netlify.com → drag & drop the `/build` folder.
3. Done — live instantly.

---

## Troubleshooting

| Problem                        | Fix                                                       |
|-------------------------------|-----------------------------------------------------------|
| `npm install` fails           | Make sure Node.js ≥ 16 is installed: `node -v`           |
| Port 3000 already in use      | Run `PORT=3001 npm start` to use a different port        |
| Icons not showing             | Check internet connection (Font Awesome loads from CDN)  |
| Orders not appearing          | Open DevTools → Application → localStorage → check `cw_orders` |
