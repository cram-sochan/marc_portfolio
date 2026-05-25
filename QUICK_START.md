# 🚀 Contact Form Quick Start

## TL;DR - Get Running in 5 Minutes

### 1. Install Node.js
Download from: https://nodejs.org/ (choose LTS version)

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Gmail
- Go to: https://myaccount.google.com/apppasswords
- Enable 2-factor authentication first if needed
- Generate app password for Mail
- Copy the 16-character password

### 4. Configure .env
```bash
# Create .env file from template
cp .env.example .env
```

Edit `.env` and add:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=lumabemarc@gmail.com
```

### 5. Run Server
```bash
npm start
```

### 6. Test
Open: http://localhost:3000

Fill form → Submit → Check email at lumabemarc@gmail.com ✓

---

## Features Included

✅ **Form Fields**: Name, Email, Subject, Message  
✅ **Validation**: Email format, required fields, message length  
✅ **Error Handling**: User-friendly error messages  
✅ **Success Confirmation**: Message sent feedback  
✅ **Auto Email Response**: User gets confirmation email  
✅ **Loading State**: Visual feedback while sending  
✅ **Dark Mode Support**: Matches your portfolio theme  
✅ **Mobile Responsive**: Works on all devices  
✅ **Spam Prevention**: Length limits & validation  
✅ **Security**: HTML escaping, no credential exposure  

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Email service error" | Check Gmail 2FA is enabled, use app password |
| "Network error" | Make sure `npm start` is running |
| Email not received | Check spam folder, verify recipient email in .env |
| Button stuck "disabled" | Check browser console (F12) for errors |

---

## File Changes Made

**Updated:**
- `index.html` - Added Subject field to form
- `style.css` - Enhanced form styling, error/success states
- `script.js` - Added validation and backend integration

**Created:**
- `server.js` - Backend server with email handling
- `package.json` - Node.js dependencies
- `.env.example` - Configuration template
- `.env` - Your credentials (create from .env.example)
- `.gitignore` - Prevents accidental commits of .env

---

## Next Steps

1. Get emails working locally ✓
2. Customize email template in server.js (if needed)
3. Deploy to Heroku, Railway, or Render
4. Test on production URL
5. Monitor for any issues

---

For detailed setup: Read `CONTACT_FORM_SETUP.md`
