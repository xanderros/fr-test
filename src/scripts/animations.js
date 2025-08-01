import { gsap } from "gsap";
import { Timeline } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Constants
  const DURATION_FULL = window.innerHeight * 2; // Animation duration in viewport height

  // Selectors
  const section = document.querySelector(".integrations");
  if (!section) return;

  const topSection = section.querySelector(".integrations__top");
  const titleTop = section.querySelector(".integrations__title_top");
  const wordsTop = gsap.utils.toArray(
    ".integrations__title_top .integrations__title-word"
  );
  const wordsBottom = gsap.utils.toArray(
    ".integrations__title_bottom .integrations__title-word"
  );
  const cardBoxes = gsap.utils.toArray(".card__box");

  gsap.set(wordsTop, { yPercent: 0 });
  gsap.set(wordsBottom, { yPercent: -140 });

  // Main timeline for animations
  const masterTl = new Timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: `+=${DURATION_FULL}`,
      scrub: 1,
    },
  });

  masterTl
    .fromTo(
      titleTop,
      {
        y: 0,
        scale: 3,
      },
      {
        y: -200,
        scale: 1,
        duration: 4,
        ease: "power4.inOut",
      }
    )
    .to(
      wordsTop,
      {
        yPercent: 140,
        stagger: 0.15,
        ease: "power1.inOut",
        duration: 0.5,
      },
      "+=0.5"
    )
    .to(cardBoxes, {
      rotationY: 180,
      stagger: 0.3,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      wordsBottom,
      {
        yPercent: 0,
        stagger: 0.15,
        ease: "power1.inOut",
        duration: 0.5,
      },
      "-=0.3"
    );

  // Pin integration section
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${DURATION_FULL}`,
    pin: true,
    invalidateOnRefresh: true, // Recalculate on resize
  });

  // Cards long Y animation
  gsap.from(topSection, {
    yPercent: -100,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: `+=${DURATION_FULL} - 90%`,
      scrub: 1,
    },
  });
}

initAnimations();

// Refresh ScrollTrigger on load to ensure correct calculations
window.addEventListener("load", ScrollTrigger.refresh);
