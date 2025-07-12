// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const testimonialsSlider = document.getElementById('testimonialsSlider');

// Page routing
let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
    });
});

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Quick booking form (Home page)
const quickBookingForm = document.getElementById('quickBookingForm');
if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('quickFrom').value.trim();
        const to = document.getElementById('quickTo').value.trim();
        const departure = document.getElementById('quickDeparture').value;
        const passengers = document.getElementById('quickPassengers').value;
        
        if (!from || !to || !departure || !passengers) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (from.toLowerCase() === to.toLowerCase()) {
            showNotification('Departure and destination cities cannot be the same', 'error');
            return;
        }
        
        const departureDate = new Date(departure);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (departureDate < today) {
            showNotification('Departure date cannot be in the past', 'error');
            return;
        }
        
        // Simulate search and redirect to book page
        showNotification('Searching flights... Redirecting to booking page', 'success');
        setTimeout(() => {
            showPage('book');
            // Pre-fill the detailed form
            document.getElementById('bookFrom').value = from;
            document.getElementById('bookTo').value = to;
            document.getElementById('bookDeparture').value = departure;
        }, 1500);
    });
}

// Booking tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const roundtripElements = document.querySelectorAll('.roundtrip-only');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabBtns.forEach(tab => tab.classList.remove('active'));
        // Add active class to clicked tab
        btn.classList.add('active');
        
        const tabType = btn.getAttribute('data-tab');
        
        // Show/hide return date field based on trip type
        if (tabType === 'oneway' || tabType === 'multicity') {
            roundtripElements.forEach(el => el.style.display = 'none');
        } else {
            roundtripElements.forEach(el => el.style.display = 'block');
        }
    });
});

// Detailed booking form
const detailedBookingForm = document.getElementById('detailedBookingForm');
if (detailedBookingForm) {
    detailedBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('bookFrom').value.trim();
        const to = document.getElementById('bookTo').value.trim();
        const departure = document.getElementById('bookDeparture').value;
        const adults = document.getElementById('bookAdults').value;
        const flightClass = document.getElementById('bookClass').value;
        
        if (!from || !to || !departure || !adults || !flightClass) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (from.toLowerCase() === to.toLowerCase()) {
            showNotification('Departure and destination cities cannot be the same', 'error');
            return;
        }
        
        const departureDate = new Date(departure);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (departureDate < today) {
            showNotification('Departure date cannot be in the past', 'error');
            return;
        }
        
        // Simulate flight search
        const submitBtn = detailedBookingForm.querySelector('.search-flights-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Searching Flights...</span><span class="loading">⏳</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showMockFlightResults();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showNotification('Flight search completed!', 'success');
        }, 2000);
    });
}

