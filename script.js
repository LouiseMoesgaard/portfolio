"use strict";

let work;
let msnry;

document.addEventListener("readystatechange", ()=>{
    if(document.readyState == "complete") {
        let query = window.matchMedia("(max-width: 992px)");
        if(query.matches){
            menuOpen();
            console.log(document.querySelector("#frontpage .button_text"));
            let frontpageBtn = document.querySelector("#frontpage .button_text");
            if(frontpageBtn) {
                frontpageBtn.classList.add("hide")
            }
        } else {
            document.querySelector(".burger_open").classList.add("hide");
            document.querySelector(".menu").classList.remove("hide");
        }
        if(window.location.pathname.includes("/work_portfolio.html")) {
            generateMasonry();
            setTimeout(()=>{fixSectionHeight();},800);
        } else if(window.location.pathname.includes("/work_info.html")){
            fetchJson().then(json=> work = json).then(()=>{
                handleWorkParamter();
                setTimeout(()=>{generateMasonry();},200)
            }).then(()=>{
                setTimeout(()=>{fixSectionHeight();},800);
                 
            });
        } else if(window.location.pathname.includes("/index.html") || window.location.pathname.lastIndexOf('/') === window.location.pathname.length-1) { 
            setTimeout(()=>{
                document.querySelector("h1").classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
                document.querySelector("#frontpage h2").classList.add("animate__animated", "animate__fadeIn");
                document.querySelector("#frontpage h3").classList.add("animate__animated", "animate__fadeIn","animate__delay-2s");
                setTimeout(()=>{fixSectionHeight();},600);
            },100);
        } else{
            setTimeout(()=>{fixSectionHeight();},800);

        }

        let hash = localStorage.getItem('savedHash');
        setTimeout(()=>{
            if(hash !== 'null') {
                let element = document.querySelector(hash);
                window.scrollBy(0, element.getBoundingClientRect().top-50);
                document.querySelector("a[href*='" + hash + "']").classList.add("active");
                localStorage.setItem('savedHash', null);
    
            }
        }, 800)
        
    }
});


window.onscroll = () => {
    const navScroll = document.querySelector('nav');

    if (this.scrollY <= 200) {
        navScroll.classList.remove('color');
    } else {
        navScroll.classList.add('color');
    }
};

window.addEventListener("resize", ()=>{
    let query = window.matchMedia("(max-width: 992px)");
        if(query.matches){
            menuOpen();
            document.querySelector(".burger_open").classList.remove("hide");
            document.querySelector(".menu").classList.add("hide");
        } else {
            document.querySelector(".burger_open").classList.add("hide");
            document.querySelector(".menu").classList.remove("hide");
        }
})

document.querySelectorAll(".hashed_link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        let hash = "#" + (e.target.getAttribute("href").split("#")[1]);

        if (document.querySelector("#frontpage")) {  
            let element = document.querySelector(hash);
            window.scrollBy(0, element.getBoundingClientRect().top - 50);
            if(document.querySelector(".active")){
                document.querySelector(".active").classList.remove("active");
            }
            document.querySelector("a[href*='" + hash + "']").classList.add("active");
        } else {
            localStorage.setItem('savedHash', hash); 
            window.location = e.target.getAttribute("href");
        }

    })
});

function menuOpen() {
    const nav = document.querySelector("nav .menu"); //selector indhold i menu klassen. - hovedmenu +sociale medier.

    document.querySelector(".burger_open").addEventListener("click", function () {
        nav.classList.toggle("hide");
        this.classList.toggle("open_menu"); //aninmation på knappen i .open_menu i css
    })
}

function fetchJson() {
    return fetch("work.json")
    .then( response => response.json() )
    .then( jsonData => {
        return jsonData;
    })
}

function generateWork(index) {
    const container = document.querySelector("#work_info .section_wrapper");
    const clone = document.querySelector("#work_template").content.cloneNode(true);

    clone.querySelector("h2").innerHTML = work[index].title;
    clone.querySelector("h3").innerHTML = work[index].subTitle;
    clone.querySelector("img").setAttribute("src", work[index].mainImg);
    if(work[index].imgClass) {
        clone.querySelector("img").classList.add(work[index].imgClass);
    }
    clone.querySelector("#about").innerHTML = work[index].about;
    clone.querySelector("#time_text").innerHTML = work[index].time;
    clone.querySelector("#role_text").innerHTML = work[index].role;
    if(work[index].solution){
        clone.querySelector("#solution_link").innerHTML = work[index].solution.text;
        clone.querySelector("#solution_link").setAttribute("href", work[index].solution.link);
    } else{
        clone.querySelector("#solution").classList.add("hide");
        
    }

    if(work[index].imgs.length > 0) {
        work[index].imgs.forEach(imgObj => {
            let img = document.createElement('img');
            img.setAttribute('src', imgObj.src);
            img.classList.add('work_grid_item');
            if(imgObj.class){
                img.classList.add(imgObj.class);
            }
            clone.querySelector('.work_portfolio_grid').appendChild(img);
        });
    }
    container.appendChild(clone); 
}

function generateMasonry(){
    let query = window.matchMedia("(max-width: 760px)");
    let gutter = 15;
    if(query.matches) {
        gutter = 7;
    }

    msnry = new Masonry(".work_portfolio_grid", {
        itemSelector: '.work_grid_item',
        gutter: gutter,
        percentPosition: true,
        columnWidth: '.grid_sizer'
    });   
}

function fixSectionHeight() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    for(let i = 0; i < sections.length; i++) {
        if(i === 0) {
            if(sections[i].firstElementChild.offsetHeight + footer.offsetHeight > vh) {
                sections[i].style.height = sections[i].firstElementChild.offsetHeight+90+"px";
            } else {
                sections[i].style.height = (vh-175)+"px";
            }
            
        } else {
            console.log(sections[i])
            sections[i].style.height = sections[i].firstElementChild.offsetHeight+"px";
        }
    };
    document.querySelector('.circle_container').style.height = document.body.offsetHeight+"px";
}

function handleWorkParamter() {
    let url = new URL(window.location.href);
    let index = url.searchParams.get("index");

generateWork(index);

}