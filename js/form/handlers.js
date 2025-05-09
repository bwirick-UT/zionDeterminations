// Event handlers and form logic
import { parseStartDate, isValidStartDate } from './validation.js';
import {
    displayMembershipYear,
    toggleTobaccoUserSection,
    toggleMinorSection,
    toggleExpirationDate,
    updateEligibilitySections
} from './render.js';

/**
 * Initializes toggle buttons
 */
function initToggleButtons() {
    console.log('Initializing toggle buttons...');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    console.log('Found toggle buttons:', toggleButtons.length);

    toggleButtons.forEach(button => {
        console.log('Setting up button:', button.id);
        button.addEventListener('click', function(event) {
            console.log('Button clicked:', event.target.id);
            // Get the ID of the clicked button
            const clickedButtonId = event.target.id;

            // Determine the paired button's ID
            let pairedButtonId;
            if (clickedButtonId.includes('left')) {
                pairedButtonId = clickedButtonId.replace('left', 'right');
            } else {
                pairedButtonId = clickedButtonId.replace('right', 'left');
            }

            console.log('Paired button ID:', pairedButtonId);
            // Call the function to switch active state, passing both IDs
            switchActive(clickedButtonId, pairedButtonId);
        });
    });
}

/**
 * Switches the active state between paired buttons
 * @param {string} clickedId - The ID of the clicked button
 * @param {string} pairedId - The ID of the paired button
 */
function switchActive(clickedId, pairedId) {
    console.log('switchActive called with:', clickedId, pairedId);
    const clickedButton = document.getElementById(clickedId);
    const pairedButton = document.getElementById(pairedId);

    console.log('Clicked button:', clickedButton);
    console.log('Paired button:', pairedButton);

    // Check if the clicked button is already active
    if (clickedButton.classList.contains('active')) {
        console.log('Button already active, removing active class');
        clickedButton.classList.remove('active');
        return;
    }

    // Toggle the 'active' class on both buttons
    console.log('Adding active class to clicked button, removing from paired button');
    clickedButton.classList.add('active');
    pairedButton.classList.remove('active');

    // Log the final state
    console.log('Final clicked button classes:', clickedButton.className);
    console.log('Final paired button classes:', pairedButton.className);
}

/**
 * Calculates the membership year based on start date
 */
function calculateMembershipYear() {
    const startDate = parseStartDate();

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let membershipYear = currentDate.getFullYear() - startDate.getFullYear();

    // Check if the start date is valid
    if (!isValidStartDate(startDate, currentDate)) {
        displayMembershipYear(-1);
        return;
    }

    // Adjust if the current date is before the start date anniversary this year
    const currentMonth = currentDate.getMonth();
    const startMonth = startDate.getMonth();
    const currentDay = currentDate.getDate();
    const startDay = startDate.getDate();

    if (
        currentMonth < startMonth ||
        (currentMonth === startMonth && currentDay < startDay)
    ) {
        membershipYear--;
    }

    // Output the membership year
    displayMembershipYear(membershipYear);
}

/**
 * Handles member age input changes
 * @param {Event} event - The input event
 */
function handleMemberAgeChange(event) {
    const memberAge = document.getElementById('member-age').value;
    if (memberAge < 50 && memberAge >= 0) {
        clearTimeout(window.delayTimeout);
        toggleTobaccoUserSection(memberAge);
        window.delayTimeout = setTimeout(() => toggleMinorSection(memberAge), 1000);
    } else if (memberAge >= 50) {
        clearTimeout(window.delayTimeout);
        window.delayTimeout = setTimeout(() => toggleTobaccoUserSection(memberAge), 500);
    } else {
        toggleTobaccoUserSection(memberAge);
        toggleMinorSection(memberAge);
    }
}

/**
 * Handles eligibility selection changes
 * @param {Event} event - The change event
 */
function handleEligibilityChange(event) {
    const selectedChoice = event.target.value;
    updateEligibilitySections(selectedChoice);
}

/**
 * Checks if medical records are verified
 * @returns {string} Verification status
 */
function verifiedRecords() {
    const left_clicked = document.getElementById('left4');
    const right_clicked = document.getElementById('right4');
    if (left_clicked.classList.contains('active')) {
        const verified = left_clicked.value;
        console.log(`Records ${verified} been verified`);
        return verified;
    } else if (right_clicked.classList.contains('active')) {
        const not_verified = right_clicked.value;
        console.log(`Records ${not_verified} been verified`);
        return not_verified;
    } else {
        return console.error('No option selected');
    }
}

/**
 * Clears the clipboard
 * @returns {Promise} Promise that resolves when clipboard is cleared
 */
function clearClipboard() {
    return navigator.clipboard.writeText('')
        .then(() => {
            console.log("Clear clipboard successfully");
        })
        .catch(() => {
            console.log("Failed to clear clipboard")
        });
}

/**
 * Copies form content to clipboard
 */
function copyDivContent() {
    clearClipboard();
    const container = document.getElementById('copiedInformation');
    let content = '';
    const currentDate = new Date().toLocaleDateString();

    // Loop through all the child elements of the div
    container.childNodes.forEach(node => {
        node.childNodes.forEach(g_node => {
            if (g_node.nodeType === Node.ELEMENT_NODE) {
                console.log(g_node, g_node.nodeType, g_node.nodeName);
                if (g_node.tagName === 'TEXTAREA') {
                    content += g_node.value + '\n\n';
                } else if (g_node.tagName === 'SELECT') {
                    const displayStyle = window.getComputedStyle(g_node).display;
                    if (displayStyle === 'none') {
                        console.log('SELECT was: ' + displayStyle)
                        return;
                    }
                    content += g_node.options[g_node.selectedIndex].innerHTML + '\n\n';
                } else if (g_node.tagName === 'SPAN') {
                    content += currentDate + " ";
                } else if (g_node.tagName === 'P') {
                    content += g_node.innerHTML;
                } else if (g_node.tagName === 'BUTTON') {
                    if (g_node.classList.contains('active')) {
                        content += verifiedRecords();
                    } else {
                        return;
                    }
                } else if (g_node.tagName === 'BR') {
                    return;
                }
            }
        });
    });

    content += `\n${document.getElementById('final-statement').innerHTML}`;

    navigator.clipboard.writeText(content)
        .then(() => {
            alert("Container content copied to clipboard!");
        })
        .catch(err => {
            alert("Failed to copy: ", err);
        });
}

export {
    initToggleButtons,
    switchActive,
    calculateMembershipYear,
    handleMemberAgeChange,
    handleEligibilityChange,
    verifiedRecords,
    clearClipboard,
    copyDivContent
};
