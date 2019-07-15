// get window when scrolled
window.addEventListener('scroll', ()=> {
    console.log(screen.width)
    if (window.scrollY > 20) {
        document.querySelector('#scrolled').classList.add('scrolled')
    } else {
        document.querySelector('#scrolled').classList.remove('scrolled')
    }

});
// DOM declaration
let forSale=document.querySelector(".sale");
let forRent=document.querySelector(".rent");
let properties=document.querySelector(".properties");
let user_sign = document.querySelector(".sign-user");
let dashboard = document.querySelector(".dashboard");
let header = document.querySelector(".header");
let adminnav = document.querySelector(".admin");
let usernav = document.querySelector(".user");
let myPropery = document.querySelector(".my-property");
let addPropery = document.querySelector(".add-property");
let search=document.querySelector(".search-form");
let front = document.querySelector(".side-front");
let right = document.querySelector(".side-right");
let back=document.querySelector(".side-back");
let footer=document.querySelector(".footer");
// onload function
const showScrolled=()=>{
    usernav.style.display="block"
    adminnav.style.display="none"
    window.scrollTo(0, 20)
}
// show my property when i signed in
const showMyProperty=() => {
    footer.style.display="none"
    myPropery.style.display="block"
    addPropery.style.display="none"
    if(screen.width<=767){
    adminnav.querySelector(".nav-list").style.display="none"
    }else{
    adminnav.querySelector(".nav-list").style.display="block"  
    }
}
// add add property when i signed in
const addProperty=() => {
    footer.style.display="none"
    myPropery.style.display="none"
    addPropery.style.display="block"
    if(screen.width<=767){
    adminnav.querySelector(".nav-list").style.display="none"
    }else{
    adminnav.querySelector(".nav-list").style.display="block"  
    }
}
// show properties for sale function
const showForSale=() => {
    user_sign.style.display="none"
    properties.style.display="block"
    forSale.style.display="block"
    forRent.style.display="none"
    if(screen.width<=767){
        search.style.display="block"
    usernav.querySelector(".nav-list").style.display="none"
    }
}
// show properties for rent function
const showForRent=() => {
    user_sign.style.display="none"
    properties.style.display="block"
    forRent.style.display="block"
    forSale.style.display="none"
    if(screen.width<=767){
    search.style.display="block"
    usernav.querySelector(".nav-list").style.display="none"
    }
}
//show sign up form
const showSignup = () => {
    user_sign.style.display="block"
    right.style.display="block"
    front.style.display="none"
    back.style.display="none"
    user_sign.style.transform = "translateZ(-100px) rotateY( -90deg)";
    properties.style.display="none"
    if(screen.width<=767){
    usernav.querySelector(".nav-list").style.display="none"
    }
}
//show sign in form
const showLogin = () => {
    if(screen.width<=767){
    usernav.querySelector(".nav-list").style.display="none"
    search.style.display="none"
    }
    user_sign.style.display="block"
    right.style.display="none"
    front.style.display="block"
    back.style.display="none"
    properties.style.display="none"
    user_sign.style.transform = "translateZ(-100px)";
}
//show forgot password form
const showForgotPassword = () => {
    if(screen.width<=767){
    usernav.querySelector(".nav-list").style.display="none"
    }
    properties.style.display="none"
    user_sign.style.display="block"
    right.style.display="none"
    front.style.display="none"
    back.style.display="block"
    user_sign.style.transform = "translateZ(-100px) rotateY( -180deg)";
}

//show welcome user side
const showWelcomeUser = () => {
    footer.style.display="none"
    usernav.style.display="none"
    adminnav.style.display="block"
    properties.style.display="none"
    header.style.display="none"
    dashboard.style.display="block"
}
// delete property
const deleteProperty = row => {
	row.parentElement.parentElement.parentElement.hidden = true;
};
// mark properties as sold/rented
const markProperty = row => {
    row.parentElement.querySelector('.status').innerHTML='Yes'
};
// Menu responsive
const showMenu=menu=>{
    let nav = menu.parentElement.parentElement.querySelector(".nav-list");
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
}