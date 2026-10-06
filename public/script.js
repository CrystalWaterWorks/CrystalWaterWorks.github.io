// Mobile menu: the burger button opens and closes the nav links.
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

function setMenuOpen(open) {
    burger.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(open));
}

burger.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('active'));
});

// Close the menu after a section is chosen, so it doesn't cover the page.
navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
});
