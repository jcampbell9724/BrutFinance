# Multi-Theme Finance App Dashboard

A modular, browser-based dashboard for mini finance applications. Instantly switch themes, launch individual modules (like Debt Manager), and persist user data in-browser.

## Features

* **Theme Switcher**: Toggle between `brutalpop`, `brutalist`, and `clean` themes with persistent storage.
* **App Launcher**: Clickable cards render individual modules on demand (debt manager, amortization table, etc.).
* **State Management**: Centralized `stateManager` wraps `localStorage` for per-module data persistence.
* **Debt Manager Module**: Add, edit, delete debts; auto-calc PMT & payoff dates; view totals.
* **Extensible**: Drop new modules in `/js/apps/` and register them in `config.js`.

## Prerequisites

* Modern web browser with ES Module support.
* (Optional) Local HTTP server for module imports (e.g., `live-server`, VSCode Live Server).

## Installation

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```
2. **Serve files**

   * Simple: open `index.html` in a browser (some browsers restrict `file://` module imports).
   * Recommended: run a local server:

     ```bash
     npx live-server .
     ```

## File Structure

```
/index.html             ← entrypoint, includes #appGridContainer & #moduleContainer
/css/
  ├─ style.css          ← base styles
  ├─ brutalpop.css      ← theme: Brutal Pop
  ├─ brutalist.css      ← theme: Brutalist
  └─ clean.css          ← theme: Clean
/js/
  ├─ config.js          ← `appsData` array for launcher cards
  ├─ script.js          ← entrypoint: initializes themes, launcher, filter
  ├─ stateManager.js    ← wrapper around `localStorage` APIs
  ├─ themeManager.js    ← dropdown logic + theme persistence
  ├─ uiManager.js       ← renders launcher & handles clicks
  ├─ debtUtils.js       ← calcMonthlyPayment & buildAmortization
  └─ apps/
      ├─ debtOverview.js  ← Debt Manager module (CRUD + table)
      └─ amortTable.js    ← future: detailed amortization view
```

## Usage

* **Launch App**: Click any card in the grid to load its module in the main panel.
* **Switch Theme**: Click `Theme ▾` in the header and select a theme; persists across reloads.
* **Search Apps**: Use the search bar to filter launcher cards by title or description.

## Adding a New Module

1. **Add config entry** in `js/config.js`:

   ```js
   {
     id: "newModule",
     iconText: "📊",
     title: "My Module",
     description: "What it does"
   }
   ```
2. **Create** `/js/apps/newModule.js` exporting `export function init() { ... }`.
3. **Render** into `#moduleContainer` and wire up any UI/state logic.

## State Management

* Use `getState(appId)` to read saved data.
* Use `setState(appId, partial)` to merge & persist updates.
* `clearState(appId)` or `clearState()` to reset.

## Development & Testing

* **Lint & Format**: set up ESLint + Prettier.
* **Unit Tests**: Jest for `debtUtils` and `stateManager`.
* **CI**: GitHub Actions to run tests & linters on push.

## Deployment

* Static site; deploy anywhere (Netlify, GitHub Pages).
* Ensure `index.html` and `/css`, `/js` folders are served.

## License

MIT © 
