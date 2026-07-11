window.addEventListener("load",()=>{

document.querySelector(".menu-content").animate(

[
{
opacity:0,
transform:"translateY(50px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],

{
duration:900,
fill:"forwards",
easing:"ease-out"
}

);

});
document.addEventListener("DOMContentLoaded", () => {

    const intro = document.querySelector(".page-intro");

    if (!intro) return;

    setTimeout(() => {

        intro.classList.add("hide");

    }, 2200);

    setTimeout(() => {

        intro.remove();

    }, 3200);

});


const filters=document.querySelectorAll(".food-filter");

filters.forEach(button=>{

button.addEventListener("click",()=>{

filters.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});



document.querySelectorAll(".wishlist").forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle("liked");

btn.innerHTML=btn.classList.contains("liked")

?'<i class="fa-solid fa-heart"></i>'

:'<i class="fa-regular fa-heart"></i>';

};

});


document.querySelectorAll(".wishlist").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.classList.toggle("liked");

        btn.innerHTML=

        btn.classList.contains("liked")

        ?

        '<i class="fa-solid fa-heart"></i>'

        :

        '<i class="fa-regular fa-heart"></i>';

    });

});



document.querySelectorAll(".food-bottom button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.innerHTML='<i class="fa-solid fa-check"></i>';

        setTimeout(()=>{

            btn.innerHTML='<i class="fa-solid fa-cart-plus"></i>';

        },900);

    });

});


const filterButtons = document.querySelectorAll(".food-filter");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        foodCards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                if (card.style.display !== "block") {
                    card.style.display = "block";
                    const anim = card.animate(
                        [
                            { opacity: 0, transform: "translateY(35px) scale(0.9)" },
                            { opacity: 1, transform: "translateY(0) scale(1)" }
                        ],
                        { duration: 400, easing: "ease" }
                    );
                    anim.onfinish = () => {
                        card.style.opacity = "";
                        card.style.transform = "";
                    };
                }
            } else {
                if (card.style.display !== "none") {
                    const anim = card.animate(
                        [
                            { opacity: 1, transform: "translateY(0) scale(1)" },
                            { opacity: 0, transform: "translateY(35px) scale(0.9)" }
                        ],
                        { duration: 400, easing: "ease" }
                    );
                    anim.onfinish = () => {
                        card.style.display = "none";
                        card.style.opacity = "";
                        card.style.transform = "";
                    };
                }
            }
        });


    });

});