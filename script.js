// script.js - Shared JavaScript for all pages

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');
if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        // Toggle between light and dark theme
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Hero Slider Functionality (only on index page)
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
    let currentSlide = 0;
    
    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    // Initialize slideshow
    showSlide(0);
    setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Testimonial slider (simple version)
const testimonials = document.querySelectorAll('.testimonial-slide');
if (testimonials.length > 0) {
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Initialize
    showTestimonial(0);
    setInterval(nextTestimonial, 5000);
}

// Booking Prompt Functionality
const bookingPrompt = document.getElementById('bookingPrompt');
const promptOverlay = document.getElementById('promptOverlay');
const closePrompt = document.getElementById('closePrompt');
const laterBtn = document.getElementById('laterBtn');

if (bookingPrompt && promptOverlay && closePrompt && laterBtn) {
    // Show booking prompt after 50 seconds
    setTimeout(() => {
        bookingPrompt.classList.add('show');
        promptOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 50000);

    // Close prompt when X is clicked
    closePrompt.addEventListener('click', () => {
        bookingPrompt.classList.remove('show');
        promptOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Close prompt when "Remind Later" is clicked
    laterBtn.addEventListener('click', () => {
        bookingPrompt.classList.remove('show');
        promptOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Close prompt when overlay is clicked
    promptOverlay.addEventListener('click', () => {
        bookingPrompt.classList.remove('show');
        promptOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Simple validation
        if (!name || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Gallery modal functionality
function openModal(src, isVideo = false) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!modal || !modalImage || !modalVideo) return;
    
    if (isVideo) {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = src;
        modalVideo.load();
        modalVideo.play();
    } else {
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalImage.style.display = 'block';
        modalImage.src = src;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        const modal = document.getElementById('galleryModal');
        const modalVideo = document.getElementById('modalVideo');
        
        if (modal) modal.classList.remove('show');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
const modal = document.getElementById('galleryModal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const modalVideo = document.getElementById('modalVideo');
            
            modal.classList.remove('show');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
        }
    });
}

// Electronics page category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

if (categoryButtons.length > 0 && productCards.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Williams Studios website loaded successfully');
    
    // Add any page-specific initializations here

});
