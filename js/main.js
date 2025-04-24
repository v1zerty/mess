$(document).ready(function() {
    // Handle login form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $(this).find('input[type="text"]').val();
        const password = $(this).find('input[type="password"]').val();
        
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { username, password });
        
        // For demo purposes, just show a success message
        alert('Login successful! (This is a demo)');
    });

    // Handle register form switch
    $('#switchToRegister').on('click', function(e) {
        e.preventDefault();
        const authForm = $('.auth-form');
        
        authForm.html(`
            <h2>Create Account</h2>
            <p>Join Fataew Messenger today</p>
            <form id="registerForm">
                <input type="text" placeholder="Username" required>
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <input type="password" placeholder="Confirm Password" required>
                <button type="submit" class="btn">Register</button>
            </form>
            <div class="auth-switch">
                <p>Already have an account? <a href="#" id="switchToLogin">Login</a></p>
            </div>
        `);

        // Handle register form submission
        $('#registerForm').on('submit', function(e) {
            e.preventDefault();
            const username = $(this).find('input[type="text"]').val();
            const email = $(this).find('input[type="email"]').val();
            const password = $(this).find('input[type="password"]').first().val();
            const confirmPassword = $(this).find('input[type="password"]').last().val();
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Register attempt:', { username, email, password });
            
            // For demo purposes, just show a success message
            alert('Registration successful! (This is a demo)');
        });

        // Handle switch back to login
        $('#switchToLogin').on('click', function(e) {
            e.preventDefault();
            const authForm = $('.auth-form');
            
            authForm.html(`
                <h2>Welcome to Fataew</h2>
                <p>A secure messenger with end-to-end encryption</p>
                <form id="loginForm">
                    <input type="text" placeholder="Username" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit" class="btn">Login</button>
                </form>
                <div class="auth-switch">
                    <p>Don't have an account? <a href="#" id="switchToRegister">Register</a></p>
                </div>
            `);
        });
    });
}); 