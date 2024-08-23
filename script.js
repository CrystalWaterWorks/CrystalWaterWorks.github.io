document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with animation
    const navLinks = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('nav').appendChild(burger);

    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    
    // Smooth scrolling with IntersectionObserver
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Dynamic testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 5000);
    showTestimonial(currentTestimonial);

    // Advanced form validation and submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    showNotification('Thank you for your message. We will get back to you soon!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showNotification('Oops! Something went wrong. Please try again later.', 'error');
            }
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(input);
            }
        });
        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        clearError(input);
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
        input.classList.add('error');
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.className === 'error-message') {
            error.remove();
        }
        input.classList.remove('error');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    // Animate on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const groups = document.querySelectorAll('.testimonial-group');
    let currentGroup = 0;

    function showNextGroup() {
        groups[currentGroup].classList.remove('active');
        currentGroup = (currentGroup + 1) % groups.length;
        groups[currentGroup].classList.add('active');
    }

    setInterval(showNextGroup, 4000); // Rotate every 4 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    const groups = document.querySelectorAll('.testimonial-group');
    let currentGroup = 0;

    function showNextGroup() {
        groups[currentGroup].classList.remove('active');
        currentGroup = (currentGroup + 1) % groups.length;
        groups[currentGroup].classList.add('active');
    }

    setInterval(showNextGroup, 4000); // Rotate every 4 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    const groups = document.querySelectorAll('.testimonial-group');
    let currentGroup = 0;

    function showNextGroup() {
        groups.forEach(group => group.style.transform = `translateX(-${100 * currentGroup}%)`);
        currentGroup = (currentGroup + 1) % groups.length;
    }

    setInterval(showNextGroup, 4000); // Rotate every 4 seconds
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    let valid = true;
    const firstName = document.querySelector('input[name="first_name"]');
    const lastName = document.querySelector('input[name="last_name"]');
    const email = document.querySelector('input[name="email"]');

    if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim()) {
        valid = false;
        alert('Please fill out all required fields.');
    }

    if (!validateEmail(email.value)) {
        valid = false;
        alert('Please enter a valid email address.');
    }

    if (!valid) {
        event.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}