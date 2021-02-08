'use strict'


// Make navbar transparent when it is on the top.


const navbar = document.querySelector('#navbar');

// element의 height을 받아오는 법 
const navbarHeight = navbar.getBoundingClientRect().height;

// scroll이 될 때마다 {}안에 등록한 함수를 호출해 줘. 
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}` );
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark'); //여기서 classList는 왜 새로 만들어준거지? 
    } else {
        navbar.classList.remove('navbar--dark');
    }
    navbarMenu.classList.remove('open');
});


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
    selectedNavItem(target);
});

// Navbar toggle button for smaller screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open'); // navbarMenu에 클래스에 리스트를 토글 해주도록 하겠음. 토글할클래스는 open.
    navbar.classList.add('navbar--dark');
    
});




//  Scrollting to Contact when clicking the "Contact Me" button.
const ContactMeBtn = document.querySelector('.home__contact');
ContactMeBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});




// Make Home fade out when scrolling down
const home = document.querySelector('.home__container'); //쿼리셀렉터이용해서 home의 요소를 가져와서~ 
const homeHeight = home.getBoundingClientRect().height;// getBoundingClient이요해서 홈의 높이를 가져온다. 
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight; //왜 .home__container가 아니라 .home에 있는 요소를 가져오는 것일까
});

// Show arrow-up button and move it up to the top when clicked.

// Handle click on the "arrow up" button
const arrowUpBtn = document.querySelector('.arrowUp');
arrowUpBtn.addEventListener('click', () => {
    scrollIntoView('#home');
})


document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUpBtn.classList.add('visible'); //arrowUpBtn에있는 visible이라는 class를 추가해준다.
    } else {
        arrowUpBtn.classList.remove('visible'); // arrowUpBtn에 visible이라는 class를 제거해준다.
    }
});

//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const proejcts = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // 여기 이해 하나도 안감. Let's revisit to learn! 
    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.catetory__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');

    setTimeout(() => {
        proejcts.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        }); 
        projectContainer.classList.remove('anim-out'); //opacity가 다시 1로 돌아올 수 있도록 anim을
    }, 300);
});



    home.style.opacity = 1 - window.scrollY / homeHeight; // 왜 home__container가 아니라 home.일까? 

    // 
    // 1.모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
    // 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
    // 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다. 

    // 1.[구현]모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
    const sectionIds = [ //문자열을 가지고 있는 배열임. section DOM요소로 변환하려면 map이라는 API를 쓴다. 
        '#home', 
        '#about',
        '#skills',
        '#work', 
        '#testimonials', 
        '#contact',
    ];

    const sections = sectionIds.map(id => document.querySelector(id));
    const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))
    //``를 쓰고 [] 속성 selector를 선택해서 ${id}정해진 id를 지정해주면 된다. 
    
    // [완료] 1.모든 섹션 요소들과 메뉴아이템들을 가지고 온다.


    // 2. [구현] IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
    
        let selectedNavIndex = 0; //로컬 변수가 아니므로 좀 더 의미있는 이름으로 변경 
        let selectedNavItem = navItems[0];
        function selectNavItem(selected) {
            selectedNavItem.classList.remove('active');
            selectedNavItem = selected;
            selectedNavItem.classList.add('active');
        }

        function scrollIntoView(selector) {
            const scrollTo = document.querySelector(selector);
            scrollTo.scrollIntoView({behavior: "smooth"});
            selectNavItem(navItems[sectionIds.indexOf(selector)]); 
        };

        const observerOptions = {       //option 정의하기 
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    }
    
    const observerCallback = (entries, observer) => { // 함수: entries와 observer라는 인자를 받는 callback함수 
        entries.forEach(entry => { //entries를 빙글빙글 돌면서 우리가 원하는 일들을 해주면 되겠죠~ 
            if(!entry.isIntersecting && entry.intersectionRatio > 0) { //entry가빠져나갈 때, entry의 intersectionRatio가 0이상인 경우,
                const index = sectionIds.indexOf(`#${entry.target.id}`); //이거 어렵 (entry에 있는 target에 있는 id를 가지고 와서)
                //console.log(index, entry.target.id);
                //이제는 방향을 찾아야 한다.
                //(-)라는 것은 scrolling이 아래로 되어서 페이지가 올라옴 
                
                if(entry.boundingClientRect.y < 0) {
                    selectedNavIndex = index + 1;
                } else {
                    selectedNavIndex = index - 1; 
                }
                const navItem = navItems[selectedNavIndex];
                
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);  //새로운 observer를 만들어서 intersectionObserver 
//해당하는 callback과 option을 전달한 다음에 만들어진 observer를 이용해서 각각의 section들을 관찰하는 것이다. 
// 159가서 option정의하기.165가서 callback함수 만들기. 


sections.forEach(section => observer.observe(section)); // 여기까지 observer를 만들어주었으니, 우리의 section들을 관찰해 주어야 한다! 
//sections들을 빙글빙글돌면서 해당하는 section을 observer야 우리꺼 관찰좀 해줘! 
// 이제 중요한게 남음. callback (165)에 가서 해당하는 섹션을 찾아서 navbar menu를 활성화해 주는 일을 하면 된다. 

// scrolling할 때 sectiond에 맞게 navbar menu에 activated 표시되게 만들기. 

window.addEventListener('wheel', () => { //사용자가 스스로 scroll할 때에는 wheel이라는 이벤트가 발생. 
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
        };
    selectNavItem(navItems[selectedNavIndex]);
})

