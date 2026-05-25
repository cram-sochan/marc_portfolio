// ===== Portfolio script =====

// ===== Resume Download =====
function downloadResume(event) {
  event.preventDefault();
  
  const link = document.createElement('a');
  link.href = 'resume.pdf';
  link.download = 'Marc_Lumabe_Resume.pdf';
  link.target = '_blank';
  link.rel = 'noopener';
  
  // Try to download
  try {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    // Fallback: open in new tab
    window.open('resume.pdf', '_blank', 'noopener,noreferrer');
  }
}

// ===== Theme Toggle (Dark Mode / Light Mode) =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;
const THEME_KEY = 'portfolio-theme';

// Initialize theme on page load
function initializeTheme() {
  // Check if user has saved preference
  const savedTheme = localStorage.getItem(THEME_KEY);
  
  if (savedTheme) {
    // Use saved preference
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark-mode');
    }
  }
}

// Toggle theme and save preference
function toggleTheme() {
  body.classList.toggle('dark-mode');
  
  // Save user preference to localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem(THEME_KEY, 'dark');
  } else {
    localStorage.setItem(THEME_KEY, 'light');
  }
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme when page loads
initializeTheme();

// Listen for system theme changes (optional)
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      // Only auto-switch if user hasn't set a preference
      if (e.matches) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }
  });
}

// ===== Sticky navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
});

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Create mobile menu overlay
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu-overlay';
mobileMenu.innerHTML = `
  <nav class="mobile-menu">
    <ul class="mobile-nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
`;
document.body.appendChild(mobileMenu);

// Toggle mobile menu
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'auto' : 'hidden';
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Event listeners
menuBtn.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on links
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMobileMenu();
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth >= 640 && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  }, 250);
});

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reveal-on-scroll animation =====
const revealEls = document.querySelectorAll('.section, .hero');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== Contact form =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// Email validation regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Clear status message
function clearStatus() {
  status.textContent = '';
  status.classList.remove('success', 'error');
}

// Show success message
function showSuccess(message) {
  status.textContent = message;
  status.classList.remove('error');
  status.classList.add('success');
}

// Show error message
function showError(message) {
  status.textContent = message;
  status.classList.remove('success');
  status.classList.add('error');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Clear previous messages
  clearStatus();
  
  // Get form data
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  
  // Validation
  if (!name) {
    showError('Please enter your name.');
    return;
  }
  
  if (!email) {
    showError('Please enter your email address.');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }
  
  if (!subject) {
    showError('Please enter a subject.');
    return;
  }
  
  if (!message || message.length < 10) {
    showError('Please enter a message (at least 10 characters).');
    return;
  }
  
  // Disable submit button and show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending';
  
  try {
    // Send data to backend
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      showSuccess('✓ Message sent successfully! I\'ll get back to you soon.');
      form.reset();
    } else {
      showError(result.error || 'Failed to send message. Please try again.');
    }
  } catch (error) {
    showError('Network error. Please check your connection and try again.');
    console.error('Form submission error:', error);
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
