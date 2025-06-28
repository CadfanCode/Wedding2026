document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Section toggle
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.hero, .section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Remove 'active' from all links, add to clicked link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1); // Remove '#'
            const targetSection = document.getElementById(targetId);
            
            // Hide all sections, show the target with fade-in
            sections.forEach(section => {
                section.classList.remove('active', 'fade-in');
            });
            targetSection.classList.add('active');
            setTimeout(() => targetSection.classList.add('fade-in'), 10); // Trigger fade-in after display

            // Scroll to top of content area
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            }

            // Section-specific enhancements
            if (targetId === 'schedule') {
                enhanceSchedule();
            } else if (targetId === 'video') {
                enhanceVimeoVideo();
            } else if (targetId === 'rsvp') {
                adjustRSVPIframe();
            }
        });
    });

    // Ensure 'home' is visible on load
    const homeSection = document.getElementById('home');
    homeSection.classList.add('active');
    homeSection.classList.add('fade-in');

    // Optional: RSVP iframe adjustment
    function adjustRSVPIframe() {
        const rsvpIframe = document.querySelector('#rsvp iframe');
        if (rsvpIframe) {
            rsvpIframe.style.width = '100%';
            rsvpIframe.style.maxWidth = '800px';
        }
    }

    // Optional: Vimeo video enhancement
    function enhanceVimeoVideo() {
        const videoSection = document.getElementById('video');
        const iframe = videoSection?.querySelector('iframe');

        if (!iframe) return;

        const container = document.createElement('div');
        container.className = 'video-container';

        // Set styles via JS (can be moved to CSS file instead)
        Object.assign(container.style, {
            position: 'relative',
            paddingTop: '56.25%',
            height: '0',
            overflow: 'hidden',
            width: '90%',
            maxWidth: '800px',
            margin: '0 auto'
        });

        Object.assign(iframe.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: '0'
        });

        videoSection.appendChild(container);
        container.appendChild(iframe);
    }

    // Run enhancements if active on load
    if (document.querySelector('#schedule.active')) {
        enhanceSchedule();
    }
    if (document.querySelector('#rsvp.active')) {
        adjustRSVPIframe();
    }
    if (document.querySelector('#video.active')) {
        enhanceVimeoVideo();
    }

    // Schedule enhancement function
    function enhanceSchedule() {
        const scheduleSection = document.getElementById('schedule');
        const dayLine = scheduleSection.querySelector('.day-line');
        const events = scheduleSection.querySelectorAll('.event');

        // Dynamic line adjustment
        const adjustLineWidth = () => {
            const containerWidth = scheduleSection.offsetWidth;
            const lineWidth = Math.min(50, containerWidth * 0.1);
            dayLine.style.width = `${lineWidth}px`;
        };
        adjustLineWidth();
        window.addEventListener('resize', adjustLineWidth);

        // Event hover effects
        events.forEach(event => {
            event.addEventListener('mouseenter', () => {
                event.classList.add('highlight');
            });
            event.addEventListener('mouseleave', () => {
                event.classList.remove('highlight');
            });
        });

        // Time formatting consistency
        const eventTimes = scheduleSection.querySelectorAll('.event-time');
        eventTimes.forEach(time => {
            const text = time.textContent.trim();
            time.textContent = text.replace('–', ' – ').replace(/pm/gi, 'PM');
        });

        // Responsive spacing
        const adjustSpacing = () => {
            const isMobile = window.innerWidth <= 768;
            events.forEach(event => {
                const time = event.querySelector('.event-time');
                const details = event.querySelector('.event-details');
                if (isMobile) {
                    time.style.marginBottom = '5px';
                    details.style.marginLeft = '0';
                } else {
                    time.style.marginBottom = '0';
                    details.style.marginLeft = '0';
                }
            });
        };
        adjustSpacing();
        window.addEventListener('resize', adjustSpacing);
    }
});
