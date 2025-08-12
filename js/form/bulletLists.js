// Bullet list handling functions

/**
 * Initializes the bullet list functionality
 */
function initBulletLists() {
    // Initialize checkbox change handlers
    initCheckboxHandlers();

    // Initialize add item buttons
    initAddItemButtons();

    // Initialize copy list buttons
    initCopyListButtons();
}

/**
 * Initializes checkbox handlers for showing/hiding bullet lists
 */
function initCheckboxHandlers() {
    // Handle shareable services checkbox
    const shareableServicesCheckbox = document.getElementById('shareable-services');
    if (shareableServicesCheckbox) {
        shareableServicesCheckbox.addEventListener('change', function() {
            toggleBulletList('shareable-services-list', this.checked);
        });
    }

    // Handle not shareable services checkbox
    const notShareableServicesCheckbox = document.getElementById('not-shareable-services');
    if (notShareableServicesCheckbox) {
        notShareableServicesCheckbox.addEventListener('change', function() {
            toggleBulletList('not-shareable-services-list', this.checked);
        });
    }

    // Handle additional IUA checkbox
    const additionalIUACheckbox = document.getElementById('additional-iua');
    if (additionalIUACheckbox) {
        additionalIUACheckbox.addEventListener('change', function() {
            toggleAdditionalIUA(this.checked);
        });
    }

    // Handle maternity checkbox
    const maternityCheckbox = document.getElementById('maternity');
    if (maternityCheckbox) {
        maternityCheckbox.addEventListener('change', function() {
            toggleMaternity(this.checked);
        });
    }

    // Six Months checkbox doesn't need to show anything on screen
    // It will be handled during the copy operation

    // Pending PHI checkbox doesn't need to show anything on screen
    // It will be handled during the copy operation
}

/**
 * Toggles the visibility of a bullet list
 * @param {string} listId - The ID of the list to toggle
 * @param {boolean} show - Whether to show or hide the list
 */
function toggleBulletList(listId, show) {
    const list = document.getElementById(listId);
    if (list) {
        list.style.display = show ? 'block' : 'none';
    }
}

/**
 * Toggles the visibility of the Additional IUA section
 * @param {boolean} show - Whether to show or hide the section
 */
function toggleAdditionalIUA(show) {
    const container = document.getElementById('additional-iua-container');
    if (container) {
        container.style.display = show ? 'block' : 'none';

        // If showing, focus the input field
        if (show) {
            const input = document.getElementById('additional-iua-input');
            if (input) {
                setTimeout(() => {
                    input.focus();
                }, 100);
            }
        }
    }
}

/**
 * Toggles the visibility of the Maternity section
 * @param {boolean} show - Whether to show or hide the section
 */
function toggleMaternity(show) {
    const container = document.getElementById('maternity-container');
    if (container) {
        container.style.display = show ? 'block' : 'none';
        // If showing, focus the date input
        if (show) {
            const input = document.getElementById('maternity-edc-date');
            if (input) {
                setTimeout(() => {
                    input.focus();
                }, 100);
            }
        }
    }
}

/**
 * Initializes add item buttons for all bullet lists
 */
function initAddItemButtons() {
    const addButtons = document.querySelectorAll('.add-item-btn');

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.bullet-list');
            const input = container.querySelector('.add-item-input');
            const text = input.value.trim();

            if (text) {
                addItemToList(container.querySelector('.list-items'), text);
                input.value = '';
                // Focus the input field again for easy addition of multiple items
                input.focus();
            }
        });
    });

    // Also add event listener for pressing Enter in the input fields
    const addInputs = document.querySelectorAll('.add-item-input');
    addInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission if inside a form
                const container = this.closest('.bullet-list');
                const button = container.querySelector('.add-item-btn');
                button.click();
            }
        });
    });
}

/**
 * Initializes copy list buttons for all bullet lists
 */
function initCopyListButtons() {
    const copyButtons = document.querySelectorAll('.copy-list-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const listId = this.getAttribute('data-list');
            copyBulletListToClipboard(listId, this);
        });
    });
}

/**
 * Copies the bullet list items to the clipboard
 * @param {string} listId - The ID of the list to copy
 * @param {HTMLElement} button - The button element to update UI feedback
 */
function copyBulletListToClipboard(listId, button) {
    const items = getListItems(listId);
    let content = '';
    if (items.length > 0) {
        // Only copy the bullet list, no title
        items.forEach(item => {
            content += '\n• ' + item;
        });
        navigator.clipboard.writeText(content.trim())
            .then(() => {
                setCopyButtonState(button, true);
            })
            .catch(() => {
                setCopyButtonState(button, false);
            });
    } else {
        setCopyButtonState(button, false);
    }
}

/**
 * Sets the copy button state to success (green/check) or failure (red/x)
 * @param {HTMLElement} button
 * @param {boolean} success
 */
