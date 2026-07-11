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

    
    const form = document.getElementById("contactForm");
    const success = document.getElementById("formSuccess");
    const submitBtn = form.querySelector(".submit-btn");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const original = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {

            submitBtn.innerHTML = original;
            success.classList.add("show");
            form.reset();

            success.scrollIntoView({ behavior: "smooth", block: "center" });

            setTimeout(() => success.classList.remove("show"), 5000);

        }, 1200);

    });

});
