document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("OvxBoAeOh8WVtJn3o");
    console.log('EmailJS initialized');

    // Add event listener to the contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

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
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.error('FAILED...', error);
                alert('There was an error sending your message. Please try again later.');
            });
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

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
});