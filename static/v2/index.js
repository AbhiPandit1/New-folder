document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------
  // 1. Accordion toggle (e.g., for price card)
  // -------------------------------------------
  window.toggleAccordion = function (index) {
    // Make sure elements actually exist:
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    if (!content || !icon) return;

    const isHidden = content.classList.contains("hidden");

    // Close all open accordions
    document
      .querySelectorAll('[id^="content-"]')
      .forEach((c) => c.classList.add("hidden"));
    document
      .querySelectorAll('[id^="icon-"]')
      .forEach((i) => i.classList.remove("rotate-180"));

    // Toggle the accordion for the clicked item
    if (isHidden) {
      content.classList.remove("hidden");
      icon.classList.add("rotate-180");
    }
  };

  // -------------------------------------------
  // 2. Main initialization: navbar & slider
  // -------------------------------------------
  function initializeNavbarAndSlider() {
    // Try registering GSAP & ScrollTrigger (if they exist)
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Navbar toggling for mobile menu
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    let isOpen = false;
    if (menuBtn && menu && typeof gsap !== "undefined") {
      menuBtn.addEventListener("click", () => {
        if (!isOpen) {
          menu.classList.remove("gsap-hidden");
          gsap.fromTo(
            menu,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        } else {
          gsap.to(menu, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => menu.classList.add("gsap-hidden"),
          });
        }
        isOpen = !isOpen;
      });
    }


    // -------------------------------------------
    // Slider functionality (right-to-left effect)
    // -------------------------------------------
    const slides = document.querySelectorAll(".slide");
    if (!slides || slides.length === 0) {
      // No slides found, so don't proceed
      return;
    }

    let currentSlide = 0;
    // Initialize slides: show only the first slide
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.visibility = "hidden";
        slide.style.opacity = "0";
      }
    });

    function showSlide(newIndex) {
      if (newIndex === currentSlide) return; // No change if same slide

      const outgoing = slides[currentSlide];
      const incoming = slides[newIndex];

      if (typeof gsap === "undefined") {
        // Fallback if GSAP is unavailable:
        outgoing.style.visibility = "hidden";
        outgoing.style.opacity = 0;
        incoming.style.visibility = "visible";
        incoming.style.opacity = 1;
      } else {
        // Animate the outgoing slide to the left
        gsap.to(outgoing, {
          duration: 0.5,
          x: "-100%",
          opacity: 0,
          ease: "power2.out",
          onComplete: () => {
            outgoing.style.visibility = "hidden";
            gsap.set(outgoing, { x: 0 });
          },
        });

        // Prepare the incoming slide off-screen on the right
        gsap.set(incoming, { visibility: "visible", x: "100%", opacity: 1 });
        // Animate it into view
        gsap.to(incoming, {
          duration: 0.5,
          x: "0%",
          opacity: 1,
          ease: "power2.out",
        });
      }

      currentSlide = newIndex;
    }

    // Attach slider button events
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
      });
    }

    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
      });
    }

    // Auto-advance slides every 6 seconds
    setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }, 6000);
  }

  // Initialize everything
  initializeNavbarAndSlider();

  // Optional: confirm no errors in the console
  console.log(
    "Script initialized: DOMContentLoaded + initializeNavbarAndSlider"
  );
});
