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
