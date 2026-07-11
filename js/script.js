const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active");

});
document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        hamburger.classList.remove("active");

        mobileMenu.classList.remove("active");

    });

});
window.addEventListener("load",()=>{

    const elements=[
        ".hero-badge",
        ".hero h1",
        ".hero p",
        ".hero-search",
        ".hero-right"
    ];

    elements.forEach((selector,index)=>{

        const el=document.querySelector(selector);

        if(!el) return;

        setTimeout(()=>{

            el.classList.add("show");

        },index*180);

    });

});
const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
document.querySelectorAll(".counter").forEach(counter=>{

    const target=+counter.dataset.target;

    let current=0;

    const increment=target/180;

    function update(){

        current+=increment;

        if(current<target){

            counter.innerHTML=Math.floor(current);

            requestAnimationFrame(update);

        }else{

            counter.innerHTML="50K+";

        }

    }

    update();

});
const hero=document.querySelector(".hero");

hero.addEventListener("mousemove",(e)=>{

    const x=(e.clientX-window.innerWidth/2)/40;

    const y=(e.clientY-window.innerHeight/2)/40;

    document.querySelector(".main-food").style.transform=
    `translate(${x}px,${y}px)`;

});
const cards=document.querySelectorAll(".floating-card");

hero.addEventListener("mousemove",(e)=>{

    const x=(e.clientX-window.innerWidth/2)/60;

    const y=(e.clientY-window.innerHeight/2)/60;

    cards.forEach((card,index)=>{

        const speed=(index+1)*8;

        card.style.transform=

        `translate(${x/speed}px,${y/speed}px)`;

    });

});
const blobs=document.querySelectorAll(".blob");

window.addEventListener("mousemove",(e)=>{

    const x=e.clientX/window.innerWidth;

    const y=e.clientY/window.innerHeight;

    blobs.forEach((blob,index)=>{

        blob.style.transform=

        `translate(${x*40*(index+1)}px,
        ${y*30*(index+1)}px)`;

    });

});
const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

    observer.observe(section);

});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))

        ?.scrollIntoView({

            behavior:"smooth"

        });

    });

});
document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mousemove",(e)=>{

        const rect=btn.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;

        const y=e.clientY-rect.top-rect.height/2;

        btn.style.transform=

        `translate(${x*.18}px,${y*.18}px)`;

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translate(0,0)";

    });

});
const navLinks=document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.forEach(item=>item.classList.remove("active"));

        link.classList.add("active");

    });

});
