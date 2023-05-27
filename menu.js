let menuMobileBtn = document.querySelector('.nav__menuBtn'); 
let menuMobile = document.querySelector('.menu__list');
let iconMenuOpen = document.querySelector('.menu--btn'); 
let iconMenuClose = document.querySelector('.menu--btnClose'); 

menuMobileBtn.addEventListener('click', (e)=>{
    e.preventDefault(); 

    menuMobile.classList.toggle('active');
    iconMenuOpen.classList.toggle('active'); 
    iconMenuClose.classList.toggle('active'); 


})