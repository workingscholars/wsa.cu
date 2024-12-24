// Call the function when page loads
window.onload = calculateFinalAverage;

document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu click handler
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
});

// Confirm logout button
document.getElementById('confirmLogout').addEventListener('click', function() {
    // Performing log out actions
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login page (replace with your actual login page URL)
    window.location.href = 'index.html';
});

// Calculate Grades
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

// Add hover effects to table rows
const tableRows = document.querySelectorAll('#gradesTable tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.classList.add('table-active');
    });
    row.addEventListener('mouseleave', () => {
        row.classList.remove('table-active');
    });
});

window.addEventListener('scroll', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.scrollY > 50) {
        navMenu.classList.add('sticky');
    } else {
        navMenu.classList.remove('sticky');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Semester Selector Functionality
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
});

document.addEventListener('DOMContentLoaded', function() {
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
});

// Download handler
function downloadReceipt(studentId) {
    try {
        const permitArea = document.querySelector('.downloadable-area');
        
        html2canvas(permitArea, {
            scale: 3, // Even higher resolution
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

document.addEventListener('DOMContentLoaded', function() {
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
});

// Calculate Grade Level w/ Motivation
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
document.addEventListener('DOMContentLoaded', function() {
    renderGradesWithMotivation();
});

// Handle click event for homeLogo
document.addEventListener('DOMContentLoaded', function() {
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
