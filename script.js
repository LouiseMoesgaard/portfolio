"use strick";

document.addEventListener("DOMContentLoaded", menuOpen);


function menuOpen() {

    const nav = document.querySelector("nav .menu"); //selector indhold i menu klassen. - hovedmenu +sociale medier.

    document.querySelector(".burger_open").addEventListener("click", function () {
        nav.classList.toggle("hide");
        this.classList.toggle("open_menu"); //aninmation på knappen i .open_menu i css
    })
}