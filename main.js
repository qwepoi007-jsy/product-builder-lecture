/**
 * Engineering E-Book Main Script
 * Handles navigation, animations, and dynamic UI updates.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Navigation Logic
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    const sections = document.querySelectorAll('.view-section');

    const switchSection = (targetId) => {
        const id = targetId.replace('#', '');
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.add('active');
                window.scrollTo(0, 0);
            } else {
                section.classList.remove('active');
            }
        });
    };

    const setActiveLink = (hash) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            if (hash.startsWith('#')) {
                e.preventDefault();
                switchSection(hash);
                setActiveLink(hash);
                // Update URL hash without jumping
                history.pushState(null, null, hash);
            }
        });
    });

    // Handle initial hash on load
    if (window.location.hash) {
        switchSection(window.location.hash);
        setActiveLink(window.location.hash);
    }

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other accordions (Optional, but cleaner)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Intersection Observer for Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.5
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Horizontal Scroll for Timeline on Mobile
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (timelineWrapper) {
        let isDown = false;
        let scrollLeft;
        let startX;

        timelineWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - timelineWrapper.offsetLeft;
            scrollLeft = timelineWrapper.scrollLeft;
        });

        timelineWrapper.addEventListener('mouseleave', () => {
            isDown = false;
        });

        timelineWrapper.addEventListener('mouseup', () => {
            isDown = false;
        });

        timelineWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timelineWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            timelineWrapper.scrollLeft = scrollLeft - walk;
        });
    }
});

// Example of a Web Component for future use
class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }
    // Implementation for dynamic project cards
}
customElements.define('project-card', ProjectCard);
