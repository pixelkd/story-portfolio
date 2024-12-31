// main.js

// Mobile nav logic
const initMobileNav = () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-nav');
  });
};

// Slideshow logic
const initSlideshow = () => {
  const slides = document.querySelectorAll('.slide-img');
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(showNextSlide, 4000); // example: 4 seconds
};

// On DOM load
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSlideshow();
});
