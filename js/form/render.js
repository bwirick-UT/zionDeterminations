// UI rendering functions
import { MEDICAL_EXPENSE_CAPS } from './options.js';
import { getOrdinalSuffix } from './validation.js';

/**
 * Updates the membership year display
 * @param {number} membershipYear - The calculated membership year
 */
function displayMembershipYear(membershipYear) {
    if (membershipYear < 0) {
        document.getElementById('result').textContent = "Please enter a valid start date.";
    } else {
        document.getElementById('result').textContent =
            `Membership year: ${membershipYear + 1}${getOrdinalSuffix(membershipYear + 1)}`;
    }
}

/**
 * Shows or hides the tobacco user section based on member age
 * @param {number} memberAge - The member's age
 */
function toggleTobaccoUserSection(memberAge) {
    if (memberAge >= 50) {
        document.getElementById('tobaccoUser').style.display = 'inline';
    } else {
        document.getElementById('tobaccoUser').style.display = 'none';
    }
}

/**
 * Shows or hides the minor section based on member age
 * @param {number} memberAge - The member's age
 */
function toggleMinorSection(memberAge) {
    if (memberAge < 18 && memberAge >= 0) {
        document.getElementById('isMinor').style.display = 'inline';
    } else {
        document.getElementById('isMinor').style.display = 'none';
    }
}

/**
 * Shows or hides the expiration date
 * @param {boolean} show - Whether to show the expiration date
 * @param {Date} startDate - The start date to calculate expiration from
 */
function toggleExpirationDate(show, startDate) {
    const expireTime = document.getElementById('expiration-date');
    if (show) {
        expireTime.style.display = 'inline';
        expireTime.textContent = `Expiration Date: ${startDate.getMonth() + 1} / ${startDate.getDate()} / ${startDate.getFullYear() + 1}`;
    } else {
        expireTime.style.display = 'none';
    }
}

/**
 * Updates the eligibility sections based on selection
 * @param {string} selectedChoice - The selected eligibility option
 */
function updateEligibilitySections(selectedChoice) {
    const standardDetermination = document.getElementById('standard-determination');
    const additionalInfoDetermination = document.getElementById('additional-info-determination');

    if (selectedChoice === 'additional_info') {
        standardDetermination.style.display = 'none';
        additionalInfoDetermination.style.display = 'block';
    } else {
        standardDetermination.style.display = 'block';
        additionalInfoDetermination.style.display = 'none';
        
        if (selectedChoice === 'eligible') {
            document.getElementById('shareable').style.display = 'inline';
            document.getElementById('not-shareable').style.display = 'none';
        } else if (selectedChoice === 'ineligible') {
            document.getElementById('shareable').style.display = 'none';
            document.getElementById('not-shareable').style.display = 'inline';
        }
    }
}

/**
 * Toggles between light and dark themes
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
function toggleTheme(isDarkMode) {
    console.log('toggleTheme called with isDarkMode:', isDarkMode);
    console.log('Current body classes before toggle:', document.body.className);

    if (isDarkMode) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }

    console.log('Body classes after toggle:', document.body.className);
}

/**
 * Calculates and returns the medical expense cap
 * @param {number} years - Membership years
 * @param {boolean} isTobaccoUser - Whether the member is a tobacco user
 * @returns {number} The medical expense cap
 */
function getMedicalExpenseCap(years, isTobaccoUser) {
    if (isTobaccoUser) {
        return MEDICAL_EXPENSE_CAPS.TOBACCO_USER;
    } else {
        if (years >= 4) {
            return MEDICAL_EXPENSE_CAPS.YEAR_4_PLUS;
        } else if (years === 3) {
            return MEDICAL_EXPENSE_CAPS.YEAR_3;
        } else if (years === 2) {
            return MEDICAL_EXPENSE_CAPS.YEAR_2;
        } else {
            return 0; // Assuming no cap for less than 2 years
        }
    }
}

export {
    displayMembershipYear,
    toggleTobaccoUserSection,
    toggleMinorSection,
    toggleExpirationDate,
    updateEligibilitySections,
    toggleTheme,
    getMedicalExpenseCap
};
