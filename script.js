// --- DOM Elements ---
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
const header = document.querySelector('.header');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const currentYearSpan = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-link');

// --- Mobile Menu Toggle ---
menuIcon.addEventListener('click', () => {
    menuIcon.querySelector('i').classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.querySelector('i').classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// --- Scroll Effects ---
// Header styling & active nav state on scroll
window.addEventListener('scroll', () => {
    // Header shadow and padding reduction
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active Link Highlighting
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // When scroll reaches 1/3 into the section
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Theme Toggling (Dark/Light Mode) ---
const body = document.documentElement; // using root HTML element for data-theme
const THEME_KEY = 'portfolio-theme';

// Check saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // Default is dark (set in HTML)
    updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
}

// --- Footer Year Dynamic ---
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// --- Scroll Reveal Animations ---
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    // Alternative: We could also use Intersection Observer which is cleaner
    // Since the prompt asks for smooth animations without framer motion, 
    // Intersection Observer is perfect.
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Initialize observer
document.addEventListener("DOMContentLoaded", revealElements);

// --- Form Handling Mock ---
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // Simple mock feedback
        btn.innerHTML = 'Sent Successfully! <i class="bx bx-check"></i>';
        btn.style.background = '#27c93f'; // success green
        
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; // reset to original
        }, 3000);
    });
}
