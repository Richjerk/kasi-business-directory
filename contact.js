// contact.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Replace with your SMTP server or load from .env
    port: process.env.SMTP_PORT || 587, // Use 465 for SSL
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
    },
});

// Function to send an email
async function sendEmail(name, email, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: 'puseletso55@gmail.com', // list of receivers
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Example usage (this can be removed in production)
sendEmail('John Doe', 'john@example.com', 'This is a test message.');

// Export the sendEmail function for use in other modules
module.exports = { sendEmail };

  