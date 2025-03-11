document.addEventListener('DOMContentLoaded', () => {
    // Navigation link activation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth page transition
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.querySelector('.content').style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Content fade in
    const content = document.querySelector('.content');
    content.style.transition = 'opacity 0.3s ease';
    content.style.opacity = '1';
});

// Function to create other pages (call this for each new page)
function initializePage() {
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 100);
    }
}