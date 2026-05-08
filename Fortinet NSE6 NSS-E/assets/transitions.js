(function () {
  const ease = 'cubic-bezier(0.87, 0, 0.13, 1)';

  const style = document.createElement('style');
  style.textContent = `
    .pt-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: #1a1209;
      pointer-events: none;
      will-change: transform;
    }
    .pt-overlay::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #cc2020 30%, #cc2020 70%, transparent);
    }
  `;
  document.head.appendChild(style);

  const ov = document.createElement('div');
  ov.className = 'pt-overlay';
  ov.style.transform = 'translateY(0)';
  document.body.appendChild(ov);

  sessionStorage.removeItem('pt');
  document.documentElement.classList.remove('pt-init');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ov.style.transition = `transform 0.6s ${ease}`;
      ov.style.transform = 'translateY(-100%)';
    });
  });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#' || /^(https?:|mailto:|javascript:)/.test(href)) return;
    e.preventDefault();

    sessionStorage.setItem('pt', '1');
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(0)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.location.href = href;
      });
    });
  }, true);

  window.addEventListener('pagehide', () => sessionStorage.setItem('pt', '1'));

  window.addEventListener('pageshow', e => {
    if (!e.persisted) return;
    sessionStorage.removeItem('pt');
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(0)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ov.style.transition = `transform 0.6s ${ease}`;
        ov.style.transform = 'translateY(-100%)';
      });
    });
  });
})();
