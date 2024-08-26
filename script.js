document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("OvxBoAeOh8WVtJn3o");
    console.log('EmailJS initialized');

    // Add event listener to the contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        console.log('Form submission initiated');

        // Get form values
        var firstName = document.getElementById('first_name').value;
        var lastName = document.getElementById('last_name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;

        console.log('Form values collected:', firstName, lastName, email, subject, message);

        // Prepare the email parameters
        var templateParams = {
            from_name: firstName + " " + lastName,
            from_email: email,
            subject: subject,
            message: message
        };

        // Send the email using EmailJS
        emailjs.send('service_q2twg0b', 'template_vvuy0mu', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent successfully!');
                document.getElementById('contact-form').reset(); // Clear the form
            }, function(error) {
                console.error('FAILED...', error);
                alert('There was an error sending your message. Please try again later.');
            });
    });

    // Mobile menu toggle with animation
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

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
    if (testimonialSlider) {
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

        if (testimonials.length > 0) {
            setInterval(nextTestimonial, 5000);
            showTestimonial(currentTestimonial);
        }
    }

    // Animate scroll
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