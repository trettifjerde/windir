const disabled = new Set();

window.addEventListener('load', ()=> {
    checkCookies();
    scrollDown();
    document.querySelectorAll('form').forEach(form => {
        form.querySelectorAll('.input').forEach(input => input.addEventListener('focus', ()=> hideRed(input)));
    })
})

async function getData(url, method="GET", data=null, toJson=true) {
    const headers = {'X-Requested-With': 'XMLHttpRequest'};
    const body = data && toJson ? JSON.stringify(data) : data;

    if (method !== "GET")
        headers['X-CSRFToken'] = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    try 
    {
        return await fetch(url, {
            method: method,  
            headers: headers,
            body: body
        })
        .then(res => res.json())
    }
    catch {
        return {error: 'Проблема с интернет-подключением'};
    };
}


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

async function login() {
    const btn = event.target;
    const form = event.target.form;
    btn.disabled = true;
    let valid = true;

    for (const el of form.elements) {
        if (! el.checkValidity()) {
            markRed(el);
            valid = false;
        }
    }

    if (!valid) btn.disabled = false;
    else {
        const res = await getData('/login/', 'POST', {'username': form.username.value, 'password': form.password.value});

        if ('success' in res) location.reload(true);
        else {
            if ('error' in res) form.querySelector('.error-msg').innerHTML = res.error;
            else if ('user-error' in res) {
                form.querySelector('.error-msg').innerHTML = res['user-error'];
                markRed(form.username);
                markRed(form.password);
            }
            else {
                form.querySelector('.error-msg').innerHTML = "Произошла ошибка, свяжитесь с администратором";
                console.log(res);
            };
        }
        btn.disabled = false;
    }
}

async function logout() {
    const res = await getData('/logout/');
    if ('error' in res) document.querySelector('.error-msg').innerHTML = res.error;
    else window.location.reload(true);
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
    if (window.innerWidth > 700) {

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

function hideRed(input) {
    input.classList.remove('invalid');
}

function markRed(input, msg=null) {
    input.classList.add('invalid');
    if (input.nextElementSibling?.classList.contains('form-error')) {
        input.nextElementSibling.innerHTML = msg ? msg.join(' ') : 'Обязательное поле';
    }
}

function check_login_format() {
    const login = event.target;
    let reg = /^[A-Za-z0-9-_]+$/;
    if (login.value && !reg.test(login.value))
        markRed(login, 'Допустимые сиволы: A-Z a-z 0-9 _ -');
    else
        hideRed(login);
}

function check_confirm(passwordId, confirmId)
{
    const pass = document.getElementById(passwordId);
    const confirm = document.getElementById(confirmId);
    if (pass.value === confirm.value)
    {
        hideRed(confirm);
        return true;
    }
    else if (event.type !== "input"){
        markRed(confirm, 'Пароли не совпадают');
        return false;
    }
}

function switchContact() {
    const contact = document.querySelector('#contact');
    if (event.target.checked) {
        contact.type = "text";
        document.getElementById("contact-label").innerHTML = "Никнейм";
    }
    else {
        contact.type = "email";
        document.getElementById("contact-label").innerHTML = "Электронная почта";
    }
    contact.value = "";
    contact.focus();
}

function showOtherProjects() {
    document.querySelector('.other-proj').classList.toggle('none');
}

function openProfile() {
    //document.querySelector('#profile-form-div').classList.toggle('hidden');
}

async function register() {
    const btn = event.target;
    const form = event.target.form;
    btn.disabled = true;

    let valid = check_confirm('reg-password', 'confirm');
    
    for (const el of form.elements){
        if (!el.checkValidity())
        {
            markRed(el);
            valid = false;
        }
    }

    if (valid) {
        const res = await getData('/register/', 'POST', new FormData(form), false);
        if ('success' in res) {
            document.querySelector('main').innerHTML = "<h3>Заявка отправлена</h3>";
            document.querySelector('main').scrollIntoView({behavior:'smooth'});
        }
        else if ('errors' in res) {
            markFormInvalid(form, errors=res.errors);
        }
        else markFormInvalid(form, msg='Произошла ошибка. Повторите позже.')
        btn.disabled = false;
    }
    else {
        markFormInvalid(form);
        btn.disabled = false;
    }
}

function markFormInvalid(form, errors=null, msg=null) {
    if (errors) {
        for (let name in errors) {
            markRed(form[name], errors[name]);
        }
    }
    form.querySelector('.error-msg').innerHTML = msg? msg : "Не все поля заполнены верно";
    document.querySelector('main').scrollIntoView({behavior:'smooth'});
}