// Checkbox selectors handling functions

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
    
    // This function will be expanded later to populate options on the right side
    // when checkboxes are checked
}

export {
    initCheckboxSelectors,
    handleCheckboxChange
};
