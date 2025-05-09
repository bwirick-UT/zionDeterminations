// Toggle button handling functions
import { toggleExpirationDate } from './render.js';

/**
 * Initializes all toggle buttons
 */
function initToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    console.log('Found toggle buttons:', toggleButtons.length);

    toggleButtons.forEach(button => {
        button.addEventListener('click', handleToggleButtonClick);
    });
}

/**
 * Handles toggle button click events
 * @param {Event} event - The click event
 */
function handleToggleButtonClick(event) {
    // Get the ID of the clicked button
    const clickedButtonId = event.target.id;

    // Determine the paired button's ID
    let pairedButtonId;
    if (clickedButtonId.includes('left')) {
        pairedButtonId = clickedButtonId.replace('left', 'right');
    } else {
        pairedButtonId = clickedButtonId.replace('right', 'left');
    }

    // Get the buttons
    const clickedButton = document.getElementById(clickedButtonId);
    const pairedButton = document.getElementById(pairedButtonId);

    // Check if the clicked button is already active
    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');

        // Special handling for expiration date
        if (clickedButtonId === 'left3') {
            document.getElementById('expiration-date').style.display = 'none';
        }
        return;
    }

    // Toggle the 'active' class on both buttons
    clickedButton.classList.add('active');
    pairedButton.classList.remove('active');

    // Special handling for expiration date
    if (clickedButtonId === 'left3') {
        updateExpirationDate();
    } else if (clickedButtonId === 'right3') {
        document.getElementById('expiration-date').style.display = 'none';
    }
}

/**
 * Updates the expiration date display
 */
function updateExpirationDate() {
    // Get the start date
    const startDateString = document.getElementById('start-date').value;
    if (startDateString) {
        const [year, month, day] = startDateString.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);
        toggleExpirationDate(true, startDate);
    }
}

export {
    initToggleButtons,
    handleToggleButtonClick,
    updateExpirationDate
};
