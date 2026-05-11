document.addEventListener('DOMContentLoaded', () => {
  Router.init();

  /* Navbar scroll */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive:true });

  /* Menú hamburguesa */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* Botón Comenzar → scroll a cards */
  document.getElementById('btnComenzar')?.addEventListener('click', () => {
    document.getElementById('ejercicios')?.scrollIntoView({ behavior:'smooth' });
  });

  /* Teclado en cards */
  document.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        Router.showView(card.dataset.route);
      }
    });
  });

  /* Parallax hero suave */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.matchMedia('(prefers-reduced-motion:no-preference)').matches) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      }
    }, { passive:true });
  }
});