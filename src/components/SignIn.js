import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Farmer');
    const [captcha, setCaptcha] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(result);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (userCaptcha !== captcha) {
            setError('Incorrect CAPTCHA. Please try again.');
            generateCaptcha();
            return;
        }

        setError('');
        try {
            const response = await axios.post(
                'http://localhost:8080/api/signin',
                { email, password, role },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (response.data === 'Login Successful') {
                alert('Login successful');
                if (role === 'Farmer') {
                    navigate('/FarmerHomepage');
                } else if (role === 'Buyer') {
                    navigate('/HomePage');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            alert('Sign-in failed. Please try again.');
        }
    };

    const goToSignUp = () => navigate('/signup');
    const goToForgotPassword = () => navigate('/forgot-password');
    const handleAdminLogin = () => navigate('/adminlogin');

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Farmer">Farmer</option>
                        <option value="Buyer">Buyer</option>
                    </select>
                    <label>CAPTCHA:</label>
                    <div className="captcha-container">
                        <p>{captcha}</p>
                        <input
                            type="text"
                            placeholder="Enter CAPTCHA"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
                <div className="forgot-password">
                    <a href="#" onClick={goToForgotPassword}>Forgot Password?</a>
                </div>
                <div className="signup-redirect">
                    <p>Don't have an account?</p>
                    <button onClick={goToSignUp}>Create an Account</button>
                </div>
                <button className="admin-button" onClick={handleAdminLogin}>Admin Login</button>
            </div>
        </div>
    );
}

export default SignIn;