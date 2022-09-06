function open_nav()
{
    let nav_img = document.getElementById("nav-img-menu");
    let menu = document.getElementById("nav-menu");

    if (menu.classList.contains("invisible"))
    {
        menu.classList.remove("invisible");
    }
    if (menu.classList.contains("nav-menu-hide"))
    {
        nav_img.src = "/img/menu_close.png";
    }
    else
    {
        nav_img.src = "/img/menu_white.png";
    }
    menu.classList.toggle("nav-menu-hide");
    menu.classList.toggle("nav-menu-show");
}

function scroll_up()
{
    let now = document.documentElement.scrollTop;
    if (now > document.getElementById("header").offsetHeight)
    {
        window.scrollTo(0, now - now/20);
        window.requestAnimationFrame(scroll_up);
    }
}

function scroll_down()
{
    let now = document.documentElement.scrollTop;
    if (now < document.getElementById("header").offsetHeight - document.getElementById("nav-img-menu").offsetHeight
    && now < document.documentElement.offsetHeight - document.documentElement.clientHeight)
    {
        window.scrollTo(0, now*1 + 25);
        window.requestAnimationFrame(scroll_down);
    }
}

document.addEventListener("scroll", function(){
    function toggle_nav_img(img, condition)
    {
        var element = document.getElementById(img);
        var img_show = element.classList.contains("show");
        var img_hide = element.classList.contains("hide") || element.classList.contains("invisible");
        if (document.documentElement.scrollTop > condition && img_hide)
        {
            if (element.classList.contains("invisible"))
            {
                element.classList.remove("invisible");
            }
            element.classList.remove("hide");
            element.classList.add("show");
        }
        else if (document.documentElement.scrollTop <= condition && img_show)
        {
            element.classList.remove("show");
            element.classList.add("hide");
        }
    }
    function toggle_els()
    {
        document.getElementById("nav").classList.toggle("nav-white");
        document.getElementById("nav").classList.toggle("nav-black");
        document.getElementById("nav-menu").classList.toggle("nav-menu-white");
        document.getElementById("nav-menu").classList.toggle("nav-menu-black");

        let imgs = document.getElementsByClassName("nav-img");
        for (let i = 0; i < imgs.length; i++)
        {
            imgs[i].classList.toggle("nav-img-white");
            imgs[i].classList.toggle("nav-img-black");
        }
        let divs = document.getElementsByClassName("nav-div");
        for (let i = 0; i < divs.length; i++)
        {
            divs[i].classList.toggle("nav-div-white");
            divs[i].classList.toggle("nav-div-black");
        }
    }
    var bool_for_arrow = document.getElementById("header").offsetHeight + document.getElementById("main").offsetHeight / 6;
    var bool_for_nav = document.getElementById("header").offsetHeight - document.getElementById("nav-img-menu").offsetHeight;
    var nav_white = document.getElementById("nav").classList.contains("nav-white");
    var nav_black = document.getElementById("nav").classList.contains("nav-black");
    toggle_nav_img("nav-img-back", bool_for_arrow);
    toggle_nav_img("nav-img-mode", bool_for_nav);

    if (document.documentElement.scrollTop > bool_for_nav && nav_white)
    {
        toggle_els();
    }
    else if (document.documentElement.scrollTop <= bool_for_nav && nav_black)
    {
        toggle_els();
    }
})

function open_profile()
{
    let profile = document.getElementById("profile");
    if (profile.classList.contains("invisible"))
    {
        profile.classList.remove("invisible");
    }
    profile.classList.toggle("show");
    profile.classList.toggle("hide");
}

function hide_profile()
{
    document.getElementById("profile").classList.remove("show");
    document.getElementById("profile").classList.add("hide");
}

function check_empty(form)
{
    let inputs = form.querySelectorAll("input");
    let error = 0;
    for (let i = 0; i < inputs.length; i++)
    {
        if (inputs[i].value == "" && inputs[i].classList.contains("req"))
        {
            inputs[i].classList.add("error");
            event.preventDefault();
            error = 1;
        }
    }
    let selects = form.querySelectorAll("select");
    for (i = 0; i < selects.length; i++)
    {
        if (selects[i].classList.contains("req") && selects[i].selectedIndex == 0)
        {
            selects[i].classList.add("error");
            error = 1;
        }
    }
    if (form.id == "register-form" && error == 1)
    {
        document.getElementById("register-error").innerHTML = "Заполните обязательные поля";
        scroll_up();
    }
    return error;
}

