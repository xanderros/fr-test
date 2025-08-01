const BREAKPOINTS = {
  DESKTOP: 768,
};

const TIMINGS = {
  HOVER_DELAY: 200,
  RESIZE_DEBOUNCE: 250,
};

// Track initialized accordions to prevent memory leaks
const initializedAccordions = new WeakSet();

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// Utility for debouncing functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to initialize accordion
function initAccordion(accordion) {
  // Prevent re-initialization
  if (initializedAccordions.has(accordion)) {
    return;
  }

  const accordionItems = accordion.querySelectorAll(".js-accordion__item");

  if (!accordionItems.length) return;

  // Activate first item by default
  accordionItems[0].classList.add("is-active");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".js-accordion__header");

    let timeoutId;

    const openItem = () => {
      // Close all open items only in current accordion
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-active");
        }
      });
      item.classList.add("is-active");
    };

    if (isTouchDevice) {
      header.addEventListener("click", () => {
        if (item.classList.contains("is-active")) {
          item.classList.remove("is-active");
        } else {
          openItem();
        }
      });
    } else {
      header.addEventListener("mouseenter", () => {
        timeoutId = setTimeout(() => {
          openItem();
        }, TIMINGS.HOVER_DELAY);
      });

      header.addEventListener("mouseleave", () => {
        clearTimeout(timeoutId);
      });
    }
  });

  // Mark accordion as initialized
  initializedAccordions.add(accordion);
}

// Check screen width and initialize accordions
function checkAndInitAccordions() {
  // Critical fix #3: Fixed logical boundary inconsistency
  if (window.innerWidth >= BREAKPOINTS.DESKTOP) {
    document.querySelectorAll(".js-accordion").forEach((accordion) => {
      initAccordion(accordion);
    });
  }
}

// Initialize on load
checkAndInitAccordions();

// Window resize handler with debounce
const handleResize = debounce(() => {
  if (window.innerWidth < BREAKPOINTS.DESKTOP) {
    // On mobile - deactivate all accordions
    document.querySelectorAll(".js-accordion__item").forEach((item) => {
      item.classList.remove("is-active");
    });
  } else {
    // When increasing screen size, initialize accordions
    checkAndInitAccordions();
  }
}, TIMINGS.RESIZE_DEBOUNCE);

window.addEventListener("resize", handleResize);
