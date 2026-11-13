//スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    var offset = 64;
    var speed = 500;
    var id = this.getAttribute("href");
    var target = document.querySelector(id === "#" ? "html" : id);
    var position = target.offsetTop - offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  });
});

//header hamburger button
const body = document.body;
const hamburgerButton = document.querySelector("#js-hamburger-button");
const drawer = document.querySelector("#js-drawer");
const drawerLinks = document.querySelectorAll('#js-drawer-nav a[href^="#"]');

if (hamburgerButton) {
  hamburgerButton.addEventListener("click", function (event) {
    event.preventDefault();
    this.classList.toggle("active");
    drawer.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });
}

drawerLinks.forEach(function (drawerLink) {
  drawerLink.addEventListener("click", function (event) {
    hamburgerButton.classList.remove("active");
    drawer.classList.remove("active");
    body.classList.remove("no-scroll");
  });
});

// about swiper
const aboutSwiperWrap = document.querySelector("#js-about-swiper-wrap");
const aboutSwiperSlides = aboutSwiperWrap.querySelectorAll(
  ".about__swiper__slide"
);

function cloneAndAppend(element, swiperWrap) {
  let clonedElement = element.cloneNode(true);
  swiperWrap.appendChild(clonedElement);
}
for (let aboutSwiperSlide of aboutSwiperSlides) {
  cloneAndAppend(aboutSwiperSlide, aboutSwiperWrap);
}

// スライダーオプション
const aboutSwiper = new Swiper("#js-about-swiper", {
  loop: true,
  width: 100,
  loopedSlides: 10, // ループするスライドの枚数(総スライド数は2倍に設定する)
  spaceBetween: 10,
  speed: 3000,
  keyboard: true,
  // allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  breakpoints: {
    960: {
      spaceBetween: 20,
      width: 200,
    },
  },
});

//prizes modal
const modalOpen1 = document.querySelector("#js-prizes-card-1");
const modal1 = document.querySelector("#js-prizes-modal-1");
const modalClose1 = document.querySelector("#js-prizes-modal-button-1");
setupModal(modalOpen1, modal1, modalClose1);
const modalOpen2 = document.querySelector("#js-prizes-card-2");
const modal2 = document.querySelector("#js-prizes-modal-2");
const modalClose2 = document.querySelector("#js-prizes-modal-button-2");
setupModal(modalOpen2, modal2, modalClose2);
const modalOpen3 = document.querySelector("#js-prizes-card-3");
const modal3 = document.querySelector("#js-prizes-modal-3");
const modalClose3 = document.querySelector("#js-prizes-modal-button-3");
setupModal(modalOpen3, modal3, modalClose3);
const modalOpen4 = document.querySelector("#js-prizes-card-4");
const modal4 = document.querySelector("#js-prizes-modal-4");
const modalClose4 = document.querySelector("#js-prizes-modal-button-4");
setupModal(modalOpen4, modal4, modalClose4);
const modalOpen5 = document.querySelector("#js-prizes-card-5");
const modal5 = document.querySelector("#js-prizes-modal-5");
const modalClose5 = document.querySelector("#js-prizes-modal-button-5");
setupModal(modalOpen5, modal5, modalClose5);

function setupModal(modalOpen, modal, modalClose) {
  modalOpen.addEventListener("click", function (event) {
    event.preventDefault();
    modal.showModal();
    body.classList.add("no-scroll");
  });

  modalClose.addEventListener("click", function (event) {
    event.preventDefault();
    modal.close();
    body.classList.remove("no-scroll");
  });
}

// spots swiper
const spotsSwiperWrap = document.querySelector("#js-spots-swiper-wrap");
const spotsSwiperSlides = spotsSwiperWrap.querySelectorAll(".swiper-slide");

function cloneAndAppend(element, swiperWrap) {
  let clonedElement = element.cloneNode(true);
  swiperWrap.appendChild(clonedElement);
}
for (let spotsSwiperSlide of spotsSwiperSlides) {
  cloneAndAppend(spotsSwiperSlide, spotsSwiperWrap);
}

// スライダーオプション
const spotsSwiper = new Swiper("#js-spots-swiper", {
  loop: true,
  spaceBetween: 16,
  slidesPerView: "auto",
  centeredSlides: true,
  keyboard: true,
  navigation: {
    nextEl: "#js-spots-next",
    prevEl: "#js-spots-prev",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    960: {
      spaceBetween: 32, // スライド間余白
      centeredSlides: false, // アクティブなスライドを中央
    },
  },
});

//fqa accordion
jQuery(".js-accordion").on("click", function (event) {
  event.preventDefault();
  if (jQuery(this).parent().hasClass("active")) {
    jQuery(this).parent().removeClass("active");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("active");
    jQuery(this).next().slideDown();
  }
});

// form validate

const form = document.querySelector("#form");
const inputElements = form.querySelectorAll(".js-form-input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  inputElements.forEach(function (inputElement) {
    inputElement.classList.remove("is-error");
  });

  const isValid = form.checkValidity();
  if (isValid) {
    alert("送信完了");
    form.reset();
  }
});

inputElements.forEach(function (inputElement) {
  inputElement.addEventListener("invalid", function () {
    this.classList.add("is-error");
  });

  inputElement.addEventListener("input", function () {
    if (this.checkValidity()) {
      this.classList.remove("is-error");
    }
  });
});

//page top
const pageTop = document.querySelector("#js-page-top");
window.addEventListener("scroll", function (event) {
  event.preventDefault();
  if (300 < this.window.scrollY) {
    pageTop.classList.add("show");
  } else {
    pageTop.classList.remove("show");
  }
});
