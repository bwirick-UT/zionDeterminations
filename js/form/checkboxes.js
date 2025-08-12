// Checkbox selectors handling functions
import { calculateSixMonthsPriorDate } from './handlers.js';

/**
 * Initializes all checkbox selectors
 */
function initCheckboxSelectors() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    console.log('Found checkbox selectors:', checkboxes.length);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

/**
 * Handles checkbox change events
 * @param {Event} event - The change event
 */
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const checkboxId = checkbox.id;
    const isChecked = checkbox.checked;
    
    console.log(`Checkbox ${checkboxId} is now ${isChecked ? 'checked' : 'unchecked'}`);
    
    // Handle six months checkbox
    if (checkboxId === 'six-months') {
        const sixMonthsDateElement = document.getElementById('sixMonthsDate');
        if (isChecked) {
            const sixMonthsDate = calculateSixMonthsPriorDate();
            sixMonthsDateElement.textContent = `6 Month Prior: ${sixMonthsDate}`;
            sixMonthsDateElement.style.display = 'block';
        } else {
            sixMonthsDateElement.style.display = 'none';
        }
    }
}

export {
    initCheckboxSelectors,
    handleCheckboxChange
};
