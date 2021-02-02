'use strict'


// Make navbar transparent when it is on the top.


const navbar = document.querySelector('#navbar');

// element의 height을 받아오는 법 
const navbarHeight = navbar.getBoundingClientRect().height;

// scroll이 될 때마다 {}안에 등록한 함수를 호출해 줘. 
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(`navbarHeight: ${navbarHeight}` );
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark'); //여기서 classList는 왜 새로 만들어준거지? 
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

// Handle scrolling when tapping on the navbar menu.
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link; // 이부분 이해 안감
    console.log(target.dataset.link);
        if (link == null) {
         return;
        }
    // console.log(event.target.dataset.link); //이 부분 이해 안감.  
    // const scrollTo = document.querySelector(link); // link라는 element를 받아와서 
    // scrollTo.scrollIntoView({behavior: "smooth"}); //scrollTO에 scrollIntoView
    scrollIntoView(link);
});

//  Scrollting to Contact when clicking the "Contact Me" button.
const ContactMeBtn = document.querySelector('.home__contact');
ContactMeBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
};

// Make Home fade out when scrolling down
const home = document.querySelector('.home__container'); //쿼리셀렉터이용해서 home의 요소를 가져와서~ 
const homeHeight = home.getBoundingClientRect().height;// getBoundingClient이요해서 홈의 높이를 가져온다. 
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});