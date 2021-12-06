// For Hamdurger menu
const hamburgerEl = document.querySelector('.hamburger');
const menuEl = document.querySelector('.menu');
const menuVBtnCloseEl = document.querySelector('.menu__btn-close');

hamburgerEl.addEventListener('click', () => {
  menuEl.classList.add('active');
});
menuVBtnCloseEl.addEventListener('click', () => {
  menuEl.classList.remove('active');
});

//For menu
const menuListEl = document.querySelector('.menu__list');

//Menu closes, when item is selected
menuListEl.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  menuEl.classList.remove('active');
});

//For counting percent in skills section
const countersEl = document.querySelectorAll('.skills__rating-item-counter');
const linesEl = document.querySelectorAll('.skills__rating-item-line span');

//Counting percent in skills section
countersEl.forEach((item, i) => {
  linesEl[i].style.width = item.textContent;
});

//For form in contact section
const contactFormEl = document.querySelector('.contacts__form');

//elements in contact form
let nameEl = document.getElementById('name');
let emailEl = document.getElementById('email');
let textEl = document.getElementById('text');
let checkboxEl = document.getElementById('checkbox');

//For saving data to LocalStorage and sending them to email

const formData = {};
const LOCALSTORAGE_KEY = 'data';
initForm();

contactFormEl.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  const data = JSON.stringify(formData);

  // finally save to localStorage
  localStorage.setItem(LOCALSTORAGE_KEY, data);
});

//Sending data to email
contactFormEl.addEventListener('submit', e => {
  e.preventDefault();

  formData[e.target.name] = e.target.value;

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == 'success') {
      alert(
        'Ваше сообщение успешно отправлено. Я свяжусь с Вами в ближайшее время!',
      );
      nameEl.value = '';
      emailEl.value = '';
      textEl.value = '';
      checkboxEl.checked = false;
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
      alert(
        'Ваше сообщение не отправлено! Что-то пошло не так! Попробуйте позже!',
      );
    }
  };
  xhr.send(JSON.stringify(formData));
});

function initForm() {
  // Receiving data from localStorage
  let persistedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedData) {
    persistedData = JSON.parse(persistedData);
    // If there is data, DOM is reloading
    Object.entries(persistedData).forEach(([name, value]) => {
      formData[name] = value;
      contactFormEl.elements[name].value = value;
    });
  }
}

//For scrolling up
const upEl = document.querySelector('.scroll-up');

//Scrolling up

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 1600) {
    upEl.classList.add('animate__animated', 'animate__fadeIn');
    upEl.classList.remove('animate__fadeOut');
  } else {
    upEl.classList.add('animate__fadeOut');
    upEl.classList.remove('animate__fadeIn');
  }
});

// Smooth scrolling for all links

let links = document.querySelectorAll('[href^="#"]'),
  speed = 0.2;

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
