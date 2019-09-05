export default (() => {
  const btnNavToggle = document.querySelector('.btn-mobile-menu-toggle');
  const nav = document.querySelector('.nav');

  btnNavToggle.addEventListener('click', () => {
    nav.classList.toggle('open-menu');
    nav.classList.remove('sticky-nav');
  });

  nav.addEventListener('click', () => {
    nav.classList.remove('open-menu');
  });

  window.addEventListener('scroll', () => {
    nav.classList.remove('open-menu');
  });

  window.addEventListener('resize', () => {
    nav.classList.remove('open-menu');
  });
})();
