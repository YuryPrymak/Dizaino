export default (() => {
  const btnFilters = document.querySelector('.portfolio .category');
  const prevWorks = document.querySelector('.portfolio .btn-prev');
  const nextWorks = document.querySelector('.portfolio .btn-next');
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

  function checkWidth() {
    const mediaDefault = window.matchMedia('(min-width: 992px)').matches;
    const mediaLg = window.matchMedia('(max-width: 992px)').matches;
    const mediaMd = window.matchMedia('(max-width: 768px)').matches;
    const mediaEx = window.matchMedia('(max-width: 480px)').matches;

    mediaDefault ? quantityOfColumns = 4 : undefined;
    mediaLg ? quantityOfColumns = 3 : undefined;
    mediaMd ? quantityOfColumns = 2 : undefined;
    mediaEx ? quantityOfColumns = 1 : undefined;

    mediaEx ? offset = 0 : offset = 10;
  }

  function btnToggle() {
    const shiftRegardingQuantityOfCol = quantityOfColumns + quantityOfShifts;

    function btnPrevToggle(value) {
      prevWorks.disabled = value;
      btnPrevIsDisabled = value;
    }

    function btnNextToggle(value) {
      nextWorks.disabled = value;
      btnNextIsDisabled = value;
    }

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
  }

  function resetTransform() {
    quantityOfShifts = 0;
    btnToggle();
    works.style.transform = 'none';
  }

  function alignContent() {
    if(quantityOfColumns > quantityOfVisibleElems / 2) {
      works.style.alignContent = 'center';
    } else {
      works.style.alignContent = 'flex-start';
    }

    if(quantityOfColumns >= quantityOfVisibleElems) {
      works.style.flexDirection = 'row';
    } else {
      works.style.flexDirection = 'column';
    }
  }

  function countVisibleElems() {
    for(let i = 0; i < worksEl.length; i++) {
      if(currentFilter === 'all') {
        quantityOfVisibleElems = worksEl.length;
        break;
      } else if(currentFilter === worksEl[i].getAttribute('data-category')) {
        quantityOfVisibleElems++;
      }
    }
  }

  function transform(sign) {
    countVisibleElems();

    sign === '+' ? quantityOfShifts-- : quantityOfShifts++;
    btnToggle();
    let currentElWidth;
    for(let i = 0; i < worksEl.length; i++) {
      if(currentFilter === 'all') {
        currentElWidth = worksEl[i].offsetWidth;
        break;
      } else if(currentFilter === worksEl[i].getAttribute('data-category')) {
        currentElWidth = worksEl[i].offsetWidth;
        break;
      }
    }
    const translateValue = (currentElWidth + offset) * quantityOfShifts;
    works.style.transform = `translateX(-${translateValue}px)`;
  }

  function touchStart(e) {
    const firstTouch = e.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function touchMove(e) {
    if(!xDown || !yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)) {
      if(xDiff > 0 && btnNextIsDisabled === false) {
        transform('-');
      } else if(xDiff < 0 && btnPrevIsDisabled === false) {
        transform('+');
      }
    }
    xDown = null;
    yDown = null;
  }

  function applyFilter(e) {
    if(e.target && e.target.tagName === 'BUTTON') {
      currentFilter = e.target.getAttribute('data-category');
      works.classList.add('works-toggle-anim');
      for(let i = 0; i < worksEl.length; i++) {
        if(currentFilter === 'all') {
          worksEl[i].style.display = 'block';
        } else if(currentFilter === worksEl[i].getAttribute('data-category')) {
          worksEl[i].style.display = 'block';
        } else {
          worksEl[i].style.display = 'none';
        }
      }
      setTimeout(() => {
        works.classList.remove('works-toggle-anim');
      }, 300);
      countVisibleElems();
      alignContent();
      resetTransform();
    }
  }

  function tabKeyPress(e) {
    const secondLink = worksLinks[quantityOfShifts * 2];
    const secondToLastLink = worksLinks[quantityOfColumns * 2 - 1 + (quantityOfShifts * 2)];
    const tabKeyCode = 9;
    let isTabPress = false;
    e.keyCode === tabKeyCode ? isTabPress = true : isTabPress = false;
    if(isTabPress && secondLink === document.activeElement && !btnPrevIsDisabled) {
      transform('+');
    }
    if(isTabPress && secondToLastLink === document.activeElement && !btnNextIsDisabled) {
      transform('-');
    }
  }

  window.addEventListener('load', () => {
    checkWidth();
    countVisibleElems();
    alignContent();
    btnToggle();
  });

  window.addEventListener('resize', () => {
    countVisibleElems();
    checkWidth();
    alignContent();
    resetTransform();
  });

  window.addEventListener('keyup', (e) => tabKeyPress(e)); // Accessibility

  works.addEventListener('touchstart', touchStart);

  works.addEventListener('touchmove', touchMove);

  btnFilters.addEventListener('click', (e) => applyFilter(e));

  prevWorks.addEventListener('click', () => transform('+'));

  nextWorks.addEventListener('click', () => transform('-'));
})();
