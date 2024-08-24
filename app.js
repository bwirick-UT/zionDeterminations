// Select all buttons with the class 'toggle-btn'
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Add a single event listener to each button
toggleButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        // Get the ID of the clicked button
        const clickedButtonId = event.target.id;

        // Determine the paired button's ID
        let pairedButtonId;
        if (clickedButtonId.includes('left')) {
            pairedButtonId = clickedButtonId.replace('left', 'right');
        } else {
            pairedButtonId = clickedButtonId.replace('right', 'left');
        }

        // Call the function to switch active state, passing both IDs
        switchActive(clickedButtonId, pairedButtonId);
    });
});

function switchActive(clickedId, pairedId) {
    const clickedButton = document.getElementById(clickedId);
    const pairedButton = document.getElementById(pairedId);

    // Check if the clicked button is already active
    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');
        return;
    }

    // Toggle the 'active' class on both buttons
    clickedButton.classList.add('active');
    pairedButton.classList.remove('active');
}

// Membership year is a number since start date
// grey out unused forms
// if Bridge < Membership year = 2+, then no need
// if Bridge = YES, then auto capped
// If Eligible, either shareable or with cap.
    // If capped, show form for expiration date (most recently passed aniversary date)
        // And $ of 25k, 50k, or 125k which is based off membership year, 2, 3, 4+ respectively
    // Also include 'pending medical records', or 'per pre-membership guidelines'
const currentDate = new Date().toLocaleDateString();
document.getElementById('dateDisplay').innerHTML = currentDate;

document.getElementById('start-date').addEventListener('input', function() {
    console.log("Starting timeout")
    // Clear any existing timeout to avoid multiple calculations
    clearTimeout(window.delayTimeout);
    // Set a new timeout for 1 seconds (1000 milliseconds)
    window.delayTimeout = setTimeout(calculateMembershipYear, 1000);
});

function correctDateOutput () {
    // Get the date from the input field
    const startDateString = document.getElementById('start-date').value;

    // Split the date string into components
    const [year, month, day] = startDateString.split('-').map(Number);

    // Create a new Date object using the year, month, and day (note: month is 0-indexed)
    const startDate = new Date(year, month - 1, day);
    return startDate;
}

