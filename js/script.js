// Import functions from other modules
import { renderApps, setFooterYear } from './uiManager.js';
import { setupThemeSwitcher } from './themeManager.js';
import * as debtOverview from './apps/debtOverview.js';

// Theme Switcher
const btn = document.getElementById("themeSwitcherButton");
const menu = document.querySelector(".theme-dropdown");

// Module Registry
const modules = {
  debtOverview,
};

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

  const container = document.getElementById('debtOverviewContainer');
  if (container && modules.debtOverview) {
    container.classList.add('active');
    modules.debtOverview.init();
  }
  
    console.log("Main script loaded and initialized.");
});
