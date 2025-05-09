// Main entry point for the application
// Import only what's needed for global exports
import { calculateMembershipYear } from './form/handlers.js';
import { getOrdinalSuffix } from './form/validation.js';

// Theme is initialized in the HTML with class="light-theme" on the body element
console.log('Theme should be initialized via HTML');

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('dateDisplay').innerHTML = currentDate;

    // Note: All event listeners are now initialized via inline script
    console.log('All event listeners should be initialized via inline script');
});

// Note: All event listeners are now handled by the inline script in the HTML

// Export any functions that might be needed globally
export {
    calculateMembershipYear,
    getOrdinalSuffix
};
