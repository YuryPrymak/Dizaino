export default (() => {
  const btnPrevSlide = document.querySelector('.testimonials .btn-prev');
  const btnNextSlide = document.querySelector('.testimonials .btn-next');
  const slider = document.querySelector('.list-of-testimonials');
  const slides = document.querySelectorAll('.list-of-testimonials li');
  const slidesQuantity = slides.length;
  let curentSlideIndex = 0;
  let xDown = null;
  let yDown = null;

  const changeSlide = function(direction) {
    const removeClasses = function(status) {
      slides[curentSlideIndex].classList.remove(`prev-slide-${status}`);
      slides[curentSlideIndex].classList.remove(`next-slide-${status}`);
    };

    removeClasses('show');
    slides[curentSlideIndex].classList.add(`${direction}-slide-hide`);
    curentSlideIndex === 0 ? curentSlideIndex = slidesQuantity - 1 : curentSlideIndex--;
    removeClasses('hide');
    slides[curentSlideIndex].classList.add(`${direction}-slide-show`);
  };

  const touchStart = function(e) {
    const firstTouch = e.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const touchMove = function(e) {
    if(!xDown || !yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)) {
      xDiff > 0 ? changeSlide('next') : changeSlide('prev');
    }
    xDown = null;
    yDown = null;
  };

  btnPrevSlide.addEventListener('click', () => changeSlide('prev'));

  btnNextSlide.addEventListener('click', () => changeSlide('next'));

  slider.addEventListener('touchstart', touchStart);

  slider.addEventListener('touchmove', touchMove);
})();