function hide_red(object)
{
    object.classList.remove("error");
}

function trim_date(input)
{
    if (input.length < 2)
    {
    return("0" + input);
    }
    else
    {
    return(input);
    }
}

function jsonify(form)
{
    let json = {};
    let inputs = form.querySelectorAll("input");
    let selects = form.querySelectorAll("select");
    for (i = 0; i < inputs.length; i++)
    {
        if (inputs[i].id == "remember" || inputs[i].id == "telegram")
        {
            if (inputs[i].checked)
            {
                json[inputs[i].name] = true;
            }
            else
            {
                json[inputs[i].name] = false;
            }
        }
        else if (inputs[i].type == "checkbox" && inputs[i].checked == true)
        {
            if (inputs[i].value == "other")
            {
                continue;
            }
            if (!json[inputs[i].name])
            {
                json[inputs[i].name] = new Array();
            }
            json[inputs[i].name][json[inputs[i].name].length] = inputs[i].value*1;
        }
        else if (inputs[i].type != "checkbox" && inputs[i].name)
        {
            if (inputs[i].value == "")
            {
                continue;
            }
            else if (inputs[i].name == "birth-day")
            {
                json["born"] = trim_date(inputs[i].value);
            }
            else if (inputs[i].name == "birth-month" || inputs[i].name == "birth-year")
            {
                json["born"] += "." + trim_date(inputs[i].value);
            }
            else if (inputs[i].type == "number")
            {
                json[inputs[i].name] = inputs[i].value*1;
            }
            else
            {
                json[inputs[i].name] = inputs[i].value;
            }
        }
    }
    for (i = 0; i < selects.length; i++)
    {
        for (j = 0; j < selects[i].options.length; j++)
        {
            if (selects[i].options[j].selected)
            {
                json[selects[i].name] = selects[i].options[j].value*1;
            }
        }
    }
    if (form.name == "register-form")
    {
        if (!json["token"])
        {
            json["token"] = "";
        }
    }
    let data = JSON.stringify(json);
    return data;
}

function send_ajax(data, url)
{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (ajax.status == 200 && ajax.readyState == 4)
        {
            let response = JSON.parse(ajax.responseText);
            if (response.result == true)
            {
                if (url == "/newmember")
                {
                    document.getElementById("main").innerHTML = "<h2 class='good'>Форма успешно отправлена.</h2>";
                }
                else if (url == "/login")
                {
                    window.location.reload(true);
                }
                else if (url == "/changepwd")
                {
                    document.getElementById("error-message").innerHTML = "Пароль успешно изменен";
                    document.getElementById("old_pwd").value = "";
                    document.getElementById("new_pwd").value = "";
                    document.getElementById("new_confirm").value = "";
                    hide_profile();
                }
            }
            else
            {
                if (url == "/newmember")
                {
                    document.getElementById("main").innerHTML = "<h2 class='bad'> Не удалось отправить заявку. Повторите позже</h2>";
                }
                else if (url == "/login")
                {
                    document.getElementById("error-message").innerHTML = "Неверный логин или пароль";
                }
                else if (url == "/changepwd")
                {
                    document.getElementById("error-message").innerHTML = "Неверный текущий пароль";
                }
            }
        }
    }

    ajax.open("POST", url);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(data);
}

function send_form(form, url)
{
    event.preventDefault();
    if (!check_empty(form))
    {
        data = jsonify(form);
        send_ajax(data, url);
    }
}

function check_confirm(pass, confirm)
{
    let error = 0;
    if (document.getElementById(pass).value != document.getElementById(confirm).value)
    {
        document.getElementById(confirm).classList.add("error");
        error = 1;
    }
    else
    {
        hide_red(document.getElementById(confirm));
    }
    return error;
}

