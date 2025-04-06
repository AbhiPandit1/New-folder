// Load HTML component into a container by ID
async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Function to toggle accordion (for price card or similar component)
window.toggleAccordion = function (index) {
  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);

  const isHidden = content.classList.contains('hidden');

  // Close all open accordions
  document
    .querySelectorAll('[id^="content-"]')
    .forEach((c) => c.classList.add('hidden'));

  document
    .querySelectorAll('[id^="icon-"]')
    .forEach((i) => i.classList.remove('rotate-180'));

  // Toggle current
  if (isHidden) {
    content.classList.remove('hidden');
    icon.classList.add('rotate-180');
  }
};

// Navbar and slider initialization logic
function initializeNavbarAndSlider() {
  gsap.registerPlugin(ScrollTrigger);

  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  let isOpen = false;

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      if (!isOpen) {
        menu.classList.remove('gsap-hidden');
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
          onComplete: () => menu.classList.add('gsap-hidden'),
        });
      }
      isOpen = !isOpen;
    });
  }

  // Desktop dropdown
  const userBtn = document.getElementById('user-btn');
  const dropdown = document.getElementById('dropdown');
  userBtn?.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  // Mobile dropdown
  const userBtnMobile = document.getElementById('user-btn-mobile');
  const dropdownMobile = document.getElementById('dropdown-mobile');
  userBtnMobile?.addEventListener('click', () => {
    dropdownMobile.classList.toggle('hidden');
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!userBtn?.contains(e.target) && !dropdown?.contains(e.target)) {
      dropdown?.classList.add('hidden');
    }
    if (
      !userBtnMobile?.contains(e.target) &&
      !dropdownMobile?.contains(e.target)
    ) {
      dropdownMobile?.classList.add('hidden');
    }
  });

  // Slider functionality
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.visibility = i === index ? 'visible' : 'hidden';
    });
  }

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 6000);
}

// Initial load
window.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('navbar-container', '../components/navbar.html');
  await loadComponent('slider-container', '../components/slider.html');
  await loadComponent('research-input', '../components/researchInput.html');
  await loadComponent('blog-card', '../components/blogCard.html');
  await loadComponent('price-card', '../components/priceCard.html');
  await loadComponent('about', '../components/about.html');
  await loadComponent('contact', '../components/contact.html');
  await loadComponent('footer', '../components/footer.html');

  // Delay init slightly to ensure HTML content is loaded
  setTimeout(initializeNavbarAndSlider, 200);
});
