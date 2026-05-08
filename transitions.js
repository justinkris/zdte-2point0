document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || /^(https?:|mailto:|#)/.test(href) || link.target === '_blank') return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.cssText =
        'transition: opacity 0.25s ease, transform 0.25s ease; opacity: 0; transform: scale(0.97)';
      setTimeout(() => { window.location.href = link.href; }, 260);
    });
  });
});
