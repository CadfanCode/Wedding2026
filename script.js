
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
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Ensure 'home' is visible on load
    const homeSection = document.getElementById('home');
    homeSection.classList.add('active');
    homeSection.classList.add('fade-in');

    // Optional: RSVP iframe adjustment (static height set in CSS, but this ensures it loads)
    function adjustRSVPIframe() {
        const rsvpIframe = document.querySelector('#rsvp iframe');
        if (rsvpIframe) {
            rsvpIframe.style.width = '100%'; // Reinforce CSS
            rsvpIframe.style.maxWidth = '800px'; // Match section-content
        }
    }

    if (document.querySelector('#rsvp.active')) {
        adjustRSVPIframe();
    }
    
});