var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  slidesOffsetBefore:
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--team-active-slide-width"
      )
    ) / 2,
  on: {
    slideChangeTransitionEnd: function () {
      this.update();
    },
  },
});
