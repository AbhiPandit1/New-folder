document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // 1) Accordion Logic
  // -------------------------------
  // (for a price card or similar)
  window.toggleAccordion = function (index) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    const isHidden = content.classList.contains("hidden");

    // Close all open accordions
    document
      .querySelectorAll('[id^="content-"]')
      .forEach((c) => c.classList.add("hidden"));
    document
      .querySelectorAll('[id^="icon-"]')
      .forEach((i) => i.classList.remove("rotate-180"));

    // Toggle current accordion content
    if (isHidden) {
      content.classList.remove("hidden");
      icon.classList.add("rotate-180");
    }
  };

  // -------------------------------
  // 2) Initialize Navbar & Slider (original GSAP code)
  // -------------------------------
  function initializeNavbarAndSlider() {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Navbar toggling for mobile menu
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    let isOpen = false;
    if (menuBtn && menu) {
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

    // Desktop dropdown
    const userBtn = document.getElementById("user-btn");
    const dropdown = document.getElementById("dropdown");
    userBtn?.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });

    // Mobile dropdown
    const userBtnMobile = document.getElementById("user-btn-mobile");
    const dropdownMobile = document.getElementById("dropdown-mobile");
    userBtnMobile?.addEventListener("click", () => {
      dropdownMobile.classList.toggle("hidden");
    });

    // Close dropdowns on an outside click
    document.addEventListener("click", (e) => {
      if (!userBtn?.contains(e.target) && !dropdown?.contains(e.target)) {
        dropdown?.classList.add("hidden");
      }
      if (
        !userBtnMobile?.contains(e.target) &&
        !dropdownMobile?.contains(e.target)
      ) {
        dropdownMobile?.classList.add("hidden");
      }
    });

    // -------------------------------
    // Slider functionality with slide effect (right-to-left) using GSAP
    // -------------------------------
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Hide all slides except the first
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.visibility = "hidden";
        slide.style.opacity = "0";
      }
    });

    function showSlide(newIndex) {
      if (newIndex === currentSlide) return; // no change

      const outgoing = slides[currentSlide];
      const incoming = slides[newIndex];

      // Animate outgoing (slide left)
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

      // Prepare incoming off-screen right
      gsap.set(incoming, { visibility: "visible", x: "100%", opacity: 1 });

      // Animate incoming
      gsap.to(incoming, {
        duration: 0.5,
        x: "0%",
        opacity: 1,
        ease: "power2.out",
      });

      currentSlide = newIndex;
    }

    // Slider nav buttons
    document.getElementById("nextBtn")?.addEventListener("click", () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    });

    document.getElementById("prevBtn")?.addEventListener("click", () => {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    });

    // Auto-advance every 6s
    setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }, 6000);
  }

  // Call it after DOM is loaded
  initializeNavbarAndSlider();

  // -------------------------------
  // 3) Set Current Year
  // -------------------------------
  // (If you want to guarantee it runs after DOM is ready)
  const elem = document.getElementById("year");
  if (elem) {
    elem.textContent = new Date().getFullYear();
  }

  // -------------------------------
  // 4) Additional Dropdown Logic
  // (same toggles but using scale-95/scale-100, etc.)
  // -------------------------------
  const userBtn2 = document.getElementById("user-btn");
  const dropdown2 = document.getElementById("dropdown");
  userBtn2?.addEventListener("click", () => {
    dropdown2?.classList.toggle("hidden");
    dropdown2?.classList.toggle("scale-95");
    dropdown2?.classList.toggle("scale-100");
  });

  const userBtnMobile2 = document.getElementById("user-btn-mobile");
  const dropdownMobile2 = document.getElementById("dropdown-mobile");
  userBtnMobile2?.addEventListener("click", () => {
    dropdownMobile2?.classList.toggle("hidden");
    dropdownMobile2?.classList.toggle("scale-95");
    dropdownMobile2?.classList.toggle("scale-100");
  });

  document.addEventListener("click", (e) => {
    if (!userBtn2?.contains(e.target) && !dropdown2?.contains(e.target)) {
      dropdown2?.classList.add("hidden");
      dropdown2?.classList.remove("scale-100");
      dropdown2?.classList.add("scale-95");
    }
    if (
      !userBtnMobile2?.contains(e.target) &&
      !dropdownMobile2?.contains(e.target)
    ) {
      dropdownMobile2?.classList.add("hidden");
      dropdownMobile2?.classList.remove("scale-100");
      dropdownMobile2?.classList.add("scale-95");
    }
  });

  // -------------------------------
  // 5) Sponsor Slider Cloning Logic (partners-slider)
  // -------------------------------
  const slideTrack = document.querySelector(
    ".partners-slider .partners-slide-track"
  );
  if (slideTrack) {
    const slides2 = Array.from(slideTrack.querySelectorAll(".partners-slide"));
    const count = slides2.length;

    if (count >= 4) {
      // For 3+ sponsors, clone 3 times
      for (let i = 0; i < 3; i++) {
        slides2.forEach((slide) =>
          slideTrack.appendChild(slide.cloneNode(true))
        );
      }
    } else {
      // If fewer sponsors, center and no animation
      slideTrack.style.justifyContent = "center";
      slideTrack.style.animation = "none";
    }
  }

  // -------------------------------
  // 6) Modal Logic for Photo
  // -------------------------------
  const photoModal = document.getElementById("photoModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalPhotoImage = document.getElementById("modalPhotoImage");
  const modalPhotographer = document.getElementById("modalPhotographer");
  const modalPhotoId = document.getElementById("modalPhotoId");
  const modalProductType = document.getElementById("modalProductType");

  function openPhotoModal({
    imageSrc,
    photographerName,
    photoId,
    productTypes,
  }) {
    modalPhotoImage.src = imageSrc;
    modalPhotographer.textContent = `Photographer: ${photographerName}`;
    modalPhotoId.value = photoId;

    modalProductType.innerHTML = "";
    productTypes.forEach((pt) => {
      const opt = document.createElement("option");
      opt.value = pt.id;
      opt.textContent = `${pt.format} - ${pt.price} €`;
      modalProductType.appendChild(opt);
    });

    photoModal?.classList.remove("hidden");
  }
  // Expose globally for inline onclick usage
  window.openPhotoModal = openPhotoModal;

  closeModalBtn?.addEventListener("click", () => {
    photoModal?.classList.add("hidden");
  });
});