function calculateMembershipYear() {

    const startDate = correctDateOutput();

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let membershipYear = currentDate.getFullYear() - startDate.getFullYear();

    // Check if the start date is valid
    if (isNaN(startDate) || membershipYear < 0 || startDate > currentDate || startDate.getFullYear() < 2019) {
        document.getElementById('result').textContent = "Please enter a valid start date.";
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
    document.getElementById('result').textContent = `Membership year: ${membershipYear + 1}${getOrdinalSuffix(membershipYear + 1)}`;
}

function getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

document.getElementById('member-age').addEventListener('input', function() {
    const memberAge = document.getElementById('member-age').value;
    if (memberAge < 50 && memberAge >= 0) {
        clearTimeout(window.delayTimeout);
        isTobaccoUser();
        window.delayTimeout = setTimeout(isMinor, 1000);
    } else if (memberAge >= 50) {
        clearTimeout(window.delayTimeout);
        window.delayTimeout = setTimeout(isTobaccoUser, 500);
    } else {
        isTobaccoUser();
        isMinor();
    }
});

function isTobaccoUser() {
    const memberAge = document.getElementById('member-age').value;
    if (memberAge >= 50) {
        document.getElementById('tobaccoUser').style.display = 'inline';
    } else {
        document.getElementById('tobaccoUser').style.display = 'none';
    }
}

function isMinor() {
    const memberAge = document.getElementById('member-age').value;
    if (memberAge < 18 && memberAge >= 0) {
        //console.log("True");
        document.getElementById('isMinor').style.display = 'inline';
    } else {
        //console.log("False");
        document.getElementById('isMinor').style.display = 'none';
    }
};

document.getElementById('left3').addEventListener('click', function() {
    const expireTime = document.getElementById('expiration-date');
    if (this.classList.contains('active')) {
        expireTime.style.display = 'inline';
        let startDate = correctDateOutput();
        expireTime.textContent = `Expiration Date: ${startDate.getMonth() + 1} / ${startDate.getDate()} / ${startDate.getFullYear() + 1}`;
    } else {
        expireTime.style.display = 'none';
    }
});

document.getElementById('right3').addEventListener('click', function() {
    document.getElementById('expiration-date').style.display = 'none';
});

const selectedEligibility = document.getElementById('eligibility');

selectedEligibility.addEventListener('change', function() {
    const selectedChoice = selectedEligibility.value;
    if (selectedChoice === 'eligible') {
        document.getElementById('shareable').style.display = 'inline';
        document.getElementById('not-shareable').style.display = 'none';
        document.getElementById('more-info').style.display = 'none';
    } else if (selectedChoice === 'ineligible') {
        document.getElementById('shareable').style.display = 'none';
        document.getElementById('not-shareable').style.display = 'inline';
        document.getElementById('more-info').style.display = 'none';
    } else if (selectedChoice === 'additional_info') {
        document.getElementById('shareable').style.display = 'none';
        document.getElementById('not-shareable').style.display = 'none';
        document.getElementById('more-info').style.display = 'inline';
    } else {
        // must choose an option
    }
});

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

function clearClipboard() {
    navigator.clipboard.writeText('')
        .then(() => {
            console.log("Clear clipboard successfully");
        })
        .catch(() => {
            console.log("Failed to clear clipboard")
        })
}

/* function writeToClipboard() { // need to clean clipboard first
    clearClipboard();

    // do checks on all the information first, maybe calling other functions to verify?
    const requestTitle = document.getElementById('requestTitle').value;
    const choice = document.getElementById('eligibility');
    const selectedDate = choice.options[choice.selectedIndex].innerHTML;
    navigator.clipboard.writeText(selectedDate)
        .then(() => {
            alert("Form data copied to clipboard!");
        })
        .catch(err => {
            alert("Failed to copy: ", err);
        });
} */

function copyDivContent() {
    clearClipboard();
    const container = document.getElementById('copiedInformation');
    let content = '';

    // Loop through all the child elements of the div
    container.childNodes.forEach(node => {
        node.childNodes.forEach(g_node => {
            if (g_node.nodeType === Node.ELEMENT_NODE) {
                console.log(g_node, g_node.nodeType, g_node.nodeName);
                if (g_node.tagName === 'INPUT' || g_node.tagName === 'TEXTAREA') {
                    content += g_node.value + '\n';
                } else if (g_node.tagName === 'SELECT') {
                    const displayStyle = window.getComputedStyle(g_node).display;
                    if (displayStyle === 'none') {
                        console.log('SELECT was: ' + displayStyle)
                        return;
                    }
                    content += g_node.options[g_node.selectedIndex].innerHTML + '\n';
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
                } /* else {
                    content += g_node.innerHTML + '\n';
                } */
            }
        })
    })

    content += `\n${document.getElementById('final-statement').innerHTML}`;

    /* div.childNodes.forEach(node => {
         if (node.nodeType === Node.ELEMENT_NODE) {
            console.log(node);

            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                // Capture value for inputs and textareas
                content += `${node.previousSibling.textContent.trim()}: ${node.value}\n`;
            } else if (node.tagName === 'SELECT') {
                // Capture selected option's text for selects
                content += `${node.previousSibling.textContent.trim()}: ${node.options[node.selectedIndex].innerHTML}\n`;
            } else {
                // Capture innerHTML for other elements like <p>, <label>, etc.
                content += node.innerHTML + '\n';
            }
        } 
    }); */

    navigator.clipboard.writeText(content)
                .then(() => {
                    alert("Container content copied to clipboard!");
                })
                .catch(err => {
                    alert("Failed to copy: ", err);
                });

}
// Need an error collection function to call for issues. Find a way to pass through issue IDs
// For example 

document.getElementById('iosToggle').addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

document.body.classList.add('light-theme');