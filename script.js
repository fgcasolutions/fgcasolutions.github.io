// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Make entire cards clickable
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const link = card.dataset.link;
  if (link) {
    card.addEventListener('click', () => {
      window.location.href = link;
    });
    card.style.cursor = 'pointer';
  }
});
