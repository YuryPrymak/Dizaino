export default (() => {
  const btnNavToggle = document.querySelector('.btn-mobile-menu-toggle');
  const btnSvgBurger = document.querySelector('.btn-mobile-menu-toggle .burger');
  const btnSvgCross = document.querySelector('.btn-mobile-menu-toggle .cross');
  const nav = document.querySelector('.nav');

  const svgIconToggle = function() {
    btnSvgBurger.classList.toggle('hide-svg');
    btnSvgCross.classList.toggle('hide-svg');
  };

  const closeNav = function() {
    nav.classList.remove('open-nav');
    btnSvgBurger.classList.remove('hide-svg');
    btnSvgCross.classList.add('hide-svg');
  };

  window.addEventListener('scroll', () => closeNav());

  window.addEventListener('resize', () => closeNav());

  nav.addEventListener('click', () => closeNav());

  btnNavToggle.addEventListener('click', () => {
    nav.classList.toggle('open-nav');
    nav.classList.remove('sticky-nav');
    svgIconToggle();
  });
})();
