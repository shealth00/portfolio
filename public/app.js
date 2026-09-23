// app.js — primary tab switching (Medical Writer / Writing Samples) and the
// category filter chips within the Writing Samples tab. No backend, no
// external data — everything on this page ships as static content.

(function () {
  const tabButtons = document.querySelectorAll('.tabbar button');
  const panels = { writer: document.getElementById('panel-writer'), samples: document.getElementById('panel-samples') };

  function activateTab(name) {
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === name;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
    Object.entries(panels).forEach(([key, panel]) => {
      panel.hidden = key !== name;
    });
    try { localStorage.setItem('differential-tab', name); } catch (e) { /* private mode, etc. */ }
    if (history.replaceState) history.replaceState(null, '', name === 'samples' ? '#samples' : '#');
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  let initial = 'writer';
  if (window.location.hash === '#samples') {
    initial = 'samples';
  } else {
    try {
      const saved = localStorage.getItem('differential-tab');
      if (saved === 'samples' || saved === 'writer') initial = saved;
    } catch (e) { /* ignore */ }
  }
  activateTab(initial);
})();

(function () {
  const buttons = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.case-card');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.cat !== filter;
      });
    });
  });
})();
