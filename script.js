// ========================================
// SCENVORA - MAIN SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // PRODUCT DISPLAY
    // ========================================

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card, index) => {

        const product = products[index];

        if (!product) return;

        // Product image
        const imageBox = card.querySelector(".product-image");

        if (imageBox) {

            const oldPlaceholder = imageBox.querySelector(".image-placeholder");

            if (oldPlaceholder) {
                oldPlaceholder.remove();
            }

            const img = document.createElement("img");

            img.src = product.image;
            img.alt = product.name;

            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            img.style.objectPosition = "center";

            imageBox.prepend(img);
        }

        // Product name
        const name = card.querySelector("h3");

        if (name) {
            name.textContent = product.name;
        }

        // Product description
        const description = card.querySelector("p");

        if (description) {
            description.textContent = product.description;
        }

        // Product price with cut price
        const price = card.querySelector(".price");

        if (price) {
        if (product.oldPrice) {
        price.innerHTML = `<span style="text-decoration: line-through; text-decoration-color: red; color: #888; margin-right: 7px; font-size: 0.85em;">Rs. ${product.oldPrice.toLocaleString()}</span> Rs. ${product.price.toLocaleString()}`;
        } else {
        price.textContent = `Rs. ${product.price.toLocaleString()}`;
        }      
}

        // Store product data
        card.dataset.productId = product.id;
    });


    // ========================================
    // MOBILE MENU
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });

        });
    }


    // ========================================
    // CART
    // ========================================

    let cart = [];

    const cartDrawer = document.querySelector(".cart-drawer");
    const cartOverlay = document.querySelector(".cart-overlay");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");

    function openCart() {

        if (cartDrawer) {
            cartDrawer.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }
    }

    function closeCart() {

        if (cartDrawer) {
            cartDrawer.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    }


    // ========================================
    // ADD TO CART
    // ========================================

    document.querySelectorAll(".quick-add").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            if (!card) return;

            const productId = Number(card.dataset.productId);

            const product = products.find(
                item => item.id === productId
            );

            if (!product) return;

            const existingItem = cart.find(
                item => item.id === product.id
            );

            if (existingItem) {

                existingItem.quantity++;

            } else {

                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });

            }

            updateCart();

            openCart();
        });

    });


    // ========================================
    // UPDATE CART
    // ========================================

    function updateCart() {

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {

            total += item.price * item.quantity;

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>
                        Rs. ${item.price.toLocaleString()}
                    </span>

                </div>

                <div class="cart-quantity">

                    <button class="quantity-minus"
                        data-id="${item.id}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button class="quantity-plus"
                        data-id="${item.id}">
                        +
                    </button>

                </div>

                <button
                    class="remove-item"
                    data-id="${item.id}">
                    ×
                </button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });


        if (cartTotal) {

            cartTotal.textContent =
                `Rs. ${total.toLocaleString()}`;

        }


        // Quantity minus
        document.querySelectorAll(".quantity-minus").forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                const item = cart.find(
                    item => item.id === id
                );

                if (!item) return;

                item.quantity--;

                if (item.quantity <= 0) {

                    cart = cart.filter(
                        item => item.id !== id
                    );

                }

                updateCart();

            });

        });


        // Quantity plus
        document.querySelectorAll(".quantity-plus").forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                const item = cart.find(
                    item => item.id === id
                );

                if (!item) return;

                item.quantity++;

                updateCart();

            });

        });


        // Remove item
        document.querySelectorAll(".remove-item").forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                cart = cart.filter(
                    item => item.id !== id
                );

                updateCart();

            });

        });

    }


    // ========================================
    // CART OPEN / CLOSE BUTTONS
    // ========================================

    const cartButtons = document.querySelectorAll(
        ".cart-btn, .cart-icon"
    );

    cartButtons.forEach(button => {

        button.addEventListener("click", openCart);

    });


    const cartClose = document.querySelector(
        ".cart-close"
    );

    if (cartClose) {

        cartClose.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }


    // ========================================
    // NEWSLETTER
    // ========================================

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", event => {

            event.preventDefault();

            const emailInput =
                newsletterForm.querySelector("input");

            if (emailInput && emailInput.value.trim() !== "") {

                alert(
                    "Thank you for subscribing to Scenvora."
                );

                emailInput.value = "";

            }

        });

    }

});

// --- SEARCH FUNCTIONALITY ---
const searchBtn = document.querySelector('.icon-btn');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const searchTerm = document.getElementById('searchTerm');

if(searchBtn){
  searchBtn.addEventListener('click', () => {
    searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
    if(searchBox.style.display === 'block') searchInput.focus();
  });
}

if(searchInput){
  searchInput.addEventListener('keyup', () => {
    let filter = searchInput.value.toLowerCase().trim();
    let products = document.querySelectorAll('.product-card, .product, .card, .perfume-item');
    let visibleCount = 0;

    products.forEach(p => {
      if(p.innerText.toLowerCase().includes(filter)){
        p.style.display = '';
        visibleCount++;
      } else {
        p.style.display = 'none';
      }
    });

    if(visibleCount === 0 && filter !== ""){
      noResults.style.display = 'block';
      searchTerm.innerText = searchInput.value;
    } else {
      noResults.style.display = 'none';
    }
  });
}