

(function () {

    const STORAGE_KEY = "feastify_cart";

    
    function getCart() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
        catch (e) { return []; }
    }
    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    
    function addToCart(item, qty) {
        qty = qty || 1;
        const cart = getCart();
        const existing = cart.find(c => c.id === item.id);
        if (existing) existing.qty += qty;
        else cart.push(Object.assign({ qty: qty }, item));
        saveCart(cart);
        updateBadge();
        flashCart();
    }
    function updateQty(id, delta) {
        const cart = getCart();
        const i = cart.findIndex(c => c.id === id);
        if (i > -1) {
            cart[i].qty += delta;
            if (cart[i].qty <= 0) cart.splice(i, 1);
            saveCart(cart);
            updateBadge();
        }
        return cart;
    }
    function removeItem(id) {
        const cart = getCart().filter(c => c.id !== id);
        saveCart(cart);
        updateBadge();
        return cart;
    }
    function getCount() {
        return getCart().reduce((s, c) => s + c.qty, 0);
    }

    
    function updateBadge() {
        const n = getCount();
        document.querySelectorAll(".cart-btn span").forEach(s => {
            s.textContent = n;
            s.style.display = n > 0 ? "" : "none";
        });
    }
    function flashCart() {
        document.querySelectorAll(".cart-btn").forEach(b => {
            b.animate(
                [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
                { duration: 350, easing: "ease" }
            );
        });
    }

    function showAddedFeedback(btn, card) {
        if (!btn) return;

        const originalHtml = btn.innerHTML;
        btn.dataset.originalHtml = originalHtml;
        btn.classList.add("is-adding");
        if (card) card.classList.add("cart-added");

        btn.innerHTML = '<i class="fa-solid fa-check"></i><span class="add-label">Added</span>';

        window.setTimeout(() => {
            btn.classList.remove("is-adding");
            if (card) card.classList.remove("cart-added");
            btn.innerHTML = btn.dataset.originalHtml || originalHtml;
        }, 700);
    }

    function isCartActionButton(btn) {
        if (!btn || !(btn instanceof HTMLElement)) return false;

        const card = btn.closest(".food-card");
        if (!card) return false;

        const hasCartIcon = Array.from(btn.querySelectorAll("i, svg")).some((icon) => {
            const className = (icon.className || "").toString();
            return /fa-(cart|bag|plus|shopping)/i.test(className);
        });

        return btn.classList.contains("add-cart") ||
            btn.classList.contains("add-to-cart") ||
            btn.classList.contains("cart-btn") ||
            btn.closest(".food-bottom") ||
            btn.dataset.action === "add-to-cart" ||
            hasCartIcon;
    }

    function getItemInfo(card) {
        const nameEl = card.querySelector("h3, .food-name, .product-title, [data-name]") || card.querySelector("h4");
        const name = nameEl ? (nameEl.dataset.name || nameEl.textContent || "").trim() : "";

        const imgEl = card.querySelector("img") || card.querySelector("[data-image]");
        const img = imgEl ? (imgEl.getAttribute("src") || imgEl.getAttribute("data-src") || "") : "";

        const priceEl = card.querySelector(".food-bottom h4, .price, [data-price], h4") || card.querySelector("[data-price]");
        const priceText = priceEl ? (priceEl.dataset.price || priceEl.textContent || "0") : "0";
        const price = parseInt((priceText || "0").replace(/[^\d]/g, ""), 10) || 0;

        let id = card.dataset.id || card.getAttribute("data-id") || "";
        if (!id) {
            id = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : (img || ("item-" + Math.random().toString(36).slice(2, 8)));
        }

        return { name, img, price, id };
    }

    
    function initSteppers() {
        document.querySelectorAll(".food-card .food-bottom").forEach(fb => {
            if (fb.querySelector(".stepper")) return;
            const btn = fb.querySelector("button");
            if (!btn) return;
            const stepper = document.createElement("div");
            stepper.className = "stepper";
            stepper.dataset.qty = "1";
            stepper.innerHTML =
                '<button type="button" class="stepper-dec" aria-label="Decrease">−</button>' +
                '<span class="stepper-num">1</span>' +
                '<button type="button" class="stepper-inc" aria-label="Increase">+</button>';
            fb.insertBefore(stepper, btn);
            btn.classList.add("add-cart");
        });
    }

    
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const card = btn.closest(".food-card");
        if (!card) return;

        
        if (btn.classList.contains("stepper-inc") || btn.classList.contains("stepper-dec")) {
            const stepper = btn.closest(".stepper");
            let q = parseInt(stepper.dataset.qty || "1", 10);
            q = btn.classList.contains("stepper-inc") ? q + 1 : Math.max(1, q - 1);
            stepper.dataset.qty = q;
            const num = stepper.querySelector(".stepper-num");
            if (num) num.textContent = q;
            return;
        }

        
        if (btn.classList.contains("wishlist")) return;

        if (!isCartActionButton(btn)) return;

        e.preventDefault();
        e.stopPropagation();

        const { name, img, price, id } = getItemInfo(card);
        const stepper = card.querySelector(".stepper");
        const qty = stepper ? (parseInt(stepper.dataset.qty || "1", 10) || 1) : 1;

        addToCart({ id: id, name: name, price: price, image: img }, qty);
        showAddedFeedback(btn, card);

        
        if (stepper) {
            stepper.dataset.qty = "1";
            const num = stepper.querySelector(".stepper-num");
            if (num) num.textContent = "1";
        }
    });

    
    function initResponsiveNav() {
        const toggle = document.querySelector(".menu-toggle, .hamburger");
        const nav = document.querySelector(".mobile-menu") || document.querySelector(".nav-links");
        if (!toggle || !nav) return;
        if (toggle.dataset.navBound === "true") return;

        toggle.dataset.navBound = "true";

        const closeMenu = () => {
            toggle.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");
        };

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = toggle.classList.contains("active");
            toggle.classList.toggle("active", !isOpen);
            nav.classList.toggle("active", !isOpen);
            document.body.classList.toggle("menu-open", !isOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => closeMenu());
        });

        document.addEventListener("click", (event) => {
            if (!nav.contains(event.target) && !toggle.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) closeMenu();
        });
    }

    function initNavbarScroll() {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return;
        const onScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    function renderCart() {
        const list = document.getElementById("cartItems");
        if (!list) return;

        const cart = getCart();
        const empty = document.getElementById("cartEmpty");
        const summary = document.getElementById("cartSummary");

        if (cart.length === 0) {
            list.innerHTML = "";
            empty.style.display = "block";
            summary.style.display = "none";
            return;
        }

        empty.style.display = "none";
        summary.style.display = "block";

        list.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
                <div class="qty-control">
                    <button class="qty-btn dec" aria-label="Decrease">−</button>
                    <span class="qty">${item.qty}</span>
                    <button class="qty-btn inc" aria-label="Increase">+</button>
                </div>
                <span class="cart-item-total">₹${item.price * item.qty}</span>
                <button class="remove-btn" aria-label="Remove"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join("");

        const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
        const delivery = 29;
        const total = subtotal + delivery;

        document.getElementById("subtotal").textContent = "₹" +  subtotal;
        document.getElementById("delivery").textContent = "₹" +  delivery;
        document.getElementById("total").textContent = "₹" +  total;
    }

    
    document.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".cart-item");
        if (!itemEl) return;
        const id = itemEl.dataset.id;

        if (e.target.closest(".qty-btn.inc")) { updateQty(id, 1); renderCart(); }
        else if (e.target.closest(".qty-btn.dec")) { updateQty(id, -1); renderCart(); }
        else if (e.target.closest(".remove-btn")) { removeItem(id); renderCart(); }
    });

    
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#checkoutBtn")) return;
        const cart = getCart();
        if (!cart.length) return;
        const btn = e.target.closest("#checkoutBtn");
        const original = btn.innerHTML;
        btn.innerHTML = '<span>Order Placed </span> <i class="fa-solid fa-check"></i>';
        btn.style.background = "linear-gradient(135deg,#34D399,#10B981)";
        setTimeout(() => {
            localStorage.removeItem(STORAGE_KEY);
            updateBadge();
            renderCart();
            btn.innerHTML = original;
            btn.style.background = "";
        }, 1800);
    });

    
    function hideLoader() {
        const loader = document.querySelector(".page-intro");
        if (!loader || loader.dataset.hidden) return;
        loader.dataset.hidden = "1";
        loader.classList.add("hide");
        setTimeout(() => loader.remove(), 800);
    }

    document.addEventListener("DOMContentLoaded", () => {
        initSteppers();
        initResponsiveNav();
        initNavbarScroll();
        updateBadge();
        renderCart();
        hideLoader();
    });

    
    window.addEventListener("load", hideLoader);
    setTimeout(hideLoader, 1500);

    window.FeastCart = { getCart, addToCart, updateQty, removeItem, getCount, updateBadge, renderCart };

})();
