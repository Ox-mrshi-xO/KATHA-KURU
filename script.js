document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById('contactForm');
  const thankMessage = document.getElementById('thankMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    thankMessage.style.display = 'inline'; 
    setTimeout(() => {
      thankMessage.style.display = 'none';
    }, 3000);
    form.reset();
  });

  const cartBtn = document.getElementById("cart-btn");
  const cartPopup = document.getElementById("cart-popup");
  const cartItemsList = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartCount = document.getElementById("cart-count");
  const cartSubtotalElem = document.getElementById("cart-subtotal");
  const cartTotalElem = document.getElementById("cart-total");

  let cart = [];

  cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartPopup.classList.toggle("active");
  });
  document.addEventListener("click", () => {
    cartPopup.classList.remove("active");
  });
  cartPopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const name = product.querySelector(".product-name").textContent;
      const priceText = product.querySelectorAll(".product-price")[1].textContent.replace("₱", "").trim();
      const price = parseFloat(priceText);
      const imgSrc = product.querySelector("img").src;

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
      }

      updateCart();
    });
  });

  function updateCart() {
    cartItemsList.innerHTML = "";
    emptyCart.style.display = cart.length === 0 ? "block" : "none";

    cart.forEach((item, index) => {
      const totalPrice = (item.price * item.quantity).toFixed(2);
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.imgSrc}" alt="${item.name}" style="width:40px; height:40px; border-radius:5px; object-fit:cover;">
          <div style="flex:1;">
            <strong style="font-size: 0.9rem;">${item.name}</strong><br>
            <span style="font-size: 0.8rem;">₱${item.price} x ${item.quantity} = ₱${totalPrice}</span>
          </div>
          <div style="display:flex; align-items:center; gap:4px;">
            <button class="decrease" data-index="${index}" style="border:none; background:#eee; padding:2px 5px; cursor:pointer;">−</button>
            <span style="font-size:0.9rem;">${item.quantity}</span>
            <button class="increase" data-index="${index}" style="border:none; background:#eee; padding:2px 5px; cursor:pointer;">+</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    cartSubtotalElem.textContent = subtotal;
    cartTotalElem.textContent = subtotal;

    document.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity += 1;
        updateCart();
      });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        updateCart();
      });
    });
  }
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutMessage = document.getElementById('checkout-message');

  checkoutBtn.addEventListener('click', () => {
    checkoutMessage.style.display = 'block';
    setTimeout(() => {
      checkoutMessage.style.display = 'none';
    }, 3000);
  });

  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const aniElements = targetSection.querySelectorAll(".pop");
        aniElements.forEach(el => {
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "";
        });
      }
    });
  });
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active'); 
    hamburger.classList.toggle('active'); 
  });

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navbar.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      navbar.classList.remove('active');
      hamburger.classList.remove('active'); 
    }
  });

});
