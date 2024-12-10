import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [govtId, setGovtId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    const userData = {
      name,
      email,
      password,
      userType,
      ...(userType === 'farmer' && { govtId, phoneNumber }), // Include only for farmers
      address,
    };

    try {
      const response = await axios.post('springbootsdpdeploymentfarmminds.up.railway.app/api/signup', userData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Necessary for sending cookies with CORS
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/signin'); // Redirect on success
      } else {
        setErrorMessage('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign-up error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Sign-up failed. Please check your details and try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="user-type">
            <label>
              <input
                type="radio"
                value="farmer"
                checked={userType === 'farmer'}
                onChange={() => setUserType('farmer')}
              />
              Farmer
            </label>
            <label>
              <input
                type="radio"
                value="buyer"
                checked={userType === 'buyer'}
                onChange={() => setUserType('buyer')}
              />
              Buyer
            </label>
          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {userType === 'farmer' && (
            <>
              <div>
                <label htmlFor="govtId">Government ID:</label>
                <input
                  id="govtId"
                  type="text"
                  value={govtId}
                  onChange={(e) => setGovtId(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </>
          )}

          {userType === 'buyer' && (
            <div>
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="input-field"
              />
            </div>
          )}
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
