function initCustomCursor() {
  const isDesktop = window.matchMedia(
    "(min-width: 768px) and (hover: hover)"
  ).matches;
  if (!isDesktop) return;

  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let hasMoved = false;

  const updatePosition = () => {
    const scale = cursor.classList.contains("is-active") ? 1 : 0;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${scale})`;
    requestAnimationFrame(updatePosition);
  };
  updatePosition();

  // Update cursor position on mouse move
  document.addEventListener("mousemove", (e) => {
    const halfW = cursor.offsetWidth / 2;
    const halfH = cursor.offsetHeight / 2;
    mouseX = e.clientX - halfW;
    mouseY = e.clientY - halfH;

    if (!hasMoved) {
      hasMoved = true;
      cursor.style.opacity = "1";
    }
  });

  document.querySelectorAll(".works__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("is-active");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-active");
    });
  });
}

// Initialize custom cursor
initCustomCursor();
