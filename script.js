// Visitor Counter
(function() {
    // Counter animation function
    function animateCounter(element, start, end) {
        if (!element) return;
        
        const duration = 1000; // 1 second
        const increment = (end - start) / (duration / 16); // 60fps
        let current = start;
        
        // If start and end are the same, just set it
        if (start === end) {
            element.textContent = end.toLocaleString();
            return;
        }
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Function to update visitor counter
    function updateVisitorCounter() {
        // Check if localStorage is available
        if (typeof(Storage) === "undefined") {
            // Fallback if localStorage is not available
            const visitorCountElements = document.querySelectorAll('#visitorCount, #heroVisitorCount');
            visitorCountElements.forEach(element => {
                if (element) element.textContent = '0';
            });
            return;
        }
        
        // Get current count or initialize to 0
        let visitorCount = localStorage.getItem('guddewala_visitor_count');
        
        // Check if this is a new session (using a combination of date and a random session ID)
        const today = new Date().toDateString();
        const sessionKey = 'guddewala_session_' + today;
        const hasVisitedToday = sessionStorage.getItem(sessionKey);
        
        if (!hasVisitedToday) {
            // Increment count if this is a new visit today
            if (visitorCount) {
                visitorCount = parseInt(visitorCount) + 1;
            } else {
                visitorCount = 1;
            }
            localStorage.setItem('guddewala_visitor_count', visitorCount);
            sessionStorage.setItem(sessionKey, 'true');
        } else {
            // Use existing count
            visitorCount = visitorCount ? parseInt(visitorCount) : 0;
        }
        
        // Update all visitor count displays
        const visitorCountElements = document.querySelectorAll('#visitorCount, #heroVisitorCount, #giveawayVisitorCount');
        visitorCountElements.forEach(element => {
            if (element) {
                const currentValue = parseInt(element.textContent) || 0;
                animateCounter(element, currentValue, visitorCount);
            }
        });
        
        // Update giveaway progress if on giveaways page
        updateGiveawayProgress(visitorCount);
    }
    
    // Function to update giveaway progress
    function updateGiveawayProgress(count) {
        const progressFill = document.getElementById('progressFill');
        const currentCount = document.getElementById('currentCount');
        const giveawayStatus = document.getElementById('giveawayStatus');
        const TARGET_COUNT = 1000;
        
        if (progressFill && currentCount) {
            const percentage = Math.min((count / TARGET_COUNT) * 100, 100);
            progressFill.style.width = percentage + '%';
            currentCount.textContent = count.toLocaleString();
            
            if (giveawayStatus) {
                if (count >= TARGET_COUNT) {
                    giveawayStatus.innerHTML = '<p class="status-message winner">🎉 Congratulations! The 1000th visitor has been reached! Check your email or contact us to claim your prize!</p>';
                } else {
                    const remaining = TARGET_COUNT - count;
                    giveawayStatus.innerHTML = `<p class="status-message">Only ${remaining.toLocaleString()} more visitors until someone wins a free teddy bear! 🧸</p>`;
                }
            }
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateVisitorCounter);
    } else {
        // DOM is already ready
        updateVisitorCounter();
    }
})();

// Mobile Menu Toggle
(function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('mobile-nav-open');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('mobile-nav-open') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('mobile-nav-open') && 
                !nav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('mobile-nav-open');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-nav-open');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
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

// Loading Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// Countdown Timer
(function() {
    const eventDate = new Date('2026-01-10T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">Event Started!</span></div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    if (document.getElementById('countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
})();

// Scroll to Top Button
(function() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();

// Gift Finder
(function() {
    const giftOptions = document.querySelectorAll('.gift-option-btn');
    const giftQuestion = document.getElementById('giftQuestion');
    const giftResult = document.getElementById('giftResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const resetFinder = document.getElementById('resetFinder');
    
    const giftResults = {
        student: {
            title: 'Lucky Charm Teddy Bear 🍀',
            description: 'Perfect for students! This teddy bear will bring you luck in your exams and quizzes. Keep it on your desk while studying for that extra boost of confidence and comfort during stressful exam periods.'
        },
        friend: {
            title: 'Peace Offering Teddy Bear 🤝',
            description: 'The perfect gift to mend fences or show appreciation! This cuddly companion represents friendship, understanding, and warmth. A thoughtful gesture that says "I care about our friendship."'
        },
        self: {
            title: 'Stress Relief Companion 🧘',
            description: 'Treat yourself to a stress-relieving buddy! This soft toy is perfect for those moments when you need comfort, a hug, or just something to hold during stressful times. Your personal desk buddy for the semester.'
        },
        child: {
            title: 'Nostalgia Collection Teddy 🎈',
            description: 'Bring back childhood memories! This teddy bear reminds us of simpler times - safety, joy, and innocence. Perfect for gifting to a child or keeping as a nostalgic reminder of carefree days.'
        }
    };
    
    if (giftOptions.length > 0) {
        giftOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                const option = this.getAttribute('data-option');
                const result = giftResults[option];
                
                if (result && giftQuestion && giftResult && resultTitle && resultDescription) {
                    giftQuestion.style.display = 'none';
                    giftResult.style.display = 'block';
                    resultTitle.textContent = result.title;
                    resultDescription.textContent = result.description;
                }
            });
        });
    }
    
    if (resetFinder) {
        resetFinder.addEventListener('click', function() {
            if (giftQuestion && giftResult) {
                giftResult.style.display = 'none';
                giftQuestion.style.display = 'block';
            }
        });
    }
})();

// Easter Eggs
(function() {
    let clickCount = 0;
    const logo = document.querySelector('.logo-img');
    
    // Click logo 5 times for easter egg
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                this.classList.add('easter-egg-active');
                setTimeout(() => {
                    this.classList.remove('easter-egg-active');
                    clickCount = 0;
                }, 2000);
                
                // Create teddy bear rain
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const teddy = document.createElement('div');
                        teddy.className = 'teddy-rain';
                        teddy.textContent = '🧸';
                        teddy.style.left = Math.random() * 100 + '%';
                        teddy.style.animationDelay = Math.random() * 0.5 + 's';
                        document.body.appendChild(teddy);
                        
                        setTimeout(() => {
                            teddy.remove();
                        }, 3000);
                    }, i * 100);
                }
            }
        });
    }
    
    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Triple click on visitor counter
    const visitorCounter = document.getElementById('heroVisitorCount');
    if (visitorCounter) {
        let tripleClickCount = 0;
        visitorCounter.addEventListener('click', function() {
            tripleClickCount++;
            if (tripleClickCount === 3) {
                this.style.animation = 'bounce 1s ease infinite';
                setTimeout(() => {
                    this.style.animation = '';
                    tripleClickCount = 0;
                }, 3000);
            }
            setTimeout(() => {
                tripleClickCount = 0;
            }, 1000);
        });
    }
})();

