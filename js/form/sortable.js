/**
 * Initialize sortable functionality for a list using HTML5 Drag and Drop API
 * @param {HTMLElement} list - The list element to make sortable
 */
function initSortable(list) {
    function handleDragStart(e) {
        if (!e.target.matches('li')) return;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', ''); // Required for Firefox
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const draggingItem = list.querySelector('.dragging');
        if (!draggingItem) return;

        const items = [...list.querySelectorAll('li:not(.dragging)')];
        const nextItem = items.find(item => {
            const rect = item.getBoundingClientRect();
            return e.clientY < rect.top + rect.height / 2;
        });

        if (nextItem) {
            list.insertBefore(draggingItem, nextItem);
        } else {
            list.appendChild(draggingItem);
        }
    }

    function handleDragEnd(e) {
        if (!e.target.matches('li')) return;
        e.target.classList.remove('dragging');
    }

    // Add event listeners for drag and drop
    list.addEventListener('dragstart', handleDragStart);
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('dragend', handleDragEnd);

    // Make all list items draggable
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        item.draggable = true;
        item.style.cursor = 'grab';
    });
}

/**
 * Initialize sortable lists in the workspace
 */
function initSortableLists() {
    const lists = document.querySelectorAll('.sortable-list');
    lists.forEach(initSortable);
}

export { initSortableLists };