function check_pass_change(form)
{
    event.preventDefault();
    if (!check_empty(form))
    {
        if (!check_confirm('new_pwd', 'new_confirm'))
        {
            let json = {};
            json["nickname"] = document.getElementById("windir").innerHTML;
            json["old_pwd"] = document.getElementById("old_pwd").value;
            json["new_pwd"] = document.getElementById("new_pwd").value;

            let data = JSON.stringify(json);
            send_ajax(data, "/changepwd");
        }
    }
}

function logout()
{
    event.preventDefault();
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        let response = JSON.parse(ajax.responseText);
        if (response.result == true)
        {
            window.location.reload(true);
        }
    }
    ajax.open("GET", "/logout");
    ajax.send();
}

function table_upd(td)
{
    td.classList.toggle("present");
    td.classList.toggle("absent");
    let data = {};
    data["nickname"] = document.getElementById("windir").innerHTML;
    data["game"] = td.id*1;
    data["choice"] = td.classList.contains("present") ? true : false;
    let json = JSON.stringify(data);
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (ajax.status == 200 && ajax.readyState == 4)
        {
            let response = JSON.parse(ajax.responseText);
            if (response.result == false)
            {
                document.getElementById("table-error").innerHTML = "Произошла ошибка. Повторите позже";
            }
        }
    }
    ajax.open("POST", "/tableupd");
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(json);
}

function get_table()
{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (ajax.status == 200 && ajax.readyState == 4)
        {
            let header = '<table><tr><th rowspan="2" id="refresh-th">';
            header += '<img src="/img/refresh.png" id="refresh-img" onclick="get_table()"></th>';

            let projects_img = new Array();
            let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            let times = ["21:00", "21:00", "21:00", "21:00", "21:00", "21:00", "20:00"];

            let begs = new Array();
            for (i = 0; i < days.length; i++)
            {
                begs.push("<b>" + days[i] + "</b><br> с " + times[i]);
            }
            projects_img[0] = '/img/windir.png';
            projects_img[1] = '/img/windir.png';
            projects_img[2] = '/img/sg-img.png';
            projects_img[3] = '/img/windir.png';
            projects_img[4] = '/img/sg-img.png';
            projects_img[5] = '/img/sg-img.png';
            projects_img[6] = '/img/windir.png';

            for (i = 0; i < projects_img.length; i++)
            {
                header += '<th colspan="2" class="not-empty"><img src ="' + projects_img[i] + '" class="project-img">' + begs[i] + '</th>';
            }

            header += '</tr><tr>';

            for (i=0; i < 7; i++)
            {
                header += '<th class="not-empty">I</th>';
                header += '<th class="not-empty">II</th>';
            }
            header += '</tr>';

            me = document.getElementById("windir") ? document.getElementById("windir").innerHTML : 0;

            body = "";
            json = JSON.parse(ajax.responseText);
            for (i = 0; i < json.people.length; i++)
            {
                if (json.people[i].nickname == me)
                {
                    body += '<tr><td class="not-empty login-me sticky-login">' + json.people[i].nickname + '</td>';
                    for (j = 0; j < json.people[i].games.length; j++)
                    {
                        if (json.people[i].games[j] == true)
                        {
                            body += '<td class="present me" id="' + j +'" onclick="table_upd(this)"></td>';
                        }
                        else
                        {
                            body += '<td class="absent me" id="' + j +'" onclick="table_upd(this)"></td>';
                        }
                    }
                }
                else
                {
                    body += '<tr><td class="not-empty sticky-login">' + json.people[i].nickname + '</td>';
                    for (j = 0; j < json.people[i].games.length; j++)
                    {
                        if (json.people[i].games[j] == true)
                        {
                            body += '<td class="present"></td>';
                        }
                        else
                        {
                            body += '<td class="absent"></td>';
                        }
                    }
                }
                body += '</tr>';
            }
            body += '</table>';
            document.getElementById("table").innerHTML = header + body;
        }
    }
    ajax.open("GET", "/get_table");
    ajax.send();
}

function start_dob(element)
{
    if ((element.id == "birth-day" && element.value.length == 2) ||
    (element.id == "birth-month" && element.value.length == 2) ||
    (element.id == "birth-year" && element.value.length == 4))
    {
        check_dob(element);
    }
}

