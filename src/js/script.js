const refs = {
  //Hamdurger menu
  hamburger: document.querySelector('.hamburger'),
  menu: document.querySelector('.menu'),
  menuVBtnClose: document.querySelector('.menu__btn-close'),
  menuList: document.querySelector('.menu__list'),
  //Counting percent in skills section
  counters: document.querySelectorAll('.skills__rating-item-counter'),
  lines: document.querySelectorAll('.skills__rating-item-line span'),
  //For sending data to email
  contactForm: document.querySelector('.contacts__form'),
  //For scrolling up
  upElem: document.querySelector('.scroll-up'),
};

//elements in contact form
let naming = document.getElementById('naming');
let email = document.getElementById('email');
let text = document.getElementById('text');
let checkbox = document.getElementById('checkbox');

refs.hamburger.addEventListener('click', () => {
  refs.menu.classList.add('active');
});
refs.menuVBtnClose.addEventListener('click', () => {
  refs.menu.classList.remove('active');
});

//menu closes, when item is selected
refs.menuList.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  refs.menu.classList.remove('active');
});

refs.counters.forEach((item, i) => {
  refs.lines[i].style.width = item.textContent;
});

//sending data to email
refs.contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let formData = {
    naming: naming.value,
    email: email.value,
    text: text.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == 'success') {
      alert(
        'Ваше сообщение успешно отправлено. Я свяжусь с Вами в ближайшее время!',
      );
      naming.value = '';
      email.value = '';
      text.value = '';
      checkbox.checked = false;
    } else {
      alert(
        'Ваше сообщение не отправлено! Что-то пошло не так! Попробуйте позже!',
      );
    }
  };
  xhr.send(JSON.stringify(formData));
});

//scrolling up

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 1600) {
    refs.upElem.classList.add('animate__animated', 'animate__fadeIn');
    refs.upElem.classList.remove('animate__fadeOut');
  } else {
    refs.upElem.classList.add('animate__fadeOut');
    refs.upElem.classList.remove('animate__fadeIn');
  }
});

// Smooth scrolling for all links

let links = document.querySelectorAll('[href^="#"]'),
  speed = 0.3;

links.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    let widthTop = document.documentElement.scrollTop,
      hash = this.hash,
      toBlock = document.querySelector(hash).getBoundingClientRect().top,
      start = null;

    requestAnimationFrame(step);

    function step(time) {
      if (start === null) {
        start = time;
      }

      let progress = time - start,
        r =
          toBlock < 0
            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock);

      document.documentElement.scrollTo(0, r);

      if (r != widthTop + toBlock) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash;
      }
    }
  });
});

//For init wow.js lib
new WOW().init();
