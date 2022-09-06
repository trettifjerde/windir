function find_modal(thumbnail_el)
{
    var modal_div = thumbnail_el.nextSibling;
    while (modal_div.nodeType != "1" && modal_div.nodeName != "DIV")
    {
        modal_div = modal_div.nextSibling;
    }
    return modal_div
}

function find_modal_img(modal_div)
{
    var modal_imgs = modal_div.getElementsByClassName("modal-content");
    return modal_imgs[0];
}

function catch_img_errs()
{
    function reload_img(event)
    {
        if(err_log[event.target.src])
        {
            if (err_log[event.target.src] < 3)
            {
                event.target.src = event.target.src;
                err_log[event.target.src] += 1;
            }
        }
        else
        {
            event.target.src = event.target.src;
            err_log[event.target.src] = 1;
        }
    }
    var err_log = {};
    var imgs = document.getElementById("main").getElementsByTagName("img");
    for(i=0; i < imgs.length; i++)
    {
        imgs[i].addEventListener("error", reload_img);
    }
}

function load_images()
{
    function isInViewport(el)
    {
        var rect = el.getBoundingClientRect();
        return (
            rect.top <= document.documentElement.clientHeight * 2 &&
            rect.bottom >= -(document.documentElement.clientHeight * 2)
            );
    }

    function lazyLoad()
    {
        for (i=0; i<lazy.length; i++)
        {
            if (isInViewport(lazy[i]) && !lazy[i].src)
            {
                lazy[i].src = lazy[i].getAttribute('data-src');
                var modal_div = find_modal(lazy[i]);
                var modal_img = find_modal_img(modal_div);
                modal_img.src = lazy[i].src;
            }
        }
    }

    var lazy = document.getElementsByClassName("lazy");
    make_thumbnails_clickable();
    catch_img_errs();
    window.addEventListener("scroll", lazyLoad);
}

function make_thumbnails_clickable()
{
    function load_modal(event)
    {
        var thumbnail_el = event.target;
        var modal_div = find_modal(thumbnail_el);
        var modal_img = find_modal_img(modal_div);
        assign_screenfit_style(modal_img);
        modal_div.style.display = "inherit";
        modal_div.addEventListener("click", close_modal);
    }
    function assign_screenfit_style(modal_img)
    {
        if (modal_img.width > document.documentElement.clientWidth &&
        modal_img.height > document.documentElement.clientHeight)
        {
            modal_img.classList.add("large-modal-img");
        }
        else if (modal_img.height > document.documentElement.clientHeight)
        {
            modal_img.classList.add("tall-modal-img");
        }
        else if (modal_img.width > document.documentElement.clientWidth)
        {
            modal_img.classList.add("wide-modal-img");
        }
        else
        {
            modal_img.classList.add("regular-modal-img");
        }
    }
    function close_modal(event)
    {
        if (event.target.classList.contains("modal-content"))
        {
            event.target.parentNode.style.display = "none";
        }
        else
        {
            event.target.style.display = "none";
        }
    }

    var thumbnails = document.getElementsByClassName("thumbnail");
    for(i=0; i < thumbnails.length; i++)
    {
        thumbnails[i].addEventListener("click", load_modal);
    }
}

load_images();