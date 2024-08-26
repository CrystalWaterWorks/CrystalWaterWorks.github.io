// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("OvxBoAeOh8WVtJn3o");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    var firstName = document.getElementById('first_name').value;
    var lastName = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

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

// Assuming showNextGroup is the function causing the classList errors
function showNextGroup() {
    var elements = document.querySelectorAll('.your-class-selector'); // Replace with your actual selector
    elements.forEach(function(element) {
        // Check if the element and its classList exist before manipulating it
        if (element && element.classList) {
            element.classList.add('new-class'); // Replace with your actual class
        }
    });
}

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

document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.burger').classList.toggle('active');
});
