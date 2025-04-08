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

  const userBtn = document.getElementById('user-btn');
  const dropdown = document.getElementById('dropdown');
  userBtn?.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  const userBtnMobile = document.getElementById('user-btn-mobile');
  const dropdownMobile = document.getElementById('dropdown-mobile');
  userBtnMobile?.addEventListener('click', () => {
    dropdownMobile.classList.toggle('hidden');
  });

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

  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
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

// ✅ Logo rendering function
function initializeLogoSection() {
  const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
  ];

  const logoContainer = document.getElementById('logoContainer');
  if (!logoContainer) return;

  const wrapper = document.createElement('div');
  wrapper.className =
    logos.length > 4
      ? 'flex items-center space-x-20 animate-marquee relative z-20'
      : 'flex flex-wrap justify-center items-center gap-10 relative z-20';

  logos.forEach((logo) => {
    const img = document.createElement('img');
    img.src = logo;
    img.alt = 'Logo';
    img.className =
      'h-24 w-24 object-contain bg-white p-2 rounded-full shadow-xl';
    wrapper.appendChild(img);
  });

  logoContainer.appendChild(wrapper);
}

// ✅ Inject CSS for marquee animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
    white-space: nowrap;
  }
`;
document.head.appendChild(style);

// ✅ DOM Ready: Load and Init
window.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('navbar', '../components/navbar.html');
  await loadComponent('slider-container', '../components/eventPageMain.html');
  await loadComponent('blog-card', '../components/blogCard.html');
  await loadComponent('footer', '../components/footer.html');

  setTimeout(() => {
    initializeNavbarAndSlider();
    initializeLogoSection(); // 👈 Our new function
  }, 200);
});