// Instagram Reels Embed
(function() {
    const reelsContainer = document.getElementById('reelsContainer');
    const reelsFallback = document.querySelector('.reels-fallback');
    
    // Function to create embed from reel URL
    function createReelEmbed(reelUrl) {
        // Extract shortcode from URL
        const shortcodeMatch = reelUrl.match(/\/p\/([A-Za-z0-9_-]+)/) || reelUrl.match(/\/reel\/([A-Za-z0-9_-]+)/);
        if (!shortcodeMatch) return null;
        
        const shortcode = shortcodeMatch[1];
        const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/`;
        
        const embedWrapper = document.createElement('div');
        embedWrapper.className = 'reel-embed-wrapper';
        
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.width = '100%';
        iframe.height = '600';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.allowTransparency = 'true';
        iframe.allow = 'encrypted-media';
        iframe.style.borderRadius = '15px';
        iframe.style.border = '2px solid var(--primary-black)';
        
        embedWrapper.appendChild(iframe);
        return embedWrapper;
    }
    
    // Function to load Instagram reels
    function loadInstagramReels() {
        if (!reelsContainer) return;
        
        // Instagram reel URLs
        const reelUrls = [
            'https://www.instagram.com/reel/DSjbLgskw2p/',
            'https://www.instagram.com/reel/DSpEvoEExAn/',
            'https://www.instagram.com/reel/DSmEQGEjMJY/',
        ];
        
        if (reelUrls.length === 0) {
            // Show fallback if no reels provided
            if (reelsContainer) {
                reelsContainer.innerHTML = '';
                reelsContainer.style.display = 'none';
            }
            if (reelsFallback) {
                reelsFallback.style.display = 'grid';
            }
            return;
        }
        
        // Load each reel
        reelsContainer.innerHTML = '';
        reelsContainer.style.display = 'grid';
        
        reelUrls.forEach(reelUrl => {
            const embed = createReelEmbed(reelUrl);
            if (embed) {
                reelsContainer.appendChild(embed);
            }
        });
        
        if (reelsContainer.children.length === 0 && reelsFallback) {
            reelsContainer.style.display = 'none';
            reelsFallback.style.display = 'grid';
        }
    }
    
    // Helper function to add reels dynamically
    window.addInstagramReel = function(reelUrl) {
        if (!reelsContainer) return;
        
        const embed = createReelEmbed(reelUrl);
        if (embed) {
            reelsContainer.style.display = 'grid';
            reelsContainer.appendChild(embed);
            if (reelsFallback) {
                reelsFallback.style.display = 'none';
            }
        }
    };
    
    // Load reels on page load
    loadInstagramReels();
})();


