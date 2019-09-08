export default (() => {
  const btnFilters = document.querySelector('.portfolio .category');
  const btnPrevWorks = document.querySelector('.portfolio .btn-prev');
  const btnNextWorks = document.querySelector('.portfolio .btn-next');
  const works = document.querySelector('.list-of-previews');
  const worksEl = document.querySelectorAll('.list-of-previews li');
  const worksLinks = document.querySelectorAll('.list-of-previews li a');
  let offset = 10;
  let btnPrevIsDisabled = true;
  let btnNextIsDisabled = false;
  let quantityOfShifts = 0;
  let quantityOfColumns = null;
  let quantityOfVisibleElems = 0;
  let currentFilter = 'all';
  let xDown = null;
  let yDown = null;

  const checkWidth = function() {
    const mediaDefault = window.matchMedia('(min-width: 992px)').matches;
    const mediaLg = window.matchMedia('(max-width: 992px)').matches;
    const mediaMd = window.matchMedia('(max-width: 768px)').matches;
    const mediaEx = window.matchMedia('(max-width: 480px)').matches;

    mediaDefault ? quantityOfColumns = 4 : undefined;
    mediaLg ? quantityOfColumns = 3 : undefined;
    mediaMd ? quantityOfColumns = 2 : undefined;
    mediaEx ? quantityOfColumns = 1 : undefined;

    mediaEx ? offset = 0 : offset = 10;
  };

  const btnToggle = function() {
    const shiftRegardingQuantityOfCol = quantityOfColumns + quantityOfShifts;

    const btnPrevToggle = function(value) {
      btnPrevWorks.disabled = value;
      btnPrevIsDisabled = value;
    };

    const btnNextToggle = function(value) {
      btnNextWorks.disabled = value;
      btnNextIsDisabled = value;
    };

    if(quantityOfColumns > quantityOfVisibleElems / 2) {
      btnPrevToggle(true);
      btnNextToggle(true);
    } else {
      if(quantityOfShifts === 0) {
        btnPrevToggle(true);
      } else {
        btnPrevToggle(false);
      }
      if(quantityOfColumns !== 1) {
        if(shiftRegardingQuantityOfCol >= quantityOfVisibleElems / 2) {
          btnNextToggle(true);
        } else {
          btnNextToggle(false);
        }
      } else if(quantityOfShifts >= quantityOfVisibleElems - 1) {
        btnNextToggle(true);
      } else {
        btnNextToggle(false);
      }
    }
    quantityOfVisibleElems = 0;
  };

  const resetShift = function() {
    quantityOfShifts = 0;
    btnToggle();
    works.style.transform = 'none';
  };

  const alignContent = function() {
    if(quantityOfColumns > quantityOfVisibleElems / 2) {
      works.style.alignContent = 'center';
    } else {
      works.style.alignContent = 'flex-start';
    }

    if(quantityOfColumns >= quantityOfVisibleElems / 2 && quantityOfColumns !== 1) {
      works.style.flexDirection = 'row';
    } else {
      works.style.flexDirection = 'column';
    }
  };

  const countVisibleElems = function() {
    for(const el of worksEl) {
      if(currentFilter === 'all') {
        quantityOfVisibleElems = worksEl.length;
        break;
      } else if(currentFilter === el.getAttribute('data-category')) {
        quantityOfVisibleElems++;
      }
    }
  };

  const shift = function(sign) {
    let currentElWidth;
    countVisibleElems();
    sign === '+' ? quantityOfShifts-- : quantityOfShifts++;
    btnToggle();
    for(const el of worksEl) {
      if(currentFilter === 'all') {
        currentElWidth = el.offsetWidth;
        break;
      } else if(currentFilter === el.getAttribute('data-category')) {
        currentElWidth = el.offsetWidth;
        break;
      }
    }
    const translateValue = (currentElWidth + offset) * quantityOfShifts;
    works.style.transform = `translateX(-${translateValue}px)`;
  };

  const applyFilter = function(e) {
    if(e.target && e.target.tagName === 'BUTTON') {
      currentFilter = e.target.getAttribute('data-category');
      works.classList.add('works-toggle-anim');
      for(const el of worksEl) {
        if(currentFilter === 'all') {
          el.style.display = 'block';
        } else if(currentFilter === el.getAttribute('data-category')) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
      setTimeout(() => {
        works.classList.remove('works-toggle-anim');
      }, 300);
      countVisibleElems();
      alignContent();
      resetShift();
    }
  };

  const tabKeyPress = function(e) {
    const secondLink = worksLinks[quantityOfShifts * 2];
    const secondToLastLink = worksLinks[quantityOfColumns * 2 - 1 + (quantityOfShifts * 2)];
    const tabKeyCode = 9;
    let isTabPress = false;
    e.keyCode === tabKeyCode ? isTabPress = true : isTabPress = false;
    if(isTabPress && secondLink === document.activeElement && !btnPrevIsDisabled) {
      shift('+');
    }
    if(isTabPress && secondToLastLink === document.activeElement && !btnNextIsDisabled) {
      shift('-');
    }
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
      if(xDiff > 0 && btnNextIsDisabled === false) {
        shift('-');
      } else if(xDiff < 0 && btnPrevIsDisabled === false) {
        shift('+');
      }
    }
    xDown = null;
    yDown = null;
  };

  window.addEventListener('load', () => {
    checkWidth();
    countVisibleElems();
    alignContent();
    btnToggle();
  });

  window.addEventListener('resize', () => {
    checkWidth();
    countVisibleElems();
    alignContent();
    resetShift();
  });

  window.addEventListener('keyup', e => tabKeyPress(e)); // Accessibility

  btnFilters.addEventListener('click', e => applyFilter(e));

  btnPrevWorks.addEventListener('click', () => shift('+'));

  btnNextWorks.addEventListener('click', () => shift('-'));

  works.addEventListener('touchstart', touchStart);

  works.addEventListener('touchmove', touchMove);
})();
