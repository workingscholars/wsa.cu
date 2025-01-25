// ==========================
// Login Index Form
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, and other common shortcuts applied to all
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });
    
    // Variables and Elements Initialization
    const passwordInput = document.getElementById('password');
    const studentIdInput = document.getElementById('student-id');
    const loginButton = document.getElementById('loginButton');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordToggleIcon = document.getElementById('passwordToggleIcon');

    // Predefined valid credentials
    const validCredentials = {
        '2090389': '@l03e1t3J'
    };

    // Toast initialization
    let loginToast = null;

    // ==========================
    // Password Toggle Functionality
    // ==========================
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggleIcon.classList.remove('bi-eye-fill');
            passwordToggleIcon.classList.add('bi-eye-slash-fill');
        } else {
            passwordInput.type = 'password';
            passwordToggleIcon.classList.remove('bi-eye-slash-fill');
            passwordToggleIcon.classList.add('bi-eye-fill');
        }
    });

    // ==========================
    // Form Submission Event
    // ==========================
    document.querySelector('form').addEventListener('submit', handleLogin);

    // ==========================
    // Enter Key Press Events for Inputs
    // ==========================
    studentIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin(e);
        }
    });

    // ==========================
    // Login Form Submission Handler
    // ==========================
    function handleLogin(e) {
        e.preventDefault();

        // Add enter key press animation to login button
        loginButton.classList.add('enter-key-press');

        const studentId = studentIdInput.value;
        const password = passwordInput.value;

        try {
            // Check credentials
            if (validCredentials[studentId] === password) {
                // Change the login button to "Logging in..." and disable it
                loginButton.textContent = "Logging in...";
                loginButton.disabled = true;

                // Successful login
                initializeToast();
                const toastMessage = document.getElementById('toastMessage');
                const toastIcon = document.getElementById('toastIcon');
                const toastHeaderText = document.getElementById('toastHeaderText');

                toastMessage.textContent = 'Login Successfully!';
                toastIcon.className = 'bi bi-check-circle-fill text-success';
                toastHeaderText.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i> Login Successful';
                
                loginToast.show();

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'user-dashboard.html';
                }, 2000);
            } else {
                // Add shake animation for invalid login
                loginButton.classList.add('login-shake');

                // Remove shake animation after it completes
                setTimeout(() => {
                    loginButton.classList.remove('login-shake');
                }, 500);

                throw new Error('LOGIN FAILED, WRONG CREDENTIALS!');
            }
        } catch (error) {
            initializeToast();

            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');
            const toastHeaderText = document.getElementById('toastHeaderText');

            toastMessage.textContent = error.message;
            toastIcon.className = 'bi bi-x-circle-fill text-danger';
            toastHeaderText.innerHTML = '<i class="bi bi-x-circle-fill text-danger"></i> Login Failed';
            
            loginToast.show();
        }

        // Remove animation after it completes
        setTimeout(() => {
            loginButton.classList.remove('enter-key-press');
        }, 300);
    }

    // ==========================
    // Toast Initialization Function
    // ==========================
    function initializeToast() {
        // Remove existing toast if it exists
        const existingToast = document.getElementById('loginToast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast container
        const toastContainer = document.createElement('div');
        toastContainer.innerHTML = `
            <div id="loginToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto" id="toastHeaderText">
                        <i class="bi bi-check-circle-fill text-success" id="toastIcon"></i> Login Notification
                    </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body" id="toastMessage"></div>
            </div>
        `;
        toastContainer.classList.add('position-fixed', 'top-0', 'end-0', 'p-3');
        toastContainer.style.zIndex = '11';
        
        document.body.appendChild(toastContainer);

        // Reinitialize the toast
        loginToast = new bootstrap.Toast(document.getElementById('loginToast'), {
            delay: 3000  // Auto-hide after 3 seconds
        });
    }

    // Initial toast initialization
    initializeToast();

    // ==========================
    // Forgot Password Button Handler
    // ==========================
    document.querySelector('.btn-outline-danger').addEventListener('click', function() {
        // Reinitialize toast to ensure freshness
        initializeToast();

        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon');
        const toastHeaderText = document.getElementById('toastHeaderText');

        toastMessage.textContent = 'Password reset link will be sent to your registered email.';
        toastIcon.className = 'bi bi-info-circle-fill text-info';
        toastHeaderText.innerHTML = '<i class="bi bi-info-circle-fill text-info"></i> Password Reset';
        
        // Show toast
        loginToast.show();
    });

    // Optional: Close button handler to fully reset the toast
    document.querySelector('.btn-close').addEventListener('click', function() {
        resetToast();
    });
});

// ==========================
// Calculate Final Average on Page Load
// ==========================
window.onload = calculateFinalAverage;

