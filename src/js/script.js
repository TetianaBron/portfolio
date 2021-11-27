const refs = {
  //Hamdurger menu
  hamburger: document.querySelector('.hamburger'),
  menu: document.querySelector('.menu'),
  menuVBtnClose: document.querySelector('.menu__btn-close'),
  //Counting percent in skill section
  counters: document.querySelectorAll('.skills__rating-item-counter'),
  lines: document.querySelectorAll('.skills__rating-item-line span'),
};

refs.hamburger.addEventListener('click', () => {
  refs.menu.classList.add('active');
});
refs.menuVBtnClose.addEventListener('click', () => {
  refs.menu.classList.remove('active');
});

refs.counters.forEach((item, i) => {
  refs.lines[i].style.width = item.textContent;
});