function check_dob(element)
{
    if (element.id == "birth-day" && element.value > 0 && element.value < 32)
    {
        if (event.type != "change")
        {
            hide_red(element);
            document.getElementById("birth-month").focus();
        }
    }
    else if (element.id == "birth-month" && element.value > 0 && element.value < 13)
    {
        if (event.type != "change")
        {
            hide_red(element);
            document.getElementById("birth-year").focus();
        }
    }
    else if (element.id == "birth-year" && element.value > 1949 && element.value < 2006)
    {
        hide_red(element);
        element.blur();
    }
    else
    {
        element.value = "";
        element.focus();
        element.classList.add("error");
    }
}

function check_login_format(login)
{
    let reg = new RegExp("^[A-Za-z0-9-_]+$");
    if (!reg.test(login.value))
    {
        login.classList.add("error");
    }
    else
    {
        hide_red(login);
    }
}

function switch_contact()
{
    if (document.getElementById("telegram").checked)
    {
        document.getElementById("contact-label").innerHTML = "Никнейм в Telegram";
    }
    else
    {
        document.getElementById("contact-label").innerHTML = "Электронная почта";
    }
    document.getElementById("contact").focus();
}

function projects_other_activate()
{
    if (document.getElementById("projects-other").classList.contains("invisible"))
    {
        document.getElementById("projects-other").classList.remove("invisible");
        document.getElementById("projects-other").classList.add("show");
    }
    else
    {
        document.getElementById("projects-other").classList.toggle("show");
        document.getElementById("projects-other").classList.toggle("hide");
    }
    if (document.getElementById("projects-other").classList.contains("show"))
    {
        document.getElementById("projects-other").focus();
    }
}

function get_role_list()
{
    let html = '<div class="col-left"><label for="">Предпочитаемая специализация</label></div><div class="col-right">';
        let roles_dict = {"role":[]};
        roles_dict["role"].push({"number": 100, "name": "КС"});
        roles_dict["role"].push({"number": 101, "name": "КО"});
        roles_dict["role"].push({"number": 102, "name": "ЗамКО"});
        roles_dict["role"].push({"number": 103, "name": "Стрелок ГП"});
        roles_dict["role"].push({"number": 104, "name": "Пулеметчик"});
        roles_dict["role"].push({"number": 105, "name": "Медик"});
        roles_dict["role"].push({"number": 106, "name": "Гранатометчик"});
        roles_dict["role"].push({"number": 107, "name": "Снайпер"});
        roles_dict["role"].push({"number": 108, "name": "Стрелок"});
        roles_dict["role"].push({"number": 109, "name": "Инженер"});
        roles_dict["role"].push({"number": 110, "name": "Пилот"});
        roles_dict["role"].push({"number": 111, "name": "Мехвод"});
        roles_dict["role"].push({"number": 112, "name": "Наводчик"});
        roles_dict["role"].push({"number": 113, "name": "Сапер"});
        roles_dict["role"].push({"number": 114, "name": "Артиллерист"});

        html += '<div class="row">';

    if (window.innerHeight < window.innerWidth)
    {
        for (i = 0; i < roles_dict.role.length; i++)
        {
            if (i > 0 && i%3 == 0)
            {
                html += '</div><div class="row">';
            }
            html += '<div class="col-check-3"><label><input type="checkbox" name="role" value="'
                + roles_dict.role[i].number + '">' + roles_dict.role[i].name + '</label></div>';
        }

        html += '</div></div>';
        document.getElementById("role-list").innerHTML = html;
    }
    else
    {
        for (i=0; i< roles_dict.role.length; i++)
        {
            if (i > 0 && i%2 == 0)
            {
                html += '</div><div class="row">';
            }
            html += '<div class="col-check-50"><label><input type="checkbox" name="role" value="'
                + roles_dict.role[i].number + '">' + roles_dict.role[i].name + '</label></div>';
        }
        html += '</div></div>';
        document.getElementById("role-list").innerHTML = html;
    }
}