// Mock flight results
function showMockFlightResults() {
    const searchResults = document.getElementById('searchResults');
    const flightResults = searchResults.querySelector('.flight-results');
    
    const mockFlights = [
        {
            airline: 'SkyWings Airlines',
            departure: '08:30',
            arrival: '14:45',
            duration: '6h 15m',
            stops: 'Direct',
            price: '$299'
        },
        {
            airline: 'Global Airways',
            departure: '12:15',
            arrival: '19:30',
            duration: '7h 15m',
            stops: '1 Stop',
            price: '$249'
        },
        {
            airline: 'Premium Air',
            departure: '16:45',
            arrival: '23:00',
            duration: '6h 15m',
            stops: 'Direct',
            price: '$349'
        }
    ];
    
    flightResults.innerHTML = mockFlights.map(flight => `
        <div class="flight-result">
            <div class="flight-info">
                <div class="airline">${flight.airline}</div>
                <div class="flight-times">
                    <span class="departure">${flight.departure}</span>
                    <span class="duration">${flight.duration}</span>
                    <span class="arrival">${flight.arrival}</span>
                </div>
                <div class="stops">${flight.stops}</div>
            </div>
            <div class="flight-price">
                <div class="price">${flight.price}</div>
                <button class="select-flight-btn">Select</button>
            </div>
        </div>
    `).join('');
    
    // Add styles for flight results
    if (!document.querySelector('#flight-results-styles')) {
        const style = document.createElement('style');
        style.id = 'flight-results-styles';
        style.textContent = `
            .flight-result {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
            }
            .flight-result:hover {
                box-shadow: 0 10px 25px var(--shadow);
                transform: translateY(-2px);
            }
            .airline {
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            .flight-times {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 0.5rem;
            }
            .departure, .arrival {
                font-weight: 600;
                font-size: 1.1rem;
            }
            .duration {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            .stops {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            .flight-price {
                text-align: center;
            }
            .price {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            .select-flight-btn {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .select-flight-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);
    }
    
    searchResults.style.display = 'block';
    searchResults.scrollIntoView({ behavior: 'smooth' });
    
    // Add event listeners to select buttons
    document.querySelectorAll('.select-flight-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Flight selected! Proceeding to checkout...', 'success');
        });
    });
}

// City suggestions for booking form
const cities = [
    'New York, NY (JFK)', 'Los Angeles, CA (LAX)', 'Chicago, IL (ORD)',
    'Miami, FL (MIA)', 'San Francisco, CA (SFO)', 'Las Vegas, NV (LAS)',
    'Seattle, WA (SEA)', 'Boston, MA (BOS)', 'Washington, DC (DCA)',
    'London, UK (LHR)', 'Paris, France (CDG)', 'Tokyo, Japan (NRT)',
    'Dubai, UAE (DXB)', 'Singapore (SIN)', 'Sydney, Australia (SYD)',
    'Toronto, Canada (YYZ)', 'Amsterdam, Netherlands (AMS)', 'Frankfurt, Germany (FRA)'
];

function setupCityAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestions = document.getElementById(suggestionsId);
    
    if (!input || !suggestions) return;
    
    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        
        if (value.length < 2) {
            suggestions.style.display = 'none';
            return;
        }
        
        const filteredCities = cities.filter(city => 
            city.toLowerCase().includes(value)
        );
        
        if (filteredCities.length > 0) {
            suggestions.innerHTML = filteredCities.slice(0, 5).map(city => 
                `<div class="suggestion-item">${city}</div>`
            ).join('');
            suggestions.style.display = 'block';
            
            // Add click listeners to suggestions
            suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    input.value = item.textContent;
                    suggestions.style.display = 'none';
                });
            });
        } else {
            suggestions.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

// Setup autocomplete for booking form
setupCityAutocomplete('bookFrom', 'fromSuggestions');
setupCityAutocomplete('bookTo', 'toSuggestions');

// Deals filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const dealCards = document.querySelectorAll('.deal-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        dealCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Deal card booking
document.querySelectorAll('.book-deal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dealCard = btn.closest('.deal-card');
        const destination = dealCard.querySelector('h3').textContent;
        
        showNotification(`Booking initiated for ${destination}!`, 'success');
        
        // Animate button
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Redirect to booking page after animation
        setTimeout(() => {
            showPage('book');
        }, 1000);
    });
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Live chat functionality
const startChatBtn = document.getElementById('startChat');
if (startChatBtn) {
    startChatBtn.addEventListener('click', () => {
        showNotification('Connecting you to a live agent...', 'info');
        setTimeout(() => {
            showNotification('Chat session started! An agent will be with you shortly.', 'success');
        }, 2000);
    });
}

// Auth tabs functionality
const authTabs = document.querySelectorAll('.auth-tab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        authTabs.forEach(authTab => authTab.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const tabType = tab.getAttribute('data-tab');
        
        if (tabType === 'signin') {
            signinForm.style.display = 'flex';
            signupForm.style.display = 'none';
        } else {
            signinForm.style.display = 'none';
            signupForm.style.display = 'flex';
        }
    });
});

// Password toggle functionality
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggle.textContent = '🙈';
        } else {
            input.type = 'password';
            toggle.textContent = '👁️';
        }
    });
});

// Sign in form
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signinEmail').value.trim();
        const password = document.getElementById('signinPassword').value;
        
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate login
        const submitBtn = signinForm.querySelector('.auth-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Welcome back! Login successful.', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Redirect to home page
            setTimeout(() => {
                showPage('home');
            }, 1500);
        }, 2000);
    });
}

// Sign up form
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('signupFirstName').value.trim();
        const lastName = document.getElementById('signupLastName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const phone = document.getElementById('signupPhone').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
            return;
        }
        
        // Simulate registration
        const submitBtn = signupForm.querySelector('.auth-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Account created successfully! Welcome to SkyWings.', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Switch to sign in tab
            setTimeout(() => {
                authTabs[0].click();
            }, 1500);
        }, 2000);
    });
}

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const provider = btn.textContent.trim();
        showNotification(`Redirecting to ${provider} login...`, 'info');
    });
});

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value.trim();
        
        if (!email) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email format', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Testimonials slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-slide testimonials
function startTestimonialSlider() {
    setInterval(nextTestimonial, 5000);
}

// Header scroll effect
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(30, 41, 59, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(30, 41, 59, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
}, 10));

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.deal-card, .feature-card, .support-card, .testimonial-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize date inputs with minimum date as today
function initializeDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.min = today;
    });
    
    // Update return date minimum when departure date changes
    const departureInputs = document.querySelectorAll('#quickDeparture, #bookDeparture');
    const returnInputs = document.querySelectorAll('#bookReturn');
    
    departureInputs.forEach((departureInput, index) => {
        departureInput.addEventListener('change', () => {
            if (returnInputs[index]) {
                returnInputs[index].min = departureInput.value || today;
                if (returnInputs[index].value && returnInputs[index].value < departureInput.value) {
                    returnInputs[index].value = '';
                }
            }
        });
    });
}

// Input focus effects
function addInputEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const inputGroup = input.closest('.input-group');
            if (inputGroup) {
                inputGroup.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', () => {
            const inputGroup = input.closest('.input-group');
            if (inputGroup) {
                inputGroup.style.transform = 'translateY(0)';
            }
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initializeDateInputs();
    addInputEffects();
    startTestimonialSlider();
    
    // Add loading animation to the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Handle initial page load based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Update URL when navigating
function updateURL(pageId) {
    history.pushState(null, null, `#${pageId}`);
}

// Export functions for global access
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;