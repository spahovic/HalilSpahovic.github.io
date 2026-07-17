// ============================================================
// script.js — Halil Spahovic Portfolio
// ============================================================


// ============================================================
// DARK / LIGHT MODE TOGGLE
// Speichert die Wahl des Users im localStorage,
// damit er beim nächsten Besuch noch gilt.
// ============================================================

const themeToggle = document.getElementById('themeToggle');

function getPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  if (!themeToggle) return;

  const sun = themeToggle.querySelector('.icon-sun');
  const moon = themeToggle.querySelector('.icon-moon');

  if (theme === 'dark') {
    sun.style.display = 'none';
    moon.style.display = 'block';
  } else {
    sun.style.display = 'block';
    moon.style.display = 'none';
  }
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || getPreferredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcons(initialTheme);

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}


// ============================================================
// HAMBURGER MENÜ (Mobile)
// Klappt die Navigation auf kleinen Bildschirmen auf
// ============================================================

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (!hamburger || !mobileMenu) return;

  mobileMenu.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-label', 'Menü öffnen');
}

function openMobileMenu() {
  if (!hamburger || !mobileMenu) return;

  mobileMenu.classList.add('is-open');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-label', 'Menü schließen');
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });
}


// ============================================================
// SCROLL REVEAL ANIMATION
// Elemente werden sichtbar wenn man zu ihnen scrollt.
// Nutzt IntersectionObserver — kein jQuery nötig.
// ============================================================

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length === 0) {
  // Keine versteckten Elemente vorhanden.
} else if (!('IntersectionObserver' in window)) {
  revealElements.forEach(function (el) {
    el.classList.add('is-visible');
  });
} else {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  // Jeden Element mit .reveal beobachten, mit leichtem Versatz
  revealElements.forEach(function (el, index) {
    // Jedes Element kommt etwas später als das vorherige (max. 3 Stufen)
    const delay = (index % 3) * 80;
    el.style.transitionDelay = delay + 'ms';
    observer.observe(el);
  });
}