function get_projects_list()
{
    let projects_list = {"project": []};
    projects_list["project"].push({"number": 53, "name": "RedBear"});
    projects_list["project"].push({"number": 50, "name": "WOG"});
    projects_list["project"].push({"number": 51, "name": "WOG3"});
    projects_list["project"].push({"number": 54, "name": "SquadGames"});
    projects_list["project"].push({"number": 52, "name": "HMG"});
    projects_list["project"].push({"number": 55, "name": "Tushino"});
    projects_list["project"].push({"number": 56, "name": "FT-2"});
    projects_list["project"].push({"number": 57, "name": "Domination"});
    let html = '<div class="row">';

    if (window.innerWidth > window.innerHeight)
    {
        for (i = 0; i < projects_list.project.length; i++)
        {
            if (i > 0 && i%4 == 3)
            {
                html += '<label class="col-check-40"><input type="checkbox" name="projects" value="'
                    + projects_list.project[i].number + '">' + projects_list.project[i].name + '</label>';
            }
            else
            {
                if (i > 0 && i%4 == 0)
                {
                    html += '</div><div class="row">'
                }
                html += '<label class="col-check-20"><input type="checkbox" name="projects" value="'
                    + projects_list.project[i].number + '">' + projects_list.project[i].name + '</label>';
            }
        }
    }
    else
    {
        for (i = 0; i < projects_list.project.length; i++)
        {
            if (i > 0 && i%2 == 0)
            {
                html += '</div><div class="row">'
            }
            html += '<label class="col-check-50"><input type="checkbox" name="projects" value="'
                + projects_list.project[i].number + '">' + projects_list.project[i].name + '</label>';
        }
    }
    html += '</div><div class="row">';
    html += '<input type="checkbox" id="projects-other-check" name="projects" value="other"';
    html += 'onclick="projects_other_activate()">';
    html += '<label for="projects-other-check" id="projects-other-label">Другое</label>';
    html += '<input type="text" id="projects-other" name="projects-other" maxlength="30" class="register-input invisible"></div>';

    document.getElementById("projects-list").innerHTML = html;
}

function set_cookie()
{
    document.cookie = "agree=y; expires=Thu, 19 Sep 2030 12:00:00 UTC";
    document.getElementById("cookie-agreement").classList.add("invisible");
}

function check_cookie()
{
    let cookie = decodeURIComponent(document.cookie);
    let main = document.getElementById("main");
    if (main)
    {
        let search = "scheme=";
        let scheme = cookie.indexOf(search);
        if (scheme == -1)
        {
            document.cookie = "scheme=d";
            main.classList.add("day");
        }
        else
        {
            if (cookie.charAt(scheme + search.length) == "d")
            {
                main.classList.add("day");
            }
            else
            {
                main.classList.add("night");
            }
        }
    }
    search = "agree=y";
    if (cookie.indexOf(search) == -1)
    {
        document.getElementById("cookie-agreement").classList.remove("invisible");
    }

}

function clear_cookie()
{
    document.cookie = "agree=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function hide_nav_bar_on_idle_click(){
    if (!event.target.classList.contains("nav-div") && !event.target.classList.contains("nav-img"))
    {
        if (document.getElementById("nav-menu").classList.contains("nav-menu-show"))
        {
            open_nav();
        }
    }
}

document.addEventListener("click", hide_nav_bar_on_idle_click);
document.addEventListener("touchstart", hide_nav_bar_on_idle_click);

window.onload = function(){
    check_cookie();
    if (document.getElementById("main") && window.performance.navigation.type != 1)
        {
            if (document.documentElement.scrollTop > document.getElementById("header").offsetHeight)
            {
                scroll_up();
            }
            else
            {
                scroll_down();
            }
        }
};

function switch_color()
{
    let main = document.getElementById("main");
    let cookie = decodeURIComponent(document.cookie);
    let now = cookie.charAt(cookie.indexOf("scheme=")+7);
    if (now == "d")
    {
        document.cookie = "scheme=n";
    }
    else
    {
        document.cookie = "scheme=d";
    }
    main.classList.toggle("day");
    main.classList.toggle("night");
}

function get_videos()
{
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (ajax.readyState == 4 && ajax.status == 200)
        {
            var videos = JSON.parse(ajax.responseText);
            videos = videos["video"];
            var innerText = "";
            l = videos.length;
            for (i = 0; i < l; i++)
            {
                innerText += '<iframe class="video-item" src="' + videos[i] + '"></iframe>';
            }
            document.getElementById("video-container").innerHTML = innerText;
        }
    }
    ajax.open("GET", "/get_videos");
    ajax.send();

}
