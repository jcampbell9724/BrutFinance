// Import functions from other modules
import { renderApps, setFooterYear } from './uiManager.js';
import { setupThemeSwitcher } from './themeManager.js';
// If you had specific app logic, you might import it like this:
// import { initializeFinanceCalculator } from './apps/financeCalculatorApp.js';

// In script.js (or themeManager.js), wrap your menu logic in a toggle:
const btn = document.getElementById("themeSwitcherButton");
const menu = document.querySelector(".theme-dropdown");

btn.addEventListener("click", e => {
  e.stopPropagation();
  menu.classList.toggle("show");
  btn.setAttribute("aria-expanded", menu.classList.contains("show"));
});

// hide when clicking outside
document.addEventListener("click", () => {
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    btn.setAttribute("aria-expanded", false);
  }
});

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements
    renderApps();
    setFooterYear();

    // Setup theme switching functionality
    setupThemeSwitcher();

    // Initialize individual apps if needed
    // For example:
    // if (document.getElementById('financeCalculatorContainer')) { // Check if the app's container exists
    //     initializeFinanceCalculator();
    // }
    console.log("Main script loaded and initialized.");
});
