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

    // Comment Submission Logic
    const postBtn = document.getElementById('post-comment');
    const commentList = document.getElementById('comments-list');
    const commentText = document.getElementById('comment-text');
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');

    if (postBtn) {
        postBtn.addEventListener('click', () => {
            const text = commentText.value.trim();
            const name = userName.value.trim() || '익명';
            const role = userRole.value;

            if (!text) {
                alert('의견을 입력해주세요.');
                return;
            }

            const now = new Date();
            const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item animate-in';
            commentItem.innerHTML = `
                <div class="c-header">
                    <span class="c-author ${role === 'teacher' ? 'teacher' : ''}">${name} (${role === 'teacher' ? '교사/전문가' : '학생'})</span>
                    <span class="c-date">${dateStr}</span>
                </div>
                <p class="c-text">${text.replace(/\n/g, '<br>')}</p>
            `;

            commentList.prepend(commentItem);
            
            // Reset fields
            commentText.value = '';
            userName.value = '';
            
            // Re-run icons if needed (though none in this injection)
            if (window.lucide) window.lucide.createIcons();
        });
    }

