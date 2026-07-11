document.addEventListener("DOMContentLoaded", () => {

    
    const loader = document.querySelector(".page-intro");

    if (loader) {

        setTimeout(() => loader.classList.add("hide"), 2600);
        setTimeout(() => loader.remove(), 3500);

    }

    
    const authCard = document.getElementById("authCard");
    const tabs = document.getElementById("tabs");
    const tabBtns = document.querySelectorAll(".tab");
    const switchLinks = document.querySelectorAll(".switch-text a");

    const setMode = (mode) => {

        const isSignup = mode === "signup";

        authCard.classList.toggle("signup", isSignup);
        tabs.classList.toggle("signup", isSignup);

        tabBtns.forEach((b) => b.classList.toggle("active", b.dataset.target === mode));

    };

    tabBtns.forEach((btn) => {

        btn.addEventListener("click", () => setMode(btn.dataset.target));

    });

    switchLinks.forEach((link) => {

        link.addEventListener("click", (e) => {

            e.preventDefault();
            setMode(link.dataset.mode);

        });

    });

    
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const handleSubmit = (form, label) => {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const btn = form.querySelector(".auth-btn");
            const original = btn.innerHTML;
            btn.innerHTML = '<span>Please wait...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {

                btn.innerHTML = original;
                btn.querySelector("span").textContent = label + " successful ";
                btn.style.background = "linear-gradient(135deg,#34D399,#10B981)";

                setTimeout(() => {

                    btn.querySelector("span").textContent = label;
                    btn.style.background = "";

                }, 2200);

            }, 1300);

        });

    };

    handleSubmit(loginForm, "Login");
    handleSubmit(signupForm, "Sign Up");

});
