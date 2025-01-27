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

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, and other common shortcuts applied to all
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });

    // Initially show profile section and set its menu item as active
    document.getElementById('profile').style.display = 'block';
    document.querySelector('a[data-section="profile"]').classList.add('active');

    // ==========================
    // Term Selector and Permit Details Update
    // ==========================
    const termSelector = document.getElementById('termSelector');
    
    // Permit data object
    const permitData = {
        'PRELIM': {
            term: 'PRELIM',
            approvedBy: 'elizabeth.kiseo',
            approvedOn: 'Sep 14, 2024',
            status: 'Allowed to Enroll'
        },
        'MIDTERM': {
            term: 'MIDTERM',
            approvedBy: 'elizabeth.kiseo',
            approvedOn: 'Oct 11, 2024',
            status: 'Allowed to Enroll'
        },
        'FINALS': {
            term: 'FINALS',
            approvedBy: 'elizabeth.kiseo',
            approvedOn: 'Nov 28, 2024',
            status: 'Allowed to Enroll'
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
    if (termSelector) {
        updatePermitDetails(termSelector.value);

        // Add event listener for term selector changes
        termSelector.addEventListener('change', function() {
            updatePermitDetails(this.value);
        });
    }

    // ==========================
    // Download Receipt Handler
    // ==========================
    const downloadButton = document.getElementById('downloadPermit');
    
    if (downloadButton) {
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
    }

    // ==========================
    // Event Functions
    // ==========================
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

    if (pastEventSelect) {
        pastEventSelect.addEventListener('change', (event) => {
            const [month, year] = event.target.value.split('-');
            currentDate = new Date(year, month - 1, 1);
            renderCalendar(currentDate);
        });
    }

    if (upcomingEventSelect) {
        upcomingEventSelect.addEventListener('change', (event) => {
            const [month, year] = event.target.value.split('-');
            currentDate = new Date(year, month - 1, 1);
            renderCalendar(currentDate, true);
        });
    }

    if (reservationForm) {
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
    }

    if (closeReservationForm) {
        closeReservationForm.addEventListener('click', () => {
            reservationFormModal.style.display = 'none';
        });
    }

    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            pastEventSelect.selectedIndex = 0;
            upcomingEventSelect.selectedIndex = 0;
            calendar.innerHTML = '';
            eventHeader.innerText = '';
        });
    }

    // Initial render
    if (calendar) {
        renderCalendar(currentDate);
    }

    // Add video content
    if (videoContent) {
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
    }
});

// ==========================
// Sticky Navigation Menu on Scroll
// ==========================
window.addEventListener('scroll', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        if (window.scrollY > 50) {
            navMenu.classList.add('sticky');
        } else {
            navMenu.classList.remove('sticky');
        }
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

    // ==========================
    // Confirm Logout Button
    // ==========================
    document.getElementById('confirmLogout').addEventListener('click', function() {
        // Performing log out actions
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '../index.html';
    });

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
