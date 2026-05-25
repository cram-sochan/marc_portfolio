/**
 * Portfolio Contact Form Backend Server
 * Handles email sending using Node.js + Express + Nodemailer
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Nodemailer transporter configuration
// Using Gmail with App Password (recommended for security)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error);
  } else {
    console.log('✓ Email service ready');
  }
});

/**
 * POST /api/send-email
 * Receives form data and sends email
 */
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Message length validation (spam prevention)
    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ error: 'Message must be between 10-5000 characters' });
    }

    // Email options - Send to portfolio owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Message from Your Portfolio</h2>
          <hr style="border: none; border-top: 2px solid #e0e0e0;">
          
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          
          <hr style="border: none; border-top: 2px solid #e0e0e0;">
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${escapeHtml(message)}
          </div>
          
          <hr style="border: none; border-top: 2px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px;">
            Sent from: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user (optional)
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You, ${escapeHtml(name)}!</h2>
          <p>We've received your message and will get back to you as soon as possible.</p>
          
          <hr style="border: none; border-top: 2px solid #e0e0e0;">
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Your Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${escapeHtml(message)}
          </div>
          
          <hr style="border: none; border-top: 2px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send confirmation to user (don't await, let it send in background)
    transporter.sendMail(confirmationEmail).catch(err => {
      console.error('Failed to send confirmation email:', err);
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// Basic HTML escape for security
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  Portfolio Server Running 🚀           ║
║  http://localhost:${PORT}                 ║
╚═══════════════════════════════════════╝
  `);
});
