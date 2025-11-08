document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const slideMenu = document.getElementById('slide-menu');

    // --- Mobile Menu ---
    if (menuToggle && slideMenu) {
        menuToggle.addEventListener('click', () => {
            slideMenu.classList.toggle('active');
        });
    }

    // --- Universal Scroll Reveal ---
    const revealSections = document.querySelectorAll('.home, .about, .skills, .education, .more-info, .project, .contact');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // --- Parallax Effect ---
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }

    // --- Contact Form Success Message ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const successMessage = this.querySelector('.form-success-message');

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    this.reset(); // Clear the form
                    successMessage.style.display = 'block'; // Show success message
                    setTimeout(() => {
                        successMessage.style.display = 'none'; // Hide after 5 seconds
                    }, 5000);
                } else {
                    // Handle errors if needed
                    console.error('Form submission failed.');
                }
            }).catch(error => {
                console.error('An error occurred:', error);
            });
        });
    }
});