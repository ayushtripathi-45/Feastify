document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".page-intro");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 2600);

    setTimeout(() => {

        loader.remove();

    }, 3500);

});


const filters=document.querySelectorAll(".food-filter");

filters.forEach(button=>{

button.addEventListener("click",()=>{

filters.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

});

});
const loadBtn = document.getElementById("loadMoreBtn");

const hiddenCards = document.querySelectorAll(".hidden-card");

loadBtn.addEventListener("click", () => {

    hiddenCards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 180);

    });

    loadBtn.innerHTML = " All Dishes Loaded";

    loadBtn.disabled = true;

});
const filterButtons = document.querySelectorAll(".food-filter");
const cards = document.querySelectorAll(".food-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card=>{

            const category = card.dataset.category;

            if(filter==="all" || category===filter){

                card.classList.remove("hide");

                card.classList.add("show");

            }

            else{

                card.classList.remove("show");

                card.classList.add("hide");

            }

        });

    });

});
const searchInput=document.querySelector(".search-box input");

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    cards.forEach(card=>{

        const text=card.innerText.toLowerCase();

        if(text.includes(value)){

            card.classList.remove("hide");

            card.classList.add("show");

        }

        else{

            card.classList.remove("show");

            card.classList.add("hide");

        }

    });

});
