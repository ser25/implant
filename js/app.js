
// let gotopbtn = document.querySelector('.circle-phone');
// window.addEventListener("scroll", (event) => window.scrollY >= 32 ? gotopbtn.classList.add('show-phone') : gotopbtn.classList.remove('show-phone'));


// Меню бургер 

const iconMenu = document.querySelector('.menu__icon')

if (iconMenu) {
    const menuBody = document.querySelector('.menu__body')
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    });
}
