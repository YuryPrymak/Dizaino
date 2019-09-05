export default (() => {
  const prevSlide = document.querySelector('.testimonials .btn-prev');
  const nextSlide = document.querySelector('.testimonials .btn-next');
  const slider = document.querySelector('.list-of-testimonials');
  const slides = document.querySelectorAll('.list-of-testimonials li');
  const slidesQuantity = slides.length;
  let curentSlide = 1;
  let xDown = null;                                                        
  let yDown = null;

  function changeSlide(direction) {
    removeClasses('show');
    slides[curentSlide - 1].classList.add(`${direction}-slide-hide`);
    curentSlide === 1 ? curentSlide = slidesQuantity : curentSlide--;
    removeClasses('hide');
    slides[curentSlide - 1].classList.add(`${direction}-slide-show`);

    function removeClasses(status) {
      slides[curentSlide - 1].classList.remove(`prev-slide-${status}`);
      slides[curentSlide - 1].classList.remove(`next-slide-${status}`);
    }
  }

  function touchStart(e) {
    const firstTouch = e.touches[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
  };                                                

  function touchMove(e) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    let xUp = e.touches[0].clientX;                                    
    let yUp = e.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      xDiff > 0 ? changeSlide('next') : changeSlide('prev');                      
    }
    xDown = null;
    yDown = null;                                             
  };

  prevSlide.addEventListener('click', () => {
    changeSlide('prev');
  });

  nextSlide.addEventListener('click', () => {
    changeSlide('next');
  });

  slider.addEventListener('touchstart', touchStart);    

  slider.addEventListener('touchmove', touchMove);
})();
