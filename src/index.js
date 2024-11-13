import "./styles.css";

// burger
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const burgerMenu = document.querySelector(".burger__menu");
  const body = document.body;

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    burger.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });
});

// slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".slide__nav-prev");
  const nextButton = document.querySelector(".slide__nav-next");
  const sliderContainer = document.querySelector(".slider__container");
  let currentIndex = 0;
  let isDragging = false;
  let startX, currentX;

  function updateSlidePosition() {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${currentIndex * -100}%)`;
    });
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  });

  sliderContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    currentX = startX;
    sliderContainer.style.cursor = "grabbing";
  });

  sliderContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.pageX;
    const distance = currentX - startX;
    const translateX =
      currentIndex * -100 + (distance / sliderContainer.offsetWidth) * 100;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${translateX}%)`;
    });
  });

  sliderContainer.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    const distance = currentX - startX;
    if (Math.abs(distance) > sliderContainer.offsetWidth / 4) {
      if (distance > 0) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
      }
    }
    updateSlidePosition();
  });

  sliderContainer.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    updateSlidePosition();
  });

  // Добавляем обработчики событий для свайпов на тач-устройствах
  sliderContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    currentX = startX;
    sliderContainer.style.cursor = "grabbing";
  });

  sliderContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].pageX;
    const distance = currentX - startX;
    const translateX =
      currentIndex * -100 + (distance / sliderContainer.offsetWidth) * 100;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${translateX}%)`;
    });
  });

  sliderContainer.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    const distance = currentX - startX;
    if (Math.abs(distance) > sliderContainer.offsetWidth / 4) {
      if (distance > 0) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
      }
    }
    updateSlidePosition();
  });

  sliderContainer.addEventListener("touchcancel", () => {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.cursor = "grab";
    updateSlidePosition();
  });

  // Изначально устанавливаем все слайды на 0%
  slides.forEach((slide) => {
    slide.style.transform = `translateX(0%)`;
  });

  updateSlidePosition();
});