// ==========================
// DOMContentLoaded Event Listener
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    // ==========================
    // Navigation Menu Click Handler
    // ==========================
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active state from all links
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active state to clicked link
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected section
            const target = this.getAttribute('data-section');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Initially show profile section and set its menu item as active
    document.getElementById('profile').style.display = 'block';
    document.querySelector('a[data-section="profile"]').classList.add('active');

    // ==========================
    // Confirm Logout Button
    // ==========================
    document.getElementById('confirmLogout').addEventListener('click', function() {
        // Performing log out actions
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page (replace with your actual login page URL)
        window.location.href = 'index.html';
    });

    // ==========================
    // Semester Selector Functionality
    // ==========================
    const semesterSelector = document.getElementById('semesterSelector');
    const refreshButton = document.getElementById('refreshStudyLoads');

    semesterSelector.addEventListener('change', function() {
        // Add functionality to load study loads for selected semester
        console.log('Selected Semester:', this.value);
        // You can add AJAX call here to fetch semester-specific study loads
    });

    refreshButton.addEventListener('click', function() {
        // Add refresh functionality
        console.log('Refreshing study loads for:', semesterSelector.value);
        
        // Optional: Add loading animation
        this.classList.add('spinning');
        
        // Simulate refresh (replace with actual data fetch)
        setTimeout(() => {
            this.classList.remove('spinning');
            // Add your refresh logic here
        }, 1000);
    });

    // ==========================
    // Term Selector and Permit Details Update
    // ==========================
    const termSelector = document.getElementById('termSelector');
    
    // Permit data object
    const permitData = {
        'PRELIM': {
            term: 'PRELIM',
            approvedBy: 'gamaya.nanette',
            approvedOn: 'Sep 14, 2024',
            status: 'Allowed to take exam'
        },
        'MIDTERM': {
            term: 'MIDTERM',
            approvedBy: 'gamaya.nanette',
            approvedOn: 'Oct 11, 2024',
            status: 'Allowed to take exam'
        },
        'FINALS': {
            term: 'FINALS',
            approvedBy: 'gamaya.nanette',
            approvedOn: 'Nov 28, 2024',
            status: 'Allowed to take exam'
        }
    };

    // Function to update permit details
    function updatePermitDetails(term) {
        const permitDetails = permitData[term];
        
        // Update semester info
        document.querySelector('.semester-info').innerHTML = `
            <div>First Semester SY 2024-2025</div>
            <div>${permitDetails.term}</div>
        `;

        // Update approval info
        document.querySelector('.approval-info').innerHTML = `
            <div>
                <span>Approved by: </span>
                <span class="fw-bold">${permitDetails.approvedBy}</span>
            </div>
            <div>
                <span>Approved on: </span>
                <span class="fw-bold">${permitDetails.approvedOn}</span>
            </div>
        `;

        // Update status icon and text
        const statusContainer = document.querySelector('.text-center.mb-4');
        statusContainer.innerHTML = `
            <div class="text-success">
                <i class="fas fa-circle-check fa-7x"></i>
                <div class="mt-2">
                    <strong>${permitDetails.status}</strong>
                </div>
            </div>
        `;
    }

    // Initial load
    updatePermitDetails(termSelector.value);

    // Add event listener for term selector changes
    termSelector.addEventListener('change', function() {
        updatePermitDetails(this.value);
    });

    // ==========================
    // Download Receipt Handler
    // ==========================
    const downloadButton = document.getElementById('downloadPermit');
    
    downloadButton.addEventListener('click', function() {
        // Clone the permit area, removing the download button
        const permitArea = document.querySelector('.downloadable-area');
        const clonedArea = permitArea.cloneNode(true);
        
        // Remove download button from cloned area
        const clonedDownloadButton = clonedArea.querySelector('#downloadPermit');
        if (clonedDownloadButton) {
            clonedDownloadButton.remove();
        }
        
        // Create a temporary container to hold the cloned area
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.appendChild(clonedArea);
        document.body.appendChild(tempContainer);

        // Capture the cloned area
        html2canvas(clonedArea, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            const studentId = '2090389';
            
            link.download = `${studentId}_permit.jpg`;
            link.href = canvas.toDataURL('image/jpeg');
            
            // Trigger download
            link.click();
            
            // Remove temporary container
            document.body.removeChild(tempContainer);
        }).catch(error => {
            console.error('Error downloading receipt:', error);
            alert('Failed to download receipt. Please try again.');
            
            // Remove temporary container if error occurs
            if (document.body.contains(tempContainer)) {
                document.body.removeChild(tempContainer);
            }
        });
    });

    // ==========================
    // Calculate Grade Level with Motivation
    // ==========================
    function calculateGradeLevel(grade) {
        if (grade >= 1.0 && grade < 1.5) {
            return {
                level: "Summa Cum Laude",
                color: "success",
                message: "Congratulations! 🏆 You did an OUTSTANDING job! Your academic excellence is truly remarkable!",
                icon: "fas fa-trophy"
            };
        } else if (grade >= 1.5 && grade < 2.0) {
            return {
                level: "Magna Cum Laude",
                color: "primary",
                message: "Excellent performance! 👏 Keep up the great work and maintain your momentum!",
                icon: "fas fa-star"
            };
        } else if (grade >= 2.0 && grade < 2.5) {
            return {
                level: "Cum Laude",
                color: "info",
                message: "Great job! 👍 You're doing well, continue to strive for excellence!",
                icon: "fas fa-award"
            };
        } else if (grade >= 2.5 && grade < 3.0) {
            return {
                level: "Satisfactory",
                color: "warning",
                message: "You're on the right track! 💪 Keep pushing and improving yourself!",
                icon: "fas fa-chart-line"
            };
        } else if (grade >= 3.0 && grade < 5.0) {
            return {
                level: "Passing",
                color: "secondary",
                message: "You passed, but there's room for improvement. 🌱 Stay motivated and keep learning!",
                icon: "fas fa-book-reader"
            };
        } else if (grade === 5.0) {
            return {
                level: "Failed",
                color: "danger",
                message: "Don't give up! 💡 Every setback is an opportunity to learn and grow stronger. Seek help, stay persistent!",
                icon: "fas fa-heart-broken"
            };
        }
    }

    function renderGradesWithMotivation() {
        const gradesTable = document.getElementById('gradesTable');
        const tbody = gradesTable.querySelector('tbody');
        const averageGradeElement = document.getElementById('finalAverage');
        
        let totalGrades = [];
        let gradeDetails = [];

        // Collect grades and calculate details
        tbody.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            const finalGrade = parseFloat(cells[3].textContent);
            
            totalGrades.push(finalGrade);
            
            const gradeInfo = calculateGradeLevel(finalGrade);
            
            // Update row with grade interpretation
            row.innerHTML = `
                <td>${cells[0].textContent}</td>
                <td>${cells[1].textContent}</td>
                <td>${cells[2].textContent}</td>
                <td>${cells[3].textContent}</td>
                <td>
                    <span class="badge bg-${gradeInfo.color} grade-badge">
                        <i class="${gradeInfo.icon} me-1"></i>${gradeInfo.level}
                    </span>
                </td>
            `;
            
            gradeDetails.push(gradeInfo);
        });

        // Calculate average
        const averageGrade = totalGrades.reduce((a, b) => a + b, 0) / totalGrades.length;
        averageGradeElement.textContent = averageGrade.toFixed(2);

        // Overall Grade Motivation
        const overallGradeInfo = calculateGradeLevel(averageGrade);
        
        // Create motivation section
        const motivationSection = document.createElement('div');
        motivationSection.className = 'motivation-section alert alert-' + overallGradeInfo.color;
        motivationSection.innerHTML = `
            <h4>
                <i class="${overallGradeInfo.icon} me-2"></i>
                ${overallGradeInfo.level} Performance
            </h4>
            <p>${overallGradeInfo.message}</p>
        `;

        // Insert motivation section
        const gradesContainer = document.querySelector('#grades .container.mt-4');
        gradesContainer.insertBefore(motivationSection, gradesContainer.firstChild);
    }

    // Call this function when grades section is loaded
    renderGradesWithMotivation();

    // ==========================
    // Handle Click Event for Home Logo
    // ==========================
    const homeLogo = document.getElementById('homeLogo');
    
    homeLogo.addEventListener('click', function() {
        // Option 1: Reload current page
        window.location.reload();
        
        // Option 2: Redirect to dashboard (if you want to ensure a fresh load)
        // window.location.href = 'user-dashboard.html';
    });

    // Optional: Add a cursor hint
    homeLogo.style.cursor = 'pointer';
});

