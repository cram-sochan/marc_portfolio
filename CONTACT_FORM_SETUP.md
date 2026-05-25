# Portfolio Contact Form Setup Guide

This guide will help you set up the email contact form feature for your portfolio website.

## ⚙️ Prerequisites

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Gmail account (recommended for email sending)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open terminal/command prompt in your portfolio folder and run:

```bash
npm install
```

This will install all required packages:
- **Express** - Web server
- **Nodemailer** - Email sending
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Step 2: Set Up Gmail App Password

To send emails from Gmail securely:

1. Go to **myaccount.google.com/apppasswords**
   - *Note: You must have 2-factor authentication enabled*
   - If you don't have 2FA, enable it first at myaccount.google.com/security

2. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your OS)

3. Click **Generate**

4. Copy the 16-character password (it will have spaces - remove them when pasting)

### Step 3: Configure Environment Variables

1. Rename `.env.example` to `.env`

2. Open `.env` and add your Gmail credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password-no-spaces
RECIPIENT_EMAIL=lumabemarc@gmail.com
PORT=3000
```

**Security Note:** Never commit `.env` to Git. It's already in `.gitignore`.

### Step 4: Start the Server

Run the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:

```
╔═══════════════════════════════════════╗
║  Portfolio Server Running 🚀           ║
║  http://localhost:3000                 ║
╚═══════════════════════════════════════╝
```

### Step 5: Test the Form

1. Open your browser to: **http://localhost:3000**
2. Scroll to the Contact section
3. Fill out the form and submit
4. You should receive an email at **lumabemarc@gmail.com**

## 📋 Form Features

### Validation
- ✓ Required field checking
- ✓ Email format validation
- ✓ Message length validation (10-5000 characters)
- ✓ Spam prevention

### User Experience
- ✓ Real-time error messages
- ✓ Success confirmation
- ✓ Loading state on submit button
- ✓ Automatic form reset on success
- ✓ Responsive design (desktop & mobile)
- ✓ Dark/Light mode support

### Email Features
- ✓ Styled HTML email template
- ✓ Automatic confirmation email to user
- ✓ Reply-to user's email
- ✓ Security: HTML escaping to prevent injection

## 🌐 Deployment

### Option 1: Heroku (Recommended for Beginners)

1. Create account at [heroku.com](https://www.heroku.com)
2. Install Heroku CLI
3. In your portfolio folder:

```bash
heroku login
heroku create your-portfolio-name
git push heroku main
```

4. Set environment variables on Heroku:

```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set RECIPIENT_EMAIL=lumabemarc@gmail.com
```

### Option 2: Other Hosting Services

Works with: Railway, Render, Vercel, DigitalOcean, AWS, etc.

Just set the same environment variables in their dashboards.

## 🔧 Troubleshooting

### "Email service error" on startup
- Check your Gmail credentials are correct
- Ensure 2FA is enabled on Gmail
- Use an app password, not your regular password
- Check if `.env` file exists and has correct values

### Form says "Network error"
- Make sure server is running (`npm start`)
- Check browser console for errors (F12)
- Verify you're accessing `http://localhost:3000`

### Email not received
- Check spam/junk folder
- Verify recipient email in `.env`
- Check server logs for error messages
- Ensure Gmail account allows "Less secure apps" if using regular password

### Form button disabled after click
- This is normal - it re-enables after response
- Check browser console (F12) for error details

## 📧 Alternative Email Services

If Gmail doesn't work, you can use:

**Outlook/Hotmail:**
```javascript
service: 'outlook',
auth: {
  user: 'your-email@outlook.com',
  pass: 'your-password'
}
```

**Custom SMTP:**
```javascript
host: 'mail.yourdomain.com',
port: 587,
auth: {
  user: 'your-email@yourdomain.com',
  pass: 'your-password'
}
```

## 📝 Email Templates

You can customize the email template in `server.js` in the `mailOptions.html` section. Current template includes:
- Sender's name and email
- Subject line
- Message body
- Timestamp

## 🔒 Security Features

- ✓ HTML escaping to prevent injection attacks
- ✓ Email format validation
- ✓ Message length limits
- ✓ Environment variables for credentials
- ✓ CORS configuration
- ✓ Error handling without exposing details

## 📚 File Structure

```
portfolio/
├── index.html          # Contact form markup (updated)
├── style.css           # Form styling (updated)
├── script.js           # Form handling (updated)
├── server.js           # Backend server ✨ NEW
├── package.json        # Dependencies ✨ NEW
├── .env                # Your credentials ✨ NEW (create from .env.example)
├── .env.example        # Template ✨ NEW
└── assets/
```

## ✅ Checklist

Before going live:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with credentials
- [ ] Gmail app password generated
- [ ] Server starts without errors (`npm start`)
- [ ] Form submits and receives email
- [ ] Confirmation email received
- [ ] Server deployed (optional)

## 🆘 Need Help?

Check:
1. `.env` file has correct values
2. Gmail 2FA is enabled
3. Server is running (`npm start`)
4. Browser console (F12) for errors
5. Server logs for error messages

## 📄 License

MIT - Feel free to use and modify!

---

**Enjoy your new contact form!** 🎉
