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
            
            // Hide all sections, show the target
            sections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');

            // Scroll to top of content area
            window.scrollTo(0, 0);

            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Ensure 'home' is visible on load
    document.getElementById('home').classList.add('active');
});