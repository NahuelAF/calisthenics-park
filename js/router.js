const ROUTES = ['home', 'dominadas', 'flexiones', 'fondos', 'abdominales', 'comunidad'];
const EXERCISE_ORDER = ['dominadas', 'flexiones', 'fondos', 'abdominales', 'comunidad'];

const Router = (() => {
  let current = null;

  function getRouteFromPath(path) {
    const slug = path.replace(/^\//, '').split('?')[0].split('#')[0];
    return ROUTES.includes(slug) ? slug : 'home';
  }

  function showView(route, pushState = true) {
    if (route === current) return;

    /* Ocultar todas las vistas */
    ROUTES.forEach(r => {
      const el = document.getElementById('view-' + r);
      if (el) el.style.display = 'none';
    });

    const next = document.getElementById('view-' + route);
    if (!next) return;

    next.style.display = 'block';

    /* Scroll al top del elemento, no de la ventana */
    next.scrollTop = 0;
    window.scrollTo(0, 0);

    current = route;

    if (pushState) {
      const url = route === 'home' ? '/' : '/' + route;
      history.pushState({ route }, '', url);
    }

    updateNav(route);
    updateMeta(route);
  }

  function updateNav(route) {
    /* Navbar scroll state */
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', route !== 'home');

    /* Links activos */
    document.querySelectorAll('[data-route]').forEach(el => {
      el.classList.toggle('active', el.dataset.route === route);
    });

    /* Botón siguiente ejercicio */
    const idx = EXERCISE_ORDER.indexOf(route);
    document.querySelectorAll('.btn-next-exercise').forEach(btn => {
      if (idx >= 0 && idx < EXERCISE_ORDER.length - 1) {
        const next = EXERCISE_ORDER[idx + 1];
        btn.dataset.route = next;
        btn.querySelector('.next-label').textContent = next.charAt(0).toUpperCase() + next.slice(1);
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    });
  }

  const META = {
    home:        { title: 'Calistenia Apóstoles — Tu progreso empieza en cada repetición' },
    dominadas:   { title: 'Dominadas — Calistenia Apóstoles' },
    flexiones:   { title: 'Flexiones — Calistenia Apóstoles' },
    fondos:      { title: 'Fondos — Calistenia Apóstoles' },
    abdominales: { title: 'Abdominales — Calistenia Apóstoles' },
  };

  function updateMeta(route) {
    document.title = (META[route] || META.home).title;
  }

  function init() {
    /* Ocultar todo al inicio */
    ROUTES.forEach(r => {
      const el = document.getElementById('view-' + r);
      if (el) el.style.display = 'none';
    });

    const initial = getRouteFromPath(window.location.pathname);
    showView(initial, false);

    window.addEventListener('popstate', e => {
      const route = (e.state && e.state.route) || getRouteFromPath(window.location.pathname);
      showView(route, false);
    });

    /* Un solo listener global para todos los data-route */
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-route]');
      if (!el) return;
      e.preventDefault();
      const route = el.dataset.route;
      if (!route) return;

      /* Cerrar menú móvil */
      document.getElementById('navLinks').classList.remove('open');
      const btn = document.getElementById('menuBtn');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');

      showView(route);
    });
  }

  return { init, showView };
})();