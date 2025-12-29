// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const certificateBtns = document.querySelectorAll('.certificate-btn');
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Certificate Modal
certificateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imgSrc = btn.getAttribute('data-img');
        modalImage.src = imgSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert and reset the form
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas ke email ${email} secepatnya.`);
    
    // Reset form
    contactForm.reset();
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements when they scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.project-card, .achievement-card, .about-content').forEach(el => {
    observer.observe(el);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .project-card, .achievement-card, .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .project-card.animate-in, 
    .achievement-card.animate-in, 
    .about-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);


// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-desc');
    const lightboxDate = document.querySelector('.lightbox-date');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Gallery Data
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Initialize gallery data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3');
        const desc = item.querySelector('.gallery-info p');
        const date = item.querySelector('.gallery-date');
        
        galleryImages.push({
            src: img.src,
            title: title ? title.textContent : 'Gallery Image',
            desc: desc ? desc.textContent : 'Description not available',
            date: date ? date.textContent : 'Date not available',
            category: item.dataset.category
        });
        
        // Add click event to open lightbox
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Filter Gallery Items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else {
                    const categories = item.dataset.category.split(' ');
                    if (categories.includes(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                }
            });
        });
    });
    
    // Open Lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update Lightbox Content
    function updateLightbox() {
        const currentImage = galleryImages[currentImageIndex];
        lightboxImg.src = currentImage.src;
        lightboxTitle.textContent = currentImage.title;
        lightboxDesc.textContent = currentImage.desc;
        lightboxDate.textContent = currentImage.date;
    }
    
    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Previous Image
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    });
    
    // Next Image
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightbox();
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                break;
            case 'ArrowLeft':
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightbox();
                break;
            case 'ArrowRight':
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightbox();
                break;
        }
    });
    
    // Add animation to gallery items when they scroll into view
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(el => {
        galleryObserver.observe(el);
    });
    
    // Add CSS for gallery animations
    const galleryStyle = document.createElement('style');
    galleryStyle.textContent = `
        .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gallery-item:nth-child(2) { transition-delay: 0.1s; }
        .gallery-item:nth-child(3) { transition-delay: 0.2s; }
        .gallery-item:nth-child(4) { transition-delay: 0.3s; }
        .gallery-item:nth-child(5) { transition-delay: 0.4s; }
        .gallery-item:nth-child(6) { transition-delay: 0.5s; }
        .gallery-item:nth-child(7) { transition-delay: 0.6s; }
        .gallery-item:nth-child(8) { transition-delay: 0.7s; }
        .gallery-item:nth-child(9) { transition-delay: 0.8s; }
    `;
    document.head.appendChild(galleryStyle);
});