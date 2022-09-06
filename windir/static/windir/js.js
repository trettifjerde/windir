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
    const navBar = document.querySelector('#nav-bar');

    if (navBar.classList.contains("hidden")) {
        // show nav bar
        event.stopPropagation();
        navBar.classList.remove('hidden');
        navBar.classList.add('open-nav');
        navBar.addEventListener('animationend', ()=> {
            navBar.classList.remove('open-nav');
        }, {once:true});
        // add event listener to hide it
        document.addEventListener('click', () => {
            navBar.classList.add('close-nav');
            navBar.addEventListener('animationend', ()=> {
                navBar.classList.remove('close-nav');
                navBar.classList.add('hidden');
            }, {once: true});
        }, {once: true});
    }
};

function toggleNavBar() {
    const nav = document.querySelector('nav');
    if (document.documentElement.scrollTop > document.querySelector('header').offsetHeight - nav.offsetHeight)
        nav.classList.replace('nav-white', 'nav-black');
    else 
        nav.classList.replace('nav-black', 'nav-white');
}

function scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'});
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
    const dark = document.querySelector('body').classList.toggle('dark');
    if (dark)
        addCookie('dark', 'y');
    else
        deleteCookie('dark');
}

function checkCookies() {
    if (getCookie('dark'))
        document.querySelector('body').classList.add('dark');

    if (!getCookie('agree'))
        document.querySelector('#cookie-agreement').classList.remove('hidden');
}

function scrollDown() {
    if (document.querySelector('main')) {
        document.documentElement.scrollTo({
            top: document.querySelector('main').offsetTop - document.querySelector('nav').offsetHeight, 
            behavior: 'smooth'});
    }

    document.addEventListener('scroll', toggleNavBar);
}