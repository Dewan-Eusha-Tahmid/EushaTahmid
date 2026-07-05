document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LOADING TIMER / ANIMATION HIDING
    // ==========================================
    const loaderOverlay = document.getElementById('loaderOverlay');
    window.addEventListener('load', () => {
        // Hide loading screen safely after window assets load
        setTimeout(() => {
            loaderOverlay.style.opacity = '0';
            loaderOverlay.style.visibility = 'hidden';
        }, 400);
    });

    // Backup safe hide if load event fired earlier
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loaderOverlay.style.opacity = '0';
            loaderOverlay.style.visibility = 'hidden';
        }, 400);
    }

    // ==========================================
    // MOBILE NAVIGATION CONTROLS
    // ==========================================
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburgerMenu.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu if clicking outside of navigation menu
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ==========================================
    // STICKY HEADER & SCROLL TO TOP ACCESIBILITY
    // ==========================================
    const mainHeader = document.querySelector('.main-header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header sticky styling logic
        if (scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        // Scroll-to-top button visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // SCROLL REVEAL (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger animation once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // ACTIVE NAV LINK TRACKING
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    // ==========================================
    // CONTACT FORM SIMULATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate API Submission Delay
            formFeedback.style.display = 'block';
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = 'Processing request...';

            setTimeout(() => {
                contactForm.reset();
                formFeedback.classList.add('success');
                formFeedback.textContent = 'Thank you. Your message has been received successfully.';

                // Hide success alert after delay
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 1200);
        });
    }
});