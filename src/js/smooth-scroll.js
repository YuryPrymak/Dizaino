export default (() => {
  const btnScrollDown = document.querySelector('.btn-scroll-down');
  const btnScrollUp = document.querySelector('.btn-scroll-up');
  const nav = document.querySelector('.nav');
  const scrollDownTo = document.querySelectorAll('section')[0];
  const scrollUpTO = document.querySelector('body');

  const smoothScroll = function(el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  const scrollTo = function(e) {
    if(e.target && e.target.nodeName === 'A') {
      e.preventDefault();
      const scrollToEl = document.querySelector(e.target.getAttribute('href'));
      smoothScroll(scrollToEl);
    }
  };

  nav.addEventListener('click', e => scrollTo(e));

  btnScrollDown.addEventListener('click', () => smoothScroll(scrollDownTo));

  btnScrollUp.addEventListener('click', () => smoothScroll(scrollUpTO));
})();
