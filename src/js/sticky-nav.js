export default (() => {
  const nav = document.querySelector('.nav');
  const startStickSince = document.querySelector('main');

  const stickyNavToggle = function() {
    if(window.pageYOffset >= startStickSince.offsetTop) {
      nav.classList.add('sticky-nav');
    } else {
      nav.classList.remove('sticky-nav');
    }
  };

  window.addEventListener('load', stickyNavToggle);
  window.addEventListener('scroll', stickyNavToggle);
  window.addEventListener('resize', stickyNavToggle);
})();
