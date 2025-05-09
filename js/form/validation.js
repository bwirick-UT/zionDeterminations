// Form validation functions
import { MIN_VALID_YEAR } from './options.js';

/**
 * Parses and validates a date input
 * @returns {Date} The parsed date object
 */
function parseStartDate() {
    // Get the date from the input field
    const startDateString = document.getElementById('start-date').value;

    // Split the date string into components
    const [year, month, day] = startDateString.split('-').map(Number);

    // Create a new Date object using the year, month, and day (note: month is 0-indexed)
    const startDate = new Date(year, month - 1, day);
    return startDate;
}

/**
 * Validates if the start date is valid
 * @param {Date} startDate - The date to validate
 * @param {Date} currentDate - The current date for comparison
 * @returns {boolean} Whether the date is valid
 */
function isValidStartDate(startDate, currentDate) {
    return !(isNaN(startDate) || 
             startDate > currentDate || 
             startDate.getFullYear() < MIN_VALID_YEAR);
}

/**
 * Gets the ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 * @param {number} n - The number to get the suffix for
 * @returns {string} The ordinal suffix
 */
function getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export {
    parseStartDate,
    isValidStartDate,
    getOrdinalSuffix
};
