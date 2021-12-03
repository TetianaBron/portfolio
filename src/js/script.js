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
};

//elements in contact form
let naming = document.getElementById('naming');
let email = document.getElementById('email');
let text = document.getElementById('text');

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
      alert('Email sent');
      naming.value = '';
      email.value = '';
      text.value = '';
    } else {
      alert('Something went wrong');
    }
  };
  xhr.send(JSON.stringify(formData));
});
