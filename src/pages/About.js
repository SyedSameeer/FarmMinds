import React, { useState, useEffect } from 'react';
import './About.css';

function About() {
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user ID on component mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setErrorMessage('You need to be logged in to submit feedback.');
    }
  }, []);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setErrorMessage('You need to be logged in to submit feedback.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          feedback,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Thank you for your feedback!');
        setFeedback(''); // Clear feedback input
      } else {
        setErrorMessage('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while submitting feedback.');
    }
  };

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Empowering farmers through a global e-commerce platform for sustainable growth.</p>
      </header>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We strive to bridge the gap between farmers and global markets, enabling them to
            showcase and sell their produce worldwide. Our platform promotes sustainability,
            fair trade, and financial independence for farming communities.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To revolutionize the agricultural economy by providing farmers with the tools,
            resources, and access needed to thrive in a competitive global market.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            A passionate group of individuals dedicated to supporting farmers and creating
            a transparent, equitable, and sustainable marketplace for agricultural goods.
          </p>
        </section>
        {/* Feedback Section */}
        <section className="feedback-section">
          <h2>Submit Your Feedback</h2>
          <form onSubmit={handleSubmitFeedback}>
            <textarea
              placeholder="Write your suggestions here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            <button type="submit">Submit Feedback</button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </section>
      </div>
    </div>
  );
}

export default About;
