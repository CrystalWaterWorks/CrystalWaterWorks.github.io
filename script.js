document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Check if EmailJS is defined
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not defined. Make sure the SDK is loaded correctly.');
        return;
    }

    // Initialize EmailJS (if not already initialized in HTML)
    if (!emailjs.isInitialized) {
        emailjs.init("OvxBoAeOh8WVtJn3o");
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submission initiated');

            // Get form values
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            console.log('Form values collected:', { firstName, lastName, email, subject, message });

            // Prepare the email parameters
            const templateParams = {
                from_name: `${firstName} ${lastName}`,
                message: message,
                reply_to: email,
                subject: subject
            };

            console.log('Sending email with params:', templateParams);

            // Send the email using EmailJS
            emailjs.send('service_q2twg0b', 'template_vvuy0mu', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success Response:', response);
                    alert('Your message has been sent successfully!');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    if (error.text) {
                        console.error('Error details:', error.text);
                    }
                    alert('There was an error sending your message. Please check the console for details and try again later.');
                });
        });
    } else {
        console.error('Contact form not found in the DOM');
    }

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});
    // Testimonial slider
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });