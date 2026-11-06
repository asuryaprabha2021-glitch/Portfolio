// SURYA PRABHA PORTFOLIO INTERACTIONS

const progressBar = document.getElementById('progressBar');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const navLinks = [
  ...document.querySelectorAll('.main-nav a[href^="#"]')
];

const sections = [
  ...document.querySelectorAll('main section[id]')
];

const cursorGlow = document.getElementById('cursorGlow');

// AUTOMATIC COPYRIGHT YEAR
document.getElementById('year').textContent =
  new Date().getFullYear();


// 1. SCROLL PROGRESS BAR

function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateProgress, {
  passive: true
});

updateProgress();


// 2. MOBILE NAVIGATION

menuToggle.addEventListener('click', () => {

  const isOpen =
    menuToggle.getAttribute('aria-expanded') === 'true';

  menuToggle.setAttribute(
    'aria-expanded',
    String(!isOpen)
  );

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Open navigation' : 'Close navigation'
  );

  mainNav.classList.toggle('open', !isOpen);

  document.body.classList.toggle('menu-open', !isOpen);

});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

navLinks.forEach(link => {

  link.addEventListener('click', () => {

    mainNav.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.setAttribute(
      'aria-label',
      'Open navigation'
    );

    document.body.classList.remove('menu-open');

  });

});


// 3. SCROLL REVEAL ANIMATIONS

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('is-visible');

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.13,
    rootMargin: '0px 0px -35px 0px'
  }
);

document.querySelectorAll('.reveal').forEach(element => {

  revealObserver.observe(element);

});


// 4. ACTIVE NAVIGATION HIGHLIGHT

const sectionObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {

          link.classList.toggle(
            'active',
            link.getAttribute('href') ===
            `#${entry.target.id}`
          );

        });

      }

    });

  },
  {
    rootMargin: '-35% 0px -55% 0px'
  }
);

sections.forEach(section => {

  sectionObserver.observe(section);

});


// 5. INTERACTIVE CURSOR GLOW

if (
  window.matchMedia('(pointer: fine)').matches &&
  cursorGlow
) {

  window.addEventListener('pointermove', event => {

    cursorGlow.style.left = `${event.clientX}px`;

    cursorGlow.style.top = `${event.clientY}px`;

    cursorGlow.style.opacity = '1';

  }, {
    passive: true
  });

  document.addEventListener('pointerleave', () => {

    cursorGlow.style.opacity = '0';

  });

}


// 6. MAGNETIC BUTTON HOVER EFFECT

document.querySelectorAll('.magnetic').forEach(button => {

  button.addEventListener('pointermove', event => {

    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = button.getBoundingClientRect();

    const x =
      (event.clientX - rect.left - rect.width / 2) * 0.08;

    const y =
      (event.clientY - rect.top - rect.height / 2) * 0.12;

    button.style.transform =
      `translate(${x}px, ${y - 3}px)`;

  });

  button.addEventListener('pointerleave', () => {

    button.style.transform = '';

  });

});


// 7. PAUSE MOVING TEXT ON HOVER

const marquee = document.querySelector('.strip-track');

if (marquee) {

  marquee.addEventListener('mouseenter', () => {

    marquee.style.animationPlayState = 'paused';

  });

  marquee.addEventListener('mouseleave', () => {

    marquee.style.animationPlayState = 'running';

  });

  marquee.addEventListener('focusin', () => {

    marquee.style.animationPlayState = 'paused';

  });

  marquee.addEventListener('focusout', () => {

    marquee.style.animationPlayState = 'running';

  });

}