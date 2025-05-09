// Theme handling functions

/**
 * Initializes the theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('iosToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
            }
        });
    }
}

export {
    initThemeToggle
};
