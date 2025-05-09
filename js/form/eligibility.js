// Eligibility and shareable selection handlers
import { updateAnniversaryAndCap } from './handlers.js';
import { updateEligibilitySections } from './render.js';

/**
 * Handles eligibility selection changes
 */
function handleEligibilityChange() {
    const eligibilitySelect = document.getElementById('eligibility');
    const selectedChoice = eligibilitySelect.value;
    console.log("Eligibility changed to:", selectedChoice);

    const determinationDiv = document.getElementById('determination');
    const placeholderDiv = document.getElementById('determination-placeholder');

    // Show or hide the determination div based on selection
    if (selectedChoice === 'null') {
        // Hide the determination div and show placeholder if "Select Eligibility Status..." is selected
        determinationDiv.style.display = 'none';
        placeholderDiv.style.display = 'block';
    } else {
        // Show the determination div and hide placeholder for any valid selection
        determinationDiv.style.display = 'block';
        placeholderDiv.style.display = 'none';

        // Update the eligibility sections
        updateEligibilitySections(selectedChoice);
    }

    // Hide the anniversary and cap display when eligibility changes
    document.getElementById('anniversaryAndCap').style.display = 'none';
}

/**
 * Handles shareable selection changes
 */
function handleShareableChange() {
    const shareableSelect = document.getElementById('shareable');
    const selectedValue = shareableSelect.value;
    const displayElement = document.getElementById('anniversaryAndCap');

    if (selectedValue === 'posDeterCap') {
        // Update and show the anniversary and cap
        updateAnniversaryAndCap();
        displayElement.style.display = 'inline';

        // Make sure the text is visible by forcing a reflow
        setTimeout(() => {
            displayElement.style.display = 'none';
            setTimeout(() => {
                displayElement.style.display = 'inline';
            }, 10);
        }, 10);
    } else {
        // Hide the anniversary and cap
        displayElement.style.display = 'none';
    }
}

/**
 * Initializes eligibility and shareable selection handlers
 */
function initEligibilityHandlers() {
    // Eligibility selection
    const eligibilitySelect = document.getElementById('eligibility');
    if (eligibilitySelect) {
        eligibilitySelect.addEventListener('change', handleEligibilityChange);
    }

    // Shareable selection
    const shareableSelect = document.getElementById('shareable');
    if (shareableSelect) {
        shareableSelect.addEventListener('change', handleShareableChange);
    }
}

export {
    handleEligibilityChange,
    handleShareableChange,
    initEligibilityHandlers
};
