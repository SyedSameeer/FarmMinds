import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmailSender.css'; 

const EmailSender = () => {
    const [emails, setEmails] = useState([]); // List of emails from backend
    const [subject, setSubject] = useState(''); // Subject of the email
    const [message, setMessage] = useState(''); // Message of the email
    const [responseMessage, setResponseMessage] = useState(''); // Response message after email is sent

    // Fetching all emails on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/api/users/emails') // Fetch all emails
            .then((response) => {
                setEmails(response.data); // Store emails from backend
            })
            .catch((error) => {
                console.error('There was an error fetching emails:', error);
            });
    }, []);

    // Send email function to all users
    const sendEmailToAll = () => {
        // Prepare the payload for sending to the backend
        const payload = {
            subject: subject,
            message: message,
            emails: emails, // Send all emails
        };

        axios.post('http://localhost:8080/api/send-email-to-all', payload) // Send to backend
            .then((response) => {
                setResponseMessage('Email sent successfully!'); // Show success message
            })
            .catch((error) => {
                setResponseMessage('Error: ' + error.response?.data || 'Failed to send email');
            });
    };

    return (
        <div className="email-sender">
            <h3>Send Email to All Users</h3>

            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendEmailToAll}>Send Email to All</button>

            {responseMessage && <div className="response-message">{responseMessage}</div>}
        </div>
    );
};

export default EmailSender;