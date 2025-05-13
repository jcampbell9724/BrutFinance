// Import functions from other modules
import { renderApps, setFooterYear } from './uiManager.js';
import { setupThemeSwitcher } from './themeManager.js';
import * as debtOverview from './apps/debtOverview.js';
import { init as initDebt } from './debtOverview.js'; // Make sure to import initDebt

// Theme switcher dropdown logic
const themeSwitcherButton = document.getElementById("themeSwitcherButton");
const themeDropdownMenu = document.querySelector(".theme-dropdown");

// Module registry
const modules = {
  debtOverview,
};

if (themeSwitcherButton && themeDropdownMenu) {
    themeSwitcherButton.addEventListener("click", e => {
        e.stopPropagation(); // Prevent click from bubbling to document
        themeDropdownMenu.classList.toggle("show");
        themeSwitcherButton.setAttribute("aria-expanded", themeDropdownMenu.classList.contains("show"));
    });

    // Hide theme dropdown when clicking outside
    document.addEventListener("click", () => {
        if (themeDropdownMenu.classList.contains("show")) {
            themeDropdownMenu.classList.remove("show");
            themeSwitcherButton.setAttribute("aria-expanded", false);
        }
    });
} else {
    console.warn("Theme switcher button or dropdown menu not found. Theme switching may not work.");
}

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements
    renderApps();    // Dynamically creates app cards in the #appGridContainer
    setFooterYear();

    // Setup theme switching functionality
    setupThemeSwitcher();

    // Attach event listeners to dynamically created app cards to launch modules
    document.querySelectorAll('.app-card').forEach(card => {
        const appLink = card.querySelector('.app-link'); // This is the <a> or <button> tag
        const appId = card.dataset.appId; // e.g., "debtOverview" from data-app-id attribute

        if (appLink && appId) {
            const moduleContainerId = appId + 'Container'; // Constructs ID like "debtOverviewContainer"

            appLink.addEventListener('click', e => {
                e.preventDefault(); // IMPORTANT: Prevents default <a> tag behavior (like navigating to '#')

                // Hide all currently active module containers
                document.querySelectorAll('.module-container.active').forEach(m => {
                    m.classList.remove('active');
                });

                // Show the target module container
                const targetModule = document.getElementById(moduleContainerId);
                if (targetModule) {
                    targetModule.classList.add('active'); // Your CSS should style '.module-container.active' to be visible

                    // Initialize specific modules if necessary
                    if (appId === 'debtOverview') {
                        console.log(`Activating and initializing module: ${moduleContainerId}`);
                        initDebt(); // Initialize the debt module
                    }
                    // Example for other modules:
                    // else if (appId === 'taskMaster') {
                    //   initTaskMaster();
                    // }
                } else {
                    console.error(`Module container with ID '${moduleContainerId}' not found.`);
                }
            });
        } else {
            if (!appLink) console.error('App link element (.app-link) not found in card:', card);
            if (!appId) console.error('data-app-id attribute not found on card:', card);
        }
    });

    console.log("Main script loaded and initialized. App launchers attached.");
});
