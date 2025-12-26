// Visitor Counter
(function() {
    // Check if localStorage is available
    if (typeof(Storage) !== "undefined") {
        // Get current count or initialize to 0
        let visitorCount = localStorage.getItem('guddewala_visitor_count');
        
        // Check if this is a new session
        const sessionKey = 'guddewala_session_' + new Date().toDateString();
        const hasVisitedToday = sessionStorage.getItem(sessionKey);
        
        if (!hasVisitedToday) {
            // Increment count if this is a new visit today
            visitorCount = visitorCount ? parseInt(visitorCount) + 1 : 1;
            localStorage.setItem('guddewala_visitor_count', visitorCount);
            sessionStorage.setItem(sessionKey, 'true');
        } else {
            // Use existing count
            visitorCount = visitorCount ? parseInt(visitorCount) : 0;
        }
        
        // Update all visitor count displays
        const visitorCountElements = document.querySelectorAll('#visitorCount');
        visitorCountElements.forEach(element => {
            // Animate the count
            animateCounter(element, parseInt(element.textContent) || 0, visitorCount);
        });
    } else {
        // Fallback if localStorage is not available
        const visitorCountElements = document.querySelectorAll('#visitorCount');
        visitorCountElements.forEach(element => {
            element.textContent = '0';
        });
    }
    
    // Counter animation function
    function animateCounter(element, start, end) {
        const duration = 1000; // 1 second
        const increment = (end - start) / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
})();

// Mobile Menu Toggle
(function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
})();

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .vm-card, .event-card, .cta-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation links based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


