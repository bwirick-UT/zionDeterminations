// Main entry point for the application
import { copyDivContent, handleStartDateChange, copyChoiceContent } from './form/handlers.js';
import { initThemeToggle } from './form/theme.js';
import { initToggleButtons } from './form/toggles.js';
import { initEligibilityHandlers } from './form/eligibility.js';
import { initMemberHandlers } from './form/member.js';
import { getOrdinalSuffix } from './form/validation.js';
import { calculateMembershipYear } from './form/handlers.js';
import { initCheckboxSelectors } from './form/checkboxes.js';
import { initBulletLists } from './form/bulletLists.js';
import { initSortableLists } from './form/sortable.js';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');

    // Display current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('dateDisplay').innerHTML = currentDate;

    // Initialize theme toggle
    initThemeToggle();

    // Initialize toggle buttons
    initToggleButtons();

    // Initialize eligibility handlers
    initEligibilityHandlers();

    // Initialize member handlers
    initMemberHandlers();

    // Initialize checkbox selectors
    initCheckboxSelectors();

    // Initialize bullet lists
    initBulletLists();

    // Initialize sortable lists
    initSortableLists();

    // Initialize start date handler
    const startDateInput = document.getElementById('start-date');
    if (startDateInput) {
        startDateInput.addEventListener('input', handleStartDateChange);
    }

    // Add event listener for the main copy button
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', copyDivContent);
    }

    // Add event listener for the choice copy button
    const copyChoiceButton = document.getElementById('copyChoiceButton');
    if (copyChoiceButton) {
        copyChoiceButton.addEventListener('click', copyChoiceContent);
    }

    console.log('All event listeners initialized via main.js');
});

// Export any functions that might be needed globally
export {
    calculateMembershipYear,
    getOrdinalSuffix
};
