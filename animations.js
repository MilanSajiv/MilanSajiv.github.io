// Dark mode — apply saved theme before render (called from inline head script)
window.toggleTheme = function() {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  _syncThemeUI(next);
};
function _syncThemeUI(theme) {
  document.querySelectorAll('.theme-icon-moon').forEach(function(el) { el.style.display = theme === 'dark' ? 'none' : 'block'; });
  document.querySelectorAll('.theme-icon-sun').forEach(function(el) { el.style.display = theme === 'dark' ? 'block' : 'none'; });
  document.querySelectorAll('.navbar-toggler span').forEach(function(s) { s.style.background = theme === 'dark' ? '#f0eafa' : '#17131E'; });
}
document.addEventListener('DOMContentLoaded', function() {
  _syncThemeUI(document.documentElement.getAttribute('data-theme') || 'light');
});

// Scroll-triggered fade-up animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Apply fade-up to key elements
  const selectors = [
    'section > .container > .row',
    'section > .container > .card-dark',
    'section > .container > .day-card',
    'section > .container > .day-block',
    'section > .container > .checklist-group',
    'section > .container > .phase-card',
    'section > .container > .imperial-banner',
    'section > .container > .weights-table',
    'section > .container > .summary-table',
    'section > .container > .swap-table',
    '.agent-card',
    '.project-card',
    '.timeline-item',
    '.tm-item',
    '.stat-strip',
    '.program-banner',
    '.non-neg',
    '.goal-card'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-up');
      // Stagger siblings
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  });

  // Hero elements — fade in on load
  document.querySelectorAll('.hero .eyebrow, .hero h1, .hero p, .hero .mt-4').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
});
