export default (() => {
  const btnScrollDown = document.querySelector('.btn-scroll-down');
  const btnScrollUp = document.querySelector('.btn-scroll-up');
  const nav = document.querySelector('.nav');
  const scrollDownTo = document.querySelectorAll('section')[0];
  const scrollUpTO = document.querySelector('body');

  function smoothScroll(el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }

  btnScrollDown.addEventListener('click', () => {
    smoothScroll(scrollDownTo);
  });

  btnScrollUp.addEventListener('click', () => {
    smoothScroll(scrollUpTO);
  });

  nav.addEventListener('click', (e) => {
    if(e.target && e.target.nodeName === 'A') {
      e.preventDefault();
      const scrollTo = document.querySelector(e.target.getAttribute('href'));
      smoothScroll(scrollTo);
    }
  });
})();
