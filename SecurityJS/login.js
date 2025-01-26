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

                // Add Tailwind CSS animation and ensure text color remains visible
                loginButton.classList.add('animate-pulse');
                loginButton.style.color = 'white';

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
                    window.location.href = 'myStudent/user-dashboard.html';
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
