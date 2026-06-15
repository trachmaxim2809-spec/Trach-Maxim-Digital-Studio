/* -------------------------------------------------------------
   INTERACTIVE LOGIC FOR TRACH MAXIM DIGITAL STUDIO
   Features: Mobile Drawer Navigation, Header states,
   Smooth anchor scrolling, and Form submission validation.
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE DRAWER NAVIGATION
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop body scrolling
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore body scrolling
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeDrawer);
    });


    // ==========================================
    // 2. HEADER SCROLL STATE
    // ==========================================
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '14px 0';
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately in case page starts scrolled


    // ==========================================
    // 3. SMOOTH ANCHOR SCROLLING
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow default behavior for empty anchors
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = header ? header.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 4. LEAD FORM SUBMISSION & SUCCESS MODAL
    // ==========================================
    const leadForm = document.getElementById('agency-lead-form');
    const successModal = document.getElementById('lead-success-modal');
    const modalCloseBtn = document.querySelector('.modal-action-close');

    if (leadForm && successModal) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('input-name');
            const contactInput = document.getElementById('input-contact');
            const messageInput = document.getElementById('input-message');

            // Form validation
            if (!nameInput.value.trim() || !contactInput.value.trim() || !messageInput.value.trim()) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }

            // Simulating API submit success
            successModal.classList.add('open');
            document.body.style.overflow = 'hidden';

            // Reset fields
            leadForm.reset();
        });
    }

    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 5. NAV LINK ACTIVE HIGHLIGHTER (SCROLL)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    document.querySelectorAll('.desktop-nav .nav-item').forEach(item => {
                        const href = item.getAttribute('href');
                        if (href === `#${id}`) {
                            item.style.color = 'var(--primary-blue)';
                            item.style.fontWeight = '600';
                        } else {
                            item.style.color = '';
                            item.style.fontWeight = '';
                        }
                    });
                }
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '-10% 0px -60% 0px'
    });
    
    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });

    // ==========================================
    // 6. IMMEDIATE HERO ANIMS & SCROLL REVEALS
    // ==========================================
    // Trigger Hero animations immediately on load
    const heroElements = document.querySelectorAll('.reveal-hero');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 150 + index * 150);
    });

    // Intersection Observer for scroll reveals
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('reveal-single')) {
                    target.classList.add('active');
                    observer.unobserve(target);
                } else if (target.classList.contains('reveal-group')) {
                    const items = target.querySelectorAll('.reveal-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 120); // Smooth cascading delay
                    });
                    observer.unobserve(target);
                }
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.reveal-single, .reveal-group').forEach(el => {
        revealObserver.observe(el);
    });
});
