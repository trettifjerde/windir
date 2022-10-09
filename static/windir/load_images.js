document.querySelectorAll('.thumbnail').forEach(img => img.addEventListener('click', showImg));
document.querySelector('#content').addEventListener('scroll', loadImages);


function loadImages() {
    const lazies = document.querySelectorAll('.lazy');
    if (lazies.length){
        lazies.forEach(img => {
            if (document.querySelector('#content').scrollTop > img.offsetTop - 50)
            {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }
        })
    }
    else 
        document.removeEventListener('scroll', loadImages);
}

function showImg() {
    const modal = document.querySelector('.modal');
    modal.querySelector('img').src = this.src;

    document.querySelector('html').classList.add('locked');
    modal.style.display = 'flex';
    modal.classList.add('fade-in');
    modal.addEventListener('animationend', () => modal.classList.remove('fade-in'), {once: true});

    event.stopPropagation();
    document.addEventListener('click', () => {
        document.querySelector('html').classList.remove('locked');
        modal.classList.add('fade-out');
        modal.addEventListener('animationend', () => {
            modal.classList.remove('fade-out');
            modal.style.display = 'none';
        }, {once: true});
    }, {once: true});
}