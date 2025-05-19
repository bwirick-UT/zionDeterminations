// Event handlers and form logic
import { parseStartDate, isValidStartDate, getOrdinalSuffix } from './validation.js';
import { displayMembershipYear } from './render.js';
import { updateExpirationDate } from './toggles.js';
import { getListItems, isAdditionalIUAVisible, getAdditionalIUAText, isMaternityVisible, getMaternityText } from './bulletLists.js';

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
 * Handles start date input changes
 */
function handleStartDateChange() {
    console.log("Start date changed");
    // Clear any existing timeout to avoid multiple calculations
    clearTimeout(window.delayTimeout);

    // Set a new timeout for 1 second
    window.delayTimeout = setTimeout(function() {
        // Get the date from the input field
        const startDateString = document.getElementById('start-date').value;

        if (!startDateString) {
            document.getElementById('result').textContent = "Please enter a valid start date.";
            return;
        }

        // Split the date string into components
        const [year, month, day] = startDateString.split('-').map(Number);

        // Create a new Date object
        const startDate = new Date(year, month - 1, day);

        // Get the current date
        const currentDate = new Date();

        // Check if the start date is valid
        if (isNaN(startDate) || startDate > currentDate || startDate.getFullYear() < 2019) {
            document.getElementById('result').textContent = "Please enter a valid start date.";
            return;
        }

        // Calculate the difference in years
        let membershipYear = currentDate.getFullYear() - startDate.getFullYear();

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
        document.getElementById('result').textContent =
            `Membership year: ${membershipYear + 1}${getOrdinalSuffix(membershipYear + 1)}`;

        // Update expiration date if bridge is active
        if (document.getElementById('left3').classList.contains('active')) {
            updateExpirationDate();
        }

        // Update anniversary and cap if "after cap" is selected
        const shareableSelect = document.getElementById('shareable');
        if (shareableSelect.style.display === 'inline' &&
            shareableSelect.value === 'posDeterCap') {
            updateAnniversaryAndCap();
            document.getElementById('anniversaryAndCap').style.display = 'inline';
        }
    }, 1000);
}

/**
 * Calculates medical expense cap based on membership year and tobacco use
 * @param {number} membershipYear - The membership year
 * @param {boolean} isTobaccoUser - Whether the member is a tobacco user
 * @returns {number} The calculated cap amount
 */
function calculateMedicalExpenseCap(membershipYear, isTobaccoUser) {
    // Define cap values
    const CAPS = {
        YEAR_2: 25000,
        YEAR_3: 50000,
        YEAR_4_PLUS: 125000,
        TOBACCO_USER: 50000
    };

    let cap;

    if (isTobaccoUser) {
        cap = CAPS.TOBACCO_USER;
    } else {
        if (membershipYear >= 4) {
            cap = CAPS.YEAR_4_PLUS;
        } else if (membershipYear === 3) {
            cap = CAPS.YEAR_3;
        } else if (membershipYear === 2) {
            cap = CAPS.YEAR_2;
        } else {
            cap = 0; // No cap for less than 2 years
        }
    }

    return cap;
}

/**
 * Calculates the last anniversary date
 * @param {Date} startDate - The membership start date
 * @returns {Date} The last anniversary date
 */
function calculateLastAnniversaryDate(startDate) {
    const currentDate = new Date();

    // Get the month and day from the start date
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();

    // Create a date for this year's anniversary
    const thisYearAnniversary = new Date(currentDate.getFullYear(), startMonth, startDay);

    // If the anniversary hasn't occurred yet this year, use last year's anniversary
    if (currentDate < thisYearAnniversary) {
        return new Date(currentDate.getFullYear() - 1, startMonth, startDay);
    } else {
        return thisYearAnniversary;
    }
}

/**
 * Formats a date as MM/DD/YYYY
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
function formatDate(date) {
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

/**
 * Calculates the date 6 months prior to the submission date
 * @returns {string} - Formatted date string (MM/DD/YYYY)
 */
function calculateSixMonthsPriorDate() {
    // Get the submission date from the input
    const submissionDateInput = document.querySelector('input[type="date"]:first-of-type');
    let submissionDate;

    if (submissionDateInput && submissionDateInput.value) {
        // Parse the submission date from the input
        const [year, month, day] = submissionDateInput.value.split('-').map(Number);
        submissionDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date
    } else {
        // If no submission date is provided, use the current date
        submissionDate = new Date();
    }

    // Calculate date 6 months prior
    const sixMonthsPriorDate = new Date(submissionDate);
    sixMonthsPriorDate.setMonth(sixMonthsPriorDate.getMonth() - 6);

    return formatDate(sixMonthsPriorDate);
}

