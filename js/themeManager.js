export function setupThemeSwitcher() {
  const btn     = document.getElementById('themeSwitcherButton');
  const links   = {
    clean:    document.getElementById('theme-clean'),
    brutalpop:document.getElementById('theme-brutalpop'),
    brutalist:document.getElementById('theme-brutalist'),
  };
  const items   = document.querySelectorAll('.theme-dropdown li');

  if (!btn || Object.values(links).some(l => !l)) {
    console.error('Missing theme switcher elements');
    return;
  }

  // apply saved or default
  const saved = localStorage.getItem('theme') || 'brutalpop';
  Object.entries(links).forEach(([key, link]) => {
    link.disabled = (key !== saved);
  });

  // clicking a menu item
  items.forEach(li => {
    li.addEventListener('click', () => {
      const theme = li.dataset.theme;
      Object.entries(links).forEach(([key, link]) => {
        link.disabled = (key !== theme);
      });
      localStorage.setItem('theme', theme);
    });
  });
}