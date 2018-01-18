document.addEventListener('DOMContentLoaded', () => {
  //отключаем навигацию без js
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.attributes.removeNamedItem('nojs');
  }

  const wrap = document.querySelector('.gallery__wrap');
  const slides = document.querySelectorAll('.gallery__slide');
  const backBtn = document.querySelector('.gallery__btn_prev');
  const forwardBtn = document.querySelector('.gallery__btn_next');

  const slidesPerScreen = () => (isMobileLayout ? 1 : 3);
  const totalScreens = () => Math.ceil(slides.length / slidesPerScreen()) - 1;

  let isMobileLayout = window.matchMedia && window.matchMedia('screen and (max-width: 600px)').matches;
  let currentScreen = 0;

  function updateGallery() {
    if (isMobileLayout) {
      wrap.style.transform = `translateX(-${100 * currentScreen}vw)`;
    } else {
      wrap.style.transform = `translateY(-${100 * currentScreen}vh)`;
    }

    //когда нельзя перейти на след/пред страницы скрываем кнопки
    backBtn.classList.toggle('gallery__btn_hidden', currentScreen <= 0);
    forwardBtn.classList.toggle('gallery__btn_hidden', currentScreen >= totalScreens());
  }
  updateGallery();

  backBtn.addEventListener('click', () => {
    currentScreen = Math.max(0, currentScreen - 1);
    updateGallery();
  });

  forwardBtn.addEventListener('click', () => {
    currentScreen = Math.min(totalScreens(), currentScreen + 1);
    updateGallery();
  });

  //в случае когда произошел ресайз
  // значения transform:translate становятся некорректными
  // поэтому ресетаем слайдер в начальное положение на первую страницу
  window.addEventListener(
    'resize',
    debounce(() => {
      console.log('resize');
      if (window.matchMedia && isMobileLayout != window.matchMedia('screen and (max-width: 600px)').matches) {
        isMobileLayout = !isMobileLayout;

        currentScreen = 0;
        wrap.style.transform = `initial`;
        updateGallery();
      }
    }, 500)
  );

  function debounce(func, wait) {
    let timeout = null;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func();
      }, wait);
    };
  }
});
