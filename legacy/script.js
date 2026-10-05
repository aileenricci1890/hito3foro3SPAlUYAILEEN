/* ============ MENÚ MÓVIL ============ */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ============ NAV ACTIVA SEGÚN EL SCROLL ============ */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "inicio";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

/* ============ FILTRO DEL MENÚ ============ */
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    const filter = button.dataset.filter;

    menuCards.forEach(card => {
      const category = card.dataset.category;
      const visible = filter === "todos" || category === filter;
      card.style.display = visible ? "flex" : "none";
    });
  });
});

/*
  QUITADO: el bloque "WHATSAPP" que abría wa.me directo al tocar
  .order-btn / .add-btn con solo el nombre del producto.
  Ahora esos mismos botones abren el modal de detalles y el
  carrito (ver cart.js), que arma un mensaje de WhatsApp con
  todos los productos, cantidades y el total. Se deja aquí
  comentado por si alguna vez quieres volver a esa versión simple:

  const WHATSAPP_NUMBER = "59170700000";
  const orderButtons = document.querySelectorAll(".order-btn, .add-btn");
  orderButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product || "Pedido general";
      const message = encodeURIComponent(
        `Hola Cochala Bistro 👋\nQuiero hacer un pedido:\n\n${product}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      showToast(`Pedido enviado: ${product}`);
    });
  });
*/

/* ============ TOAST / NOTIFICACIÓN ============ */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ============ ANIMACIÓN DE BOTONES ============ */
document.querySelectorAll("button, .btn, .category-card").forEach(element => {
  element.addEventListener("click", () => {
    element.style.transform = "scale(.98)";
    setTimeout(() => { element.style.transform = ""; }, 120);
  });
});

/* ============ CARRUSELES DE COCHABAMBA ============ */
class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.slides = [...this.track.children];
    this.dotsWrap = root.querySelector(".carousel-dots");
    this.index = 0;
    this.timer = null;

    this.buildDots();
    this.bindControls();
    this.start();
  }

  buildDots() {
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Ir a la foto ${i + 1}`);
      dot.addEventListener("click", () => this.goTo(i));
      this.dotsWrap.appendChild(dot);
    });

    this.dots = [...this.dotsWrap.children];
  }

  goTo(i) {
    this.index = (i + this.slides.length) % this.slides.length;
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots.forEach((dot, idx) => dot.classList.toggle("active", idx === this.index));
  }

  next() { this.goTo(this.index + 1); }
  prev() { this.goTo(this.index - 1); }

  bindControls() {
    this.root.querySelector(".carousel-next")?.addEventListener("click", () => {
      this.next();
      this.start();
    });

    this.root.querySelector(".carousel-prev")?.addEventListener("click", () => {
      this.prev();
      this.start();
    });

    this.root.addEventListener("mouseenter", () => this.stop());
    this.root.addEventListener("mouseleave", () => this.start());
  }

  start() {
    this.stop();
    this.timer = setInterval(() => this.next(), 4000);
  }

  stop() {
    clearInterval(this.timer);
  }
}

document.querySelectorAll(".carousel").forEach(el => new Carousel(el));