function setCopyButtonState(button, success) {
    const originalText = button.textContent;
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

/**
 * Adds a new item to a bullet list
 * @param {HTMLElement} listContainer - The container to add the item to
 * @param {string} text - The text of the item
 */
function addItemToList(listContainer, text) {
    const itemId = 'item-' + Date.now();

    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.id = itemId;
    listItem.draggable = true;

    listItem.innerHTML = `
        <span class="bullet-point">•</span>
        <span class="list-item-text">${text}</span>
        <div class="list-item-actions">
            <button class="edit-item-btn" title="Edit">✏️</button>
            <button class="delete-item-btn" title="Delete">🗑️</button>
        </div>
    `;

    listContainer.appendChild(listItem);

    // Add event listeners for the edit and delete buttons
    const editButton = listItem.querySelector('.edit-item-btn');
    const deleteButton = listItem.querySelector('.delete-item-btn');

    editButton.addEventListener('click', function() {
        editItem(itemId);
    });

    deleteButton.addEventListener('click', function() {
        deleteItem(itemId);
    });

    // Scroll to the newly added item
    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Edits an existing item
 * @param {string} itemId - The ID of the item to edit
 */
function editItem(itemId) {
    const listItem = document.getElementById(itemId);
    const textElement = listItem.querySelector('.list-item-text');
    const currentText = textElement.textContent;

    // Create edit mode elements
    const editContainer = document.createElement('div');
    editContainer.className = 'edit-mode';
    editContainer.style.display = 'flex';
    editContainer.style.flex = '1';

    editContainer.innerHTML = `
        <input type="text" value="${currentText}" class="edit-item-input">
        <button class="save-edit-btn">Save</button>
    `;

    // Replace text element with edit container
    textElement.style.display = 'none';
    listItem.insertBefore(editContainer, listItem.querySelector('.list-item-actions'));

    // Hide the action buttons while editing
    listItem.querySelector('.list-item-actions').style.display = 'none';

    // Focus the input
    const input = editContainer.querySelector('input');
    input.focus();

    // Add event listener for the save button
    const saveButton = editContainer.querySelector('.save-edit-btn');
    saveButton.addEventListener('click', function() {
        saveEdit(itemId, input.value.trim());
    });

    // Add event listener for pressing Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit(itemId, input.value.trim());
        }
    });
}

/**
 * Saves an edited item
 * @param {string} itemId - The ID of the item being edited
 * @param {string} newText - The new text for the item
 */
function saveEdit(itemId, newText) {
    const listItem = document.getElementById(itemId);
    const textElement = listItem.querySelector('.list-item-text');
    const editContainer = listItem.querySelector('.edit-mode');

    if (newText) {
        textElement.textContent = newText;
    }

    // Show the text element again
    textElement.style.display = '';

    // Show the action buttons again
    listItem.querySelector('.list-item-actions').style.display = '';

    // Remove the edit container
    if (editContainer) {
        editContainer.remove();
    }
}

/**
 * Deletes an item from a list
 * @param {string} itemId - The ID of the item to delete
 */
function deleteItem(itemId) {
    const listItem = document.getElementById(itemId);
    if (listItem) {
        // Add a fade-out effect
        listItem.style.transition = 'opacity 0.3s';
        listItem.style.opacity = '0';

        // Remove the item after the animation
        setTimeout(() => {
            listItem.remove();
        }, 300);
    }
}

/**
 * Gets all items from a specific list
 * @param {string} listId - The ID of the list to get items from
 * @returns {Array} - Array of item text values
 */
function getListItems(listId) {
    const list = document.getElementById(listId);
    if (!list) return [];

    const items = list.querySelectorAll('.list-item-text');
    return Array.from(items).map(item => item.textContent);
}

/**
 * Checks if the Additional IUA section is visible
 * @returns {boolean} - Whether the section is visible
 */
function isAdditionalIUAVisible() {
    const container = document.getElementById('additional-iua-container');
    return container && window.getComputedStyle(container).display !== 'none';
}

/**
 * Gets the Additional IUA text for copying
 * @returns {string} - The formatted Additional IUA text
 */
function getAdditionalIUAText() {
    if (!isAdditionalIUAVisible()) return '';

    const input = document.getElementById('additional-iua-input');
    const areaText = input && input.value.trim() ? input.value.trim() : 'additional areas';

    return `Services are being done for ${areaText}, for ease of processing requests will stay together, but member is subject to an additional IUA.`;
}

/**
 * Checks if the Maternity section is visible
 * @returns {boolean} - Whether the section is visible
 */
function isMaternityVisible() {
    const container = document.getElementById('maternity-container');
    return container && window.getComputedStyle(container).display !== 'none';
}

/**
 * Gets the Maternity text for copying
 * @returns {string} - The formatted Maternity text
 */
function getMaternityText() {
    if (!isMaternityVisible()) return '';
    const dateInput = document.getElementById('maternity-edc-date');
    let dateText = '';
    if (dateInput && dateInput.value) {
        dateText = dateInput.value;
    } else {
        dateText = 'Estimated Due Date';
    }
    return "Shareable for services contained within the 'What Is Shareable' section of the Maternity Guidelines\n EDC: " + dateText;
}

// Export all necessary functions
export {
    initBulletLists,
    getListItems,
    isAdditionalIUAVisible,
    getAdditionalIUAText,
    isMaternityVisible,
    getMaternityText
};
