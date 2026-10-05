/* =========================================================
   COCHALA BISTRO — Modal de detalles + Carrito + WhatsApp
   Archivo aparte para no chocar con tu script.js actual.
   IMPORTANTE: si tu script.js ya tiene un listener para
   .order-btn que redirige directo a WhatsApp, quítalo (o
   dímelo) para que no se dispare junto con este modal.
   ========================================================= */

(function () {
  "use strict";

  // Número de WhatsApp del negocio (código de país 591 + número).
  // Ajusta este número si el real es otro.
  var WHATSAPP_NUMBER = "59170700000";

  // ---------- Catálogo: precio, imagen y descripción de cada producto ----------
  var PRODUCTS = {
    "Pique Macho": {
      price: 25,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdf6hBJkWqggSkEPhd0JE9tW8vvNpjhIRo4JhoOYq1OsqgCKffZ1xlbGntPD25Qf24fOr1nWtUHgCcgV8d6aAmAPVxY-iVlFUelBRSlNoOnXpR_frGUHrZGrRJXSa7u5H7v-QByTj73luX9O5ama7JdIPsnTtguy7wnhALP032vYzROaFusnrKm9EfLPyC6SNS0XBjdFHiDQ6ZDA-65uaLSwbccF2QSG2If2AuWOV8iv8cz6T8gDlsvg",
      desc: "Carne de res a la plancha, papas fritas, salchicha, tomate, cebolla, locoto y huevo frito, con un toque picante. El plato bandera de Cochabamba, ideal para compartir."
    },
    "Majadito Batido": {
      price: 35,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Majadito_con_carne_de_res.jpg",
      desc: "Arroz batido con charque deshilachado, huevo frito, plátano frito y sazón boliviana. Un clásico reconfortante y abundante."
    },
    "Charque": {
      price: 18,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Charquic%C3%A1n_Cochabambino.jpg",
      desc: "Carne de res deshidratada y desmenuzada, servida con quesillo, papa boliviana, mote de maíz y llajua."
    },
    "Silpancho": {
      price: 30,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Silpancho_Cochabambino.jpg",
      desc: "Carne apanada y frita sobre una base de arroz y papa, coronada con huevo frito y sarza fresca de tomate, cebolla y locoto."
    },
    "Mocochinchi": {
      price: 8,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Refresco_de_mocochinchi.jpg",
      desc: "Refresco tradicional boliviano hecho con duraznos deshidratados, canela y clavo de olor. Dulce, frío y muy refrescante."
    },
    "Combo Cochala": {
      price: 55,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdf6hBJkWqggSkEPhd0JE9tW8vvNpjhIRo4JhoOYq1OsqgCKffZ1xlbGntPD25Qf24fOr1nWtUHgCcgV8d6aAmAPVxY-iVlFUelBRSlNoOnXpR_frGUHrZGrRJXSa7u5H7v-QByTj73luX9O5ama7JdIPsnTtguy7wnhALP032vYzROaFusnrKm9EfLPyC6SNS0XBjdFHiDQ6ZDA-65uaLSwbccF2QSG2If2AuWOV8iv8cz6T8gDlsvg",
      desc: "1 Pique Macho + 2 refrescos de mocochinchi. Ideal para compartir entre dos personas."
    },
    "Salteña de Pollo": {
      price: 10,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Salte%C3%B1as_de_pollo.jpg",
      desc: "Empanada horneada de masa dulce y crocante, rellena de un jugoso guiso de pollo, papa, huevo duro y aceituna."
    },
    "Combo Cochala Para Dos": {
      price: 55,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdf6hBJkWqggSkEPhd0JE9tW8vvNpjhIRo4JhoOYq1OsqgCKffZ1xlbGntPD25Qf24fOr1nWtUHgCcgV8d6aAmAPVxY-iVlFUelBRSlNoOnXpR_frGUHrZGrRJXSa7u5H7v-QByTj73luX9O5ama7JdIPsnTtguy7wnhALP032vYzROaFusnrKm9EfLPyC6SNS0XBjdFHiDQ6ZDA-65uaLSwbccF2QSG2If2AuWOV8iv8cz6T8gDlsvg",
      desc: "1 Pique Macho + 2 refrescos de Mocochinchi, en promo del día. ¡Ideal para compartir!"
    },
    "Promo 2 Platos + 2 Bebidas": {
      price: 50,
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Charquic%C3%A1n_Cochabambino.jpg",
      desc: "Elige 2 platos de nuestro menú más 2 bebidas a tu gusto. La opción perfecta para compartir. Precio desde Bs. 50 según los platos elegidos."
    }
  };

  var cart = [];
  var pendingProduct = null;
  var pendingQty = 1;

  // ---------- Utilidades ----------
  function money(n) { return "Bs. " + n; }

  function saveCart() {
    try { localStorage.setItem("cochala_cart", JSON.stringify(cart)); } catch (e) {}
  }
  function loadCart() {
    try {
      var raw = localStorage.getItem("cochala_cart");
      if (raw) cart = JSON.parse(raw);
    } catch (e) { cart = []; }
  }

  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }

  // ---------- Modal de detalles ----------
  var modal = document.getElementById("product-modal");
  var modalImage = document.getElementById("modalImage");
  var modalTitle = document.getElementById("modalTitle");
  var modalDesc = document.getElementById("modalDesc");
  var modalPrice = document.getElementById("modalPrice");
  var qtyValue = document.getElementById("qtyValue");

  function openModal(productName) {
    var data = PRODUCTS[productName];
    if (!data) return;
    pendingProduct = productName;
    pendingQty = 1;
    qtyValue.textContent = "1";
    modalImage.src = data.image;
    modalImage.alt = productName;
    modalTitle.textContent = productName;
    modalDesc.textContent = data.desc;
    modalPrice.textContent = money(data.price);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.getElementById("qtyMinus").addEventListener("click", function () {
    pendingQty = Math.max(1, pendingQty - 1);
    qtyValue.textContent = pendingQty;
  });
  document.getElementById("qtyPlus").addEventListener("click", function () {
    pendingQty += 1;
    qtyValue.textContent = pendingQty;
  });

  document.getElementById("modalAddBtn").addEventListener("click", function () {
    if (!pendingProduct) return;
    addToCart(pendingProduct, pendingQty);
    closeModal();
    showToast(pendingQty + " x " + pendingProduct + " agregado al carrito");
    openCart();
  });

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  // ---------- Carrito ----------
  var cartDrawer = document.getElementById("cart-drawer");
  var cartItemsEl = document.getElementById("cartItems");
  var cartEmptyEl = document.getElementById("cartEmpty");
  var cartTotalEl = document.getElementById("cartTotal");
  var cartCountEl = document.getElementById("cartCount");
  var deliveryAddress = document.getElementById("deliveryAddress");
  var checkoutBtn = document.getElementById("checkoutBtn");

  function addToCart(productName, qty) {
    var existing = cart.filter(function (i) { return i.name === productName; })[0];
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name: productName, qty: qty });
    }
    saveCart();
    renderCart();
  }

  function changeQty(productName, delta) {
    var item = cart.filter(function (i) { return i.name === productName; })[0];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(function (i) { return i.name !== productName; });
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(productName) {
    cart = cart.filter(function (i) { return i.name !== productName; });
    saveCart();
    renderCart();
  }

  function cartTotal() {
    return cart.reduce(function (sum, item) {
      var data = PRODUCTS[item.name];
      var price = data ? data.price : 0;
      return sum + price * item.qty;
    }, 0);
  }

  function cartCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function renderCart() {
    cartItemsEl.querySelectorAll(".cart-line").forEach(function (el) { el.remove(); });

    if (cart.length === 0) {
      cartEmptyEl.style.display = "block";
    } else {
      cartEmptyEl.style.display = "none";
      cart.forEach(function (item) {
        var data = PRODUCTS[item.name] || { price: 0, image: "" };
        var line = document.createElement("div");
        line.className = "cart-line";
        line.innerHTML =
          '<img src="' + data.image + '" alt="' + item.name + '">' +
          '<div class="cart-line-info">' +
            '<strong>' + item.name + '</strong>' +
            '<span>' + money(data.price) + ' c/u · Subtotal: ' + money(data.price * item.qty) + '</span>' +
            '<button type="button" class="cart-line-remove" data-remove="' + item.name + '">Quitar</button>' +
          '</div>' +
          '<div class="cart-line-qty">' +
            '<button type="button" data-qty-minus="' + item.name + '">−</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" data-qty-plus="' + item.name + '">+</button>' +
          '</div>';
        cartItemsEl.appendChild(line);
      });
    }

    cartTotalEl.textContent = money(cartTotal());
    cartCountEl.textContent = cartCount();
    checkoutBtn.disabled = cart.length === 0;

    cartItemsEl.querySelectorAll("[data-qty-minus]").forEach(function (btn) {
      btn.addEventListener("click", function () { changeQty(btn.getAttribute("data-qty-minus"), -1); });
    });
    cartItemsEl.querySelectorAll("[data-qty-plus]").forEach(function (btn) {
      btn.addEventListener("click", function () { changeQty(btn.getAttribute("data-qty-plus"), 1); });
    });
    cartItemsEl.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () { removeFromCart(btn.getAttribute("data-remove")); });
    });
  }

  function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.getElementById("cartFab").addEventListener("click", openCart);
  document.querySelectorAll("[data-close-cart]").forEach(function (el) {
    el.addEventListener("click", closeCart);
  });

  // Mostrar/ocultar campo de dirección según el tipo de entrega
  document.querySelectorAll('input[name="deliveryType"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.value === "delivery" && this.checked) {
        deliveryAddress.classList.add("show");
      } else if (this.value === "recoger" && this.checked) {
        deliveryAddress.classList.remove("show");
      }
    });
  });

  // ---------- Checkout por WhatsApp ----------
  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) return;

    var deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    var address = deliveryAddress.value.trim();

    if (deliveryType === "delivery" && !address) {
      deliveryAddress.classList.add("show");
      deliveryAddress.focus();
      showToast("Por favor escribe tu dirección para el delivery");
      return;
    }

    var lines = ["¡Hola Cochala Bistro! Quiero hacer este pedido:", ""];
    cart.forEach(function (item) {
      var data = PRODUCTS[item.name] || { price: 0 };
      lines.push("• " + item.qty + " x " + item.name + " — " + money(data.price * item.qty));
    });
    lines.push("");
    lines.push("Total: " + money(cartTotal()));
    lines.push("");
    if (deliveryType === "delivery") {
      lines.push("Tipo de entrega: Delivery");
      lines.push("Dirección: " + address);
    } else {
      lines.push("Tipo de entrega: Recojo en el local");
    }

    var message = encodeURIComponent(lines.join("\n"));
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;
    window.open(url, "_blank", "noopener");
  });

  // ---------- Conectar botones "PEDIR" / "+" del sitio ----------
  document.querySelectorAll(".add-btn, .order-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var productName = btn.getAttribute("data-product");
      if (!productName) return;

      // El botón general del final ("Pedido general") abre el carrito directo
      if (productName === "Pedido general") {
        openCart();
        return;
      }
      if (!PRODUCTS[productName]) return;
      openModal(productName);
    });
  });

  // ---------- Cerrar con tecla Escape ----------
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
      closeCart();
    }
  });

  // ---------- Inicio ----------
  loadCart();
  renderCart();
})();