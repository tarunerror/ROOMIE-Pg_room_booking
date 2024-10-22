import React, { useState } from 'react';
import './Login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Here you would typically make a request to your backend API to authenticate the user.
        // Replace this with your actual authentication logic.

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful authentication, redirect to the desired page.
                window.location.href = '/dashboard';
            } else {
                // Handle authentication errors (e.g., display an error message).
                console.error('Authentication failed.');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email address:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit">SIGN IN</button>
            <p>Not a member? <a href="/register">Register</a></p>
            < p>Or sign in with:</p>
            <ul>
                <li><a href="/auth/google">Google</a></li>
                <li><a href="/auth/facebook">Facebook</a></li>
            </ul>
        </form>
    );
}

export default LoginPage;