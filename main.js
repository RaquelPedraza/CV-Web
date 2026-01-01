/* =========================================
   VARIABLES
   ========================================= */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

/* =========================================
   1. LÓGICA DE COLOR (SOLO SCROLL)
   ========================================= */
function updateNavbarState() {
  // Si bajamos más de 100px, activamos el fondo azul
  const isScrolled = window.scrollY > 100;

  if (isScrolled) {
    navbar.style.backgroundColor = "var(--primary-color)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
  }
}

// Escuchamos el scroll para cambiar el color
window.addEventListener("scroll", updateNavbarState);

/* =========================================
   2. TOGGLE MENÚ HAMBURGUESA
   ========================================= */
function toggleMenu() {
  // Añadimos o quitamos la clase .active para mostrar/ocultar el menú
  navLinks.classList.toggle("active");
}

// Si aumentamos el tamaño de pantalla con el menú abierto,
// cerramos el menú para evitar fallos visuales
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
  }
  updateNavbarState(); // Recalculamos el color por si acaso
});

/* =========================================
   3. OBSERVER (Detector de sección activa)
   ========================================= */
const observerOptions = {
  root: null, // Marco de referencia (viewport)
  rootMargin: "-45% 0px -45% 0px", // Línea central de meta
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Apagamos todos los enlaces primero
      navItems.forEach((link) => link.classList.remove("active-link"));

      // Buscamos qué sección es y el enlace correspondiente
      const activeId = entry.target.getAttribute("id");
      const activeLink = document.querySelector(
        `.nav-links a[href="#${activeId}"]`
      );

      // Encendemos el enlace activo
      if (activeLink) {
        activeLink.classList.add("active-link");
      }
    }
  });
}, observerOptions);

// Mandamos al observador a vigilar cada una de las secciones
sections.forEach((section) => observer.observe(section));

/* =========================================
   4. CERRAR MENÚ AL CLICAR FUERA
   ========================================= */
document.addEventListener("click", (e) => {
  // Comprobamos si el menú está abierto primero
  if (navLinks.classList.contains("active")) {
    // Si el clic no ocurrió dentro del menú y tampoco en el botón hamburguesa
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      // Entonces cerramos el menú
      navLinks.classList.remove("active");
    }
  }
});