/**
 * Checks if the Six Months checkbox is checked
 * @returns {boolean} - Whether the checkbox is checked
 */
function isSixMonthsChecked() {
    const sixMonthsCheckbox = document.getElementById('six-months');
    return sixMonthsCheckbox && sixMonthsCheckbox.checked;
}

/**
 * Gets the Six Months guideline text with the calculated date
 * @returns {string} - The formatted guideline text
 */
function getSixMonthsText() {
    const sixMonthsPriorDate = calculateSixMonthsPriorDate();
    return `We are unable to share into services prior to ${sixMonthsPriorDate} due to the six-month submission guideline.`;
}

/**
 * Checks if the Pending PHI checkbox is checked
 * @returns {boolean} - Whether the checkbox is checked
 */
function isPendingPHIChecked() {
    const pendingPHICheckbox = document.getElementById('pending-phi');
    return pendingPHICheckbox && pendingPHICheckbox.checked;
}

/**
 * Gets the Pending PHI text
 * @returns {string} - The formatted Pending PHI text
 */
function getPendingPHIText() {
    return "Email pending PHI";
}

/**
 * Updates the anniversary and cap display
 * @returns {Object|undefined} The cap information or undefined if unable to calculate
 */
function updateAnniversaryAndCap() {
    // Get the start date
    const startDateString = document.getElementById('start-date').value;
    if (!startDateString) return;

    // Parse the start date
    const [year, month, day] = startDateString.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);

    // Get membership year from the result text
    const resultText = document.getElementById('result').textContent;
    const match = resultText.match(/Membership year: (\d+)/);

    if (!match) return;

    const membershipYear = parseInt(match[1]);

    // Check if tobacco user (if age >= 50)
    let isTobaccoUser = false;
    const memberAge = document.getElementById('member-age').value;
    if (memberAge >= 50) {
        const tobaccoRadios = document.querySelectorAll('input[name="tobacco"]');
        for (const radio of tobaccoRadios) {
            if (radio.checked && radio.nextSibling.textContent.trim() === 'Yes') {
                isTobaccoUser = true;
                break;
            }
        }
    }

    // Calculate cap
    const cap = calculateMedicalExpenseCap(membershipYear, isTobaccoUser);

    // Format cap as currency
    const formattedCap = cap.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // Calculate the last anniversary date
    const lastAnniversaryDate = calculateLastAnniversaryDate(startDate);
    const formattedAnniversaryDate = formatDate(lastAnniversaryDate);

    // Update the display
    const displayElement = document.getElementById('anniversaryAndCap');
    displayElement.textContent = ` ${formattedAnniversaryDate} with a cap of ${formattedCap}`;
    displayElement.style.display = 'inline'; // Ensure it's visible

    return {
        membershipYear,
        cap,
        formattedCap,
        lastAnniversaryDate,
        formattedAnniversaryDate
    };
}

// Member age handling is now in member.js

