import { appsData } from './config.js'; // Import app data

// Function to create a single app card HTML string
function createAppCard(app) {
    return `
        <div class="app-card">
            <div class="app-icon-placeholder">${app.iconText || 'APP'}</div>
            <h2>${app.title}</h2>
            <p>${app.description}</p>
            <a href="${app.link}" class="app-link">Access Module</a>
        </div>
    `;
}

// Function to render all app cards into the grid
export function renderApps() { // Export this function
    const appGridContainer = document.getElementById('appGridContainer');
    if (!appGridContainer) {
        console.error("Error: App grid container not found!");
        return;
    }

    let allCardsHtml = "";
    appsData.forEach(app => {
        allCardsHtml += createAppCard(app);
    });
    appGridContainer.innerHTML = allCardsHtml;
}

// Function for search bar
const filterInput = document.getElementById("appFilter");
filterInput.addEventListener("input", () => {
  const term = filterInput.value.toLowerCase();
  document.querySelectorAll(".app-card").forEach(card => {
    const txt = card.textContent.toLowerCase();
    card.style.display = txt.includes(term) ? "" : "none";
  });
});


// Function to set the current year in the footer
export function setFooterYear() { // Export this function
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}