// ==========================
// Calculate Final Average Function
// ==========================
function calculateFinalAverage() {
    const finalGrades = [1.00, 1.00, 1.75, 1.00, 1.10];
    const average = finalGrades.reduce((a, b) => a + b, 0) / finalGrades.length;
    
    // Update average display
    const averageElement = document.getElementById('finalAverage');
    averageElement.textContent = average.toFixed(2);

    // Update progress bar
    const progressBar = document.getElementById('gradeProgress');
    const progressPercentage = (4.0 - average) / 4.0 * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// ==========================
// Add Hover Effects to Table Rows
// ==========================
const tableRows = document.querySelectorAll('#gradesTable tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.classList.add('table-active');
    });
    row.addEventListener('mouseleave', () => {
        row.classList.remove('table-active');
    });
});

// ==========================
// Sticky Navigation Menu on Scroll
// ==========================
window.addEventListener('scroll', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.scrollY > 50) {
        navMenu.classList.add('sticky');
    } else {
        navMenu.classList.remove('sticky');
    }
});

// ==========================
// Download Receipt Handler Function
// ==========================
function downloadReceipt(studentId) {
    try {
        const permitArea = document.querySelector('.downloadable-area');
        
        html2canvas(permitArea, {
            scale: 3, // Higher resolution
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            // Compress and optimize image
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            
            const link = document.createElement('a');
            link.download = `${studentId}_permit.jpg`;
            link.href = imgData;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Log download event (optional)
            logDownload(studentId);
            
            // Show confirmation
            showDownloadConfirmation();
        });
    } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
    }
}

