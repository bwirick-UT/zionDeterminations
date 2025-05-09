// Member age and tobacco user handling
import { toggleTobaccoUserSection, toggleMinorSection } from './render.js';
import { updateAnniversaryAndCap } from './handlers.js';

/**
 * Handles member age input changes
 */
function handleMemberAgeChange() {
    const memberAge = document.getElementById('member-age').value;
    console.log("Member age changed to:", memberAge);

    // Handle tobacco user section
    if (memberAge >= 50) {
        document.getElementById('tobaccoUser').style.display = 'inline';
    } else {
        document.getElementById('tobaccoUser').style.display = 'none';
    }

    // Handle minor section
    if (memberAge < 18 && memberAge >= 0) {
        document.getElementById('isMinor').style.display = 'inline';
    } else {
        document.getElementById('isMinor').style.display = 'none';
    }

    // Update anniversary and cap if needed
    const shareableSelect = document.getElementById('shareable');
    if (shareableSelect.style.display === 'inline' &&
        shareableSelect.value === 'posDeterCap') {
        updateAnniversaryAndCap();
    }
}

/**
 * Handles tobacco user radio button changes
 */
function handleTobaccoUserChange() {
    // Update anniversary and cap if needed
    const shareableSelect = document.getElementById('shareable');
    if (shareableSelect.style.display === 'inline' &&
        shareableSelect.value === 'posDeterCap') {
        updateAnniversaryAndCap();
    }
}

/**
 * Initializes member age and tobacco user handlers
 */
function initMemberHandlers() {
    // Member age input
    const memberAgeInput = document.getElementById('member-age');
    if (memberAgeInput) {
        memberAgeInput.addEventListener('input', handleMemberAgeChange);
    }

    // Tobacco user radio buttons
    document.querySelectorAll('input[name="tobacco"]').forEach(radio => {
        radio.addEventListener('change', handleTobaccoUserChange);
    });
}

export {
    handleMemberAgeChange,
    handleTobaccoUserChange,
    initMemberHandlers
};
