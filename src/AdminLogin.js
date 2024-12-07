import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Generate a random CAPTCHA
    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(result);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleAdminLogin = (e) => {
        e.preventDefault();

        // Validate CAPTCHA
        if (userCaptcha !== captcha) {
            setError('Incorrect CAPTCHA. Please try again.');
            generateCaptcha();
            return;
        }

        // Validate email and password
        if (email === 'admin@gmail.com' && password === 'Admin123@') {
            alert('Admin Login Successful');
            navigate('/admin');
        } else {
            setError('Invalid credentials. Please try again.');
            setShowPopup(true);
        }
    };

    const closePopup = () => setShowPopup(false);

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-card">
                <h2>Admin Login</h2>
                <form onSubmit={handleAdminLogin}>
                    <label className="admin-login-label">Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="admin-login-input"
                    />
                    <label className="admin-login-label">Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="admin-login-input"
                    />
                    <label className="admin-login-label">CAPTCHA:</label>
                    <div className="admin-captcha-container">
                        <p className="admin-captcha-text">{captcha}</p>
                        <input
                            type="text"
                            placeholder="Enter CAPTCHA"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            required
                            className="admin-login-input"
                        />
                    </div>
                    {error && <p className="admin-login-error">{error}</p>}
                    <button type="submit" className="admin-login-button">Log In</button>
                </form>
            </div>

            {showPopup && (
                <div className="admin-popup-overlay">
                    <div className="admin-popup-content">
                        <p>Invalid credentials. Please try again.</p>
                        <button onClick={closePopup} className="admin-popup-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminLogin;
