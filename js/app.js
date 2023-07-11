
// let gotopbtn = document.querySelector('.circle-phone');
// window.addEventListener("scroll", (event) => window.scrollY >= 32 ? gotopbtn.classList.add('show-phone') : gotopbtn.classList.remove('show-phone'));


// Меню бургер 

const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
    
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    });
}


//Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0){
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e){
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const headerHeight = document.querySelector('.header').offsetHeight
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top  + scrollY - headerHeight - 10 ;
      
      if(iconMenu.classList.contains('_active')){
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active')
        menuBody.classList.remove('_active')
      }


      window.scroll({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();

    }

  }
}
