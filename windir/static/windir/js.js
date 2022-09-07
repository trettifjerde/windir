window.addEventListener('load', ()=> {
    checkCookies();
    scrollDown();
})


function addCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Thu, 19 Sep 2030 12:00:00 UTC; Path=/`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/`;
}

function getCookie(name) {
    return decodeURIComponent(document.cookie)
        .split('; ')
        .find(entry => entry.startsWith(name))
        ?.split('=')[1];
}

function openNav() {
    const nav = document.querySelector('nav');
    const navBar = document.querySelector('#nav-links');

    if (! nav.classList.contains("nav-open")) {
        // show nav bar
        event.stopPropagation();
        nav.classList.add('nav-open');
        navBar.classList.add('open-nav');
        navBar.addEventListener('animationend', ()=> {
            navBar.classList.remove('open-nav');
        }, {once:true});
        // add event listener to hide it
        document.addEventListener('click', () => {
            navBar.classList.add('close-nav');
            navBar.addEventListener('animationend', ()=> {
                navBar.classList.remove('close-nav');
                nav.classList.remove('nav-open');
            }, {once: true});
        }, {once: true});
    }
};

function toggleNavBar() {
    const nav = document.querySelector('nav');
    const content = document.querySelector('#content');
    if (window.innerWidth > window.innerHeight) {

        if (content.scrollTop > content.querySelector('header').offsetHeight - nav.offsetHeight)
        {
            nav.classList.replace('nav-white', 'nav-black');
            nav.querySelector('#nav-up-btn').classList.remove('hidden');
            nav.querySelector('#nav-theme-btn').classList.remove('hidden');
        }
        else 
        {
            nav.classList.replace('nav-black', 'nav-white');
            nav.querySelector('#nav-up-btn').classList.add('hidden');
            nav.querySelector('#nav-theme-btn').classList.add('hidden');
        }
    }
    else {
        nav.classList.replace('nav-white', 'nav-black');
        
        if (content.scrollTop > document.querySelector('header').offsetHeight  * 0.7)         {
            nav.querySelector('#nav-up-btn').classList.remove('hidden');
            nav.querySelector('#nav-theme-btn').classList.remove('hidden');
        }
        else 
        {
            nav.querySelector('#nav-up-btn').classList.add('hidden');
            nav.querySelector('#nav-theme-btn').classList.add('hidden');
        }
    }
}

function scrollUp() {
    document.querySelector('#content').scrollTo({top: 0, behavior: 'smooth'});
}

function agreeToCookies() {
    addCookie('agree', 'y');

    const ca = document.getElementById("cookie-agreement");
    ca.classList.add("fade-out");
    ca.addEventListener('animationend', ()=> {
        ca.classList.remove("fade-out");
        ca.classList.add('hidden');
    }, {once:true});
}

function switchTheme() {
    const dark = document.querySelector('main').classList.toggle('dark');
    if (dark)
        addCookie('dark', 'y');
    else
        deleteCookie('dark');
}

function checkCookies() {
    if (getCookie('dark'))
        document.querySelector('main').classList.add('dark');

    if (!getCookie('agree'))
        document.querySelector('#cookie-agreement').classList.remove('hidden');
}

function scrollDown() {
    if (document.querySelector('main')) {
        document.querySelector('#content').scrollTo({
            top: document.querySelector('main').offsetTop, 
            behavior: 'smooth'});
        document.querySelector('#content').addEventListener('scroll', toggleNavBar);
    }
    if (window.innerHeight > window.innerWidth)
        document.querySelector('nav').classList.replace('nav-white', 'nav-black');
}