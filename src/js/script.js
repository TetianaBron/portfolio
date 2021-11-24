const refs = {
  hamburger: document.querySelector('.hamburger'),
  menu: document.querySelector('.menu'),
  menuVBtnClose: document.querySelector('.menu__btn-close'),
};

refs.hamburger.addEventListener('click', () => {
  refs.menu.classList.add('active');
});
refs.menuVBtnClose.addEventListener('click', () => {
  refs.menu.classList.remove('active');
});