// Optional: Logging function (implement with your backend)
function logDownload(studentId) {
    fetch('/log-download', {
        method: 'POST',
        body: JSON.stringify({ 
            studentId: studentId,
            documentType: 'permit',
            timestamp: new Date().toISOString()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// Optional: Show confirmation modal after download
function showDownloadConfirmation() {
    const downloadConfirmModal = new bootstrap.Modal(document.getElementById('downloadConfirmModal'));
    downloadConfirmModal.show();
}

// Event Functions
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const pastEventSelect = document.getElementById('pastEventSelect');
    const upcomingEventSelect = document.getElementById('upcomingEventSelect');
    const eventHeader = document.getElementById('eventHeader');
    const reservationFormModal = document.getElementById('reservationFormModal');
    const reservationFormContainer = document.getElementById('reservationFormContainer');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const reservationForm = document.getElementById('reservationForm');
    const videoContent = document.getElementById('videoContent');
    const tableNumberSpan = document.getElementById('tableNumber');
    const closeReservationForm = document.getElementById('closeReservationForm');
    const refreshButton = document.getElementById('refreshButton');

    let currentDate = new Date(); // Default to current date

    const renderCalendar = (date, isUpcomingEvent = false) => {
        calendar.innerHTML = '';
        const month = date.getMonth();
        const year = date.getFullYear();

        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
        eventHeader.innerText = `Event for ${monthYear}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.innerHTML += '<div class="calendar-day"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.innerText = day;

            if (isUpcomingEvent && month === 4 && year === 2025 && day >= 7 && day <= 17) {
                dayDiv.classList.add('present');
                if (day === 7) {
                    dayDiv.classList.add('reserved');
                    dayDiv.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent modal close on click
                        reservationFormModal.style.display = 'flex';
                    });
                }
            } else {
                // Randomly assign present or absent class for past events
                if (Math.random() > 0.5) {
                    dayDiv.classList.add('present');
                } else {
                    dayDiv.classList.add('absent');
                }
            }
            calendar.appendChild(dayDiv);
        }
    };

    pastEventSelect.addEventListener('change', (event) => {
        const [month, year] = event.target.value.split('-');
        currentDate = new Date(year, month - 1, 1);
        renderCalendar(currentDate);
    });

    upcomingEventSelect.addEventListener('change', (event) => {
        const [month, year] = event.target.value.split('-');
        currentDate = new Date(year, month - 1, 1);
        renderCalendar(currentDate, true);
    });

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const tableNumber = Math.floor(Math.random() * 10) + 1; // Random table number between 1 and 10
        
        tableNumberSpan.innerText = tableNumber;
        reservationFormContainer.classList.add('d-none');
        confirmationMessage.classList.remove('d-none');
        
        setTimeout(() => {
            // Remove blur effect after 30 seconds
            reservationFormModal.style.display = 'none';
            reservationFormContainer.classList.remove('d-none');
            confirmationMessage.classList.add('d-none');
        }, 30000);
    });

    closeReservationForm.addEventListener('click', () => {
        reservationFormModal.style.display = 'none';
    });

    refreshButton.addEventListener('click', () => {
        pastEventSelect.selectedIndex = 0;
        upcomingEventSelect.selectedIndex = 0;
        calendar.innerHTML = '';
        eventHeader.innerText = '';
    });

    // Initial render
    renderCalendar(currentDate);

    // Add video content
    const videos = [
        'https://www.facebook.com/CapitolUniversity.WSA/videos/505196855901772/',
        'https://www.youtube.com/embed/3JZ_D3ELwOQ',
        'https://www.youtube.com/embed/L_jWHffIx5E'
    ];
    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `<iframe src="${video}" frameborder="0"; encrypted-media" allowfullscreen></iframe>`;
        videoContent.appendChild(videoItem);
    });
});
