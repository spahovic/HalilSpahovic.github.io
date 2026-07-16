// ============================================================
// script.js — Halil Spahovic Portfolio
// ============================================================


// ============================================================
// DARK / LIGHT MODE TOGGLE
// Speichert die Wahl des Users im localStorage,
// damit er beim nächsten Besuch noch gilt.
// ============================================================

var themeToggle = document.getElementById('themeToggle');

// Beim Laden der Seite: gespeichertes Theme anwenden
var savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);
}

// Klick auf den Toggle-Button
themeToggle.addEventListener('click', function() {
  // Aktuelles Theme rausfinden
  var currentTheme = document.documentElement.getAttribute('data-theme');

  // Wenn noch kein data-theme gesetzt ist, System-Einstellung prüfen
  if (!currentTheme) {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
  }

  // Umschalten
  var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Anwenden und speichern
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
});

// Sonne/Mond-Icons aktualisieren
function updateThemeIcons(theme) {
  var sun  = themeToggle.querySelector('.icon-sun');
  var moon = themeToggle.querySelector('.icon-moon');

  if (theme === 'dark') {
    sun.style.display  = 'none';
    moon.style.display = 'block';
  } else {
    sun.style.display  = 'block';
    moon.style.display = 'none';
  }
}


// ============================================================
// HAMBURGER MENÜ (Mobile)
// Klappt die Navigation auf kleinen Bildschirmen auf
// ============================================================

var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  // Ist das Menü gerade offen?
  var isOpen = mobileMenu.classList.contains('is-open');

  if (isOpen) {
    // Schließen
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  } else {
    // Öffnen
    mobileMenu.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }
});

// Menü schließen wenn ein Link geklickt wird
var mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});


// ============================================================
// SCROLL REVEAL ANIMATION
// Elemente werden sichtbar wenn man zu ihnen scrollt.
// Nutzt IntersectionObserver — kein jQuery nötig.
// ============================================================

var revealElements = document.querySelectorAll('.reveal');

// Wenn der Browser IntersectionObserver nicht unterstützt,
// einfach alle Elemente sofort anzeigen
if (!('IntersectionObserver' in window)) {
  revealElements.forEach(function(el) {
    el.classList.add('is-visible');
  });
} else {
  // Observer erstellt: reagiert wenn ein Element ins Sichtfeld kommt
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Element ins Sichtfeld gekommen: einblenden
        entry.target.classList.add('is-visible');
        // Nicht mehr beobachten (Animation soll nur einmal laufen)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,       // 12% des Elements muss sichtbar sein
    rootMargin: '0px 0px -30px 0px'  // etwas früher triggern
  });

  // Jeden Element mit .reveal beobachten, mit leichtem Versatz
  revealElements.forEach(function(el, index) {
    // Jedes Element kommt etwas später als das vorherige (max. 3 Stufen)
    var delay = (index % 3) * 80;
    el.style.transitionDelay = delay + 'ms';
    observer.observe(el);
  });
}