// Eligibility selection is now handled in eligibility.js

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
    let content = '';
    const currentDate = new Date().toLocaleDateString();

    // Remove title from being copied
    // const titleInput = document.getElementById('requestTitle');
    // if (titleInput && titleInput.value.trim()) {
    //     content += titleInput.value + '\n\n';
    // }

    // Get date, name, and eligibility in one line
    content += currentDate + ' ';

    // Get JaydenW text
    const choiceDiv = document.getElementById('choice');
    if (choiceDiv) {
        const paragraphs = choiceDiv.querySelectorAll('p');
        paragraphs.forEach(p => {
            content += p.innerHTML + ' ';
        });
    }

    // Get eligibility status
    const eligibilitySelect = document.getElementById('eligibility');
    if (eligibilitySelect && eligibilitySelect.selectedIndex > 0) {
        content += eligibilitySelect.options[eligibilitySelect.selectedIndex].innerHTML;
    }

    // Check if determination placeholder is visible
    const placeholderDiv = document.getElementById('determination-placeholder');
    if (placeholderDiv && window.getComputedStyle(placeholderDiv).display !== 'none') {
        // Add placeholder text
        const placeholderText = placeholderDiv.querySelector('p');
        if (placeholderText) {
            content += '\n\n' + placeholderText.innerHTML;
        }
    } else {
        // Add determination content
        content += '\n\n';

        // Add "Medical Records" text
        content += 'Medical Records ';

        // Add verified records if applicable
        const verifiedButton = document.getElementById('left4');
        const notVerifiedButton = document.getElementById('right4');
        if (verifiedButton && verifiedButton.classList.contains('active')) {
            content += verifiedButton.value;
        } else if (notVerifiedButton && notVerifiedButton.classList.contains('active')) {
            content += notVerifiedButton.value;
        }

        // Add the rest of the determination text
        content += ' been verified, and we are ';

        // Handle different eligibility options and their related elements
        const shareableSelect = document.getElementById('shareable');
        const notShareableSelect = document.getElementById('not-shareable');
        const moreInfoSelect = document.getElementById('more-info');

        // Add shareable content if visible and selected
        if (shareableSelect && window.getComputedStyle(shareableSelect).display !== 'none' && shareableSelect.selectedIndex > 0) {
            content += shareableSelect.options[shareableSelect.selectedIndex].innerHTML;

            // Add anniversary and cap information if applicable
            if (shareableSelect.value === 'posDeterCap') {
                const anniversaryAndCap = document.getElementById('anniversaryAndCap');
                if (anniversaryAndCap && window.getComputedStyle(anniversaryAndCap).display !== 'none') {
                    content += anniversaryAndCap.textContent;
                }
            }
        }

        // Add not shareable content if visible and selected
        if (notShareableSelect && window.getComputedStyle(notShareableSelect).display !== 'none' && notShareableSelect.selectedIndex > 0) {
            content += notShareableSelect.options[notShareableSelect.selectedIndex].innerHTML;
        }

        // Add more info content if visible and selected
        if (moreInfoSelect && window.getComputedStyle(moreInfoSelect).display !== 'none' && moreInfoSelect.selectedIndex > 0) {
            content += moreInfoSelect.options[moreInfoSelect.selectedIndex].innerHTML;
        }
    }

    // Add Additional IUA text if visible
    if (isAdditionalIUAVisible()) {
        content += '\n\n' + getAdditionalIUAText();
    }

    // Add Maternity text if visible
    if (isMaternityVisible()) {
        content += '\n\n' + getMaternityText();
    }

    // Add bullet list content from shareable services if visible
    const shareableServicesList = document.getElementById('shareable-services-list');
    if (shareableServicesList && window.getComputedStyle(shareableServicesList).display !== 'none') {
        const items = getListItems('shareable-services-list');
        if (items.length > 0) {
            content += '\n\nShareable Services:';
            items.forEach(item => {
                content += '\n• ' + item;
            });
        }
    }

    // Fix: Add bullet list content from not shareable services if visible
    const notShareableServicesList = document.getElementById('not-shareable-services-list');
    if (notShareableServicesList && window.getComputedStyle(notShareableServicesList).display !== 'none') {
        const items = getListItems('not-shareable-services-list');
        if (items.length > 0) {
            content += '\n\nNot Shareable Services:';
            items.forEach(item => {
                content += '\n• ' + item;
            });
        }
    }

    // Add Six Months text if the checkbox is checked
    if (isSixMonthsChecked()) {
        content += '\n\n' + getSixMonthsText();
    }

    // Add Pending PHI text if the checkbox is checked
    if (isPendingPHIChecked()) {
        content += '\n\n' + getPendingPHIText();
    }

    // Add final statement
    const finalStatement = document.getElementById('final-statement');
    if (finalStatement) {
        content += '\n\n' + finalStatement.innerHTML;
    }

    // Copy to clipboard
    const mainCopyButton = document.getElementById('copyButton');
    navigator.clipboard.writeText(content)
        .then(() => {
            if (mainCopyButton) setMainCopyButtonState(mainCopyButton, true);
        })
        .catch(err => {
            if (mainCopyButton) setMainCopyButtonState(mainCopyButton, false);
        });
}

function setMainCopyButtonState(button, success) {
    const originalText = button.textContent.replace(/\s[✔✖]$/, '');
    if (success) {
        button.style.backgroundColor = '#47CB8F'; // green
        button.textContent = originalText + ' ✔';
    } else {
        button.style.backgroundColor = '#e74c3c'; // red
        button.textContent = originalText + ' ✖';
    }
    button.disabled = true;
    setTimeout(() => {
        button.style.backgroundColor = '';
        button.textContent = originalText;
        button.disabled = false;
    }, 1200);
}

export {
    initToggleButtons,
    switchActive,
    calculateMembershipYear,
    verifiedRecords,
    clearClipboard,
    copyDivContent,
    calculateMedicalExpenseCap,
    calculateLastAnniversaryDate,
    formatDate,
    updateAnniversaryAndCap,
    handleStartDateChange,
    calculateSixMonthsPriorDate,
    isSixMonthsChecked,
    getSixMonthsText,
    isPendingPHIChecked,
    getPendingPHIText
};
