document.addEventListener("DOMContentLoaded", () => {

    
    const loader = document.querySelector(".page-intro");

    if (loader) {

        setTimeout(() => loader.classList.add("hide"), 2600);
        setTimeout(() => loader.remove(), 3500);

    }

    
    const reveals = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");
                io.unobserve(entry.target);

            }

        });

    }, { threshold: 0.15 });

    reveals.forEach((r) => io.observe(r));

    
    const cards = document.querySelectorAll(".restaurant-card");

    const fadeScale = (el, delay = 0) => {

        setTimeout(() => {

            el.animate([

                { opacity: 0, transform: "translateY(35px) scale(.9)" },
                { opacity: 1, transform: "translateY(0) scale(1)" }

            ], { duration: 400, easing: "ease", fill: "both" });

        }, delay);

    };

    cards.forEach((card, i) => fadeScale(card, 120 + i * 90));

    
    const filters = document.querySelectorAll(".food-filter");

    filters.forEach((button) => {

        button.addEventListener("click", () => {

            filters.forEach((b) => b.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach((card) => {

                const cat = card.dataset.category;

                if (filter === "all" || cat === filter) {

                    card.classList.remove("hide");
                    fadeScale(card, 0);

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });

    
    const search = document.getElementById("searchRestaurant");

    search.addEventListener("keyup", () => {

        const val = search.value.toLowerCase();

        cards.forEach((card) => {

            const text = card.innerText.toLowerCase();

            if (text.includes(val)) {

                card.classList.remove("hide");
                fadeScale(card, 0);

            } else {

                card.classList.add("hide");

            }

        });

    });

    
    const loadBtn = document.getElementById("loadMoreRest");
    const hidden = document.querySelectorAll(".hidden-rest");

    loadBtn.addEventListener("click", () => {

        hidden.forEach((card, i) => {

            setTimeout(() => {

                card.classList.remove("hidden-rest");
                card.animate([

                    { opacity: 0, transform: "translateY(35px) scale(.9)" },
                    { opacity: 1, transform: "translateY(0) scale(1)" }

                ], { duration: 400, easing: "ease", fill: "both" });

            }, i * 150);

        });

        loadBtn.innerHTML = " All Restaurants Loaded";
        loadBtn.disabled = true;

    });

});
