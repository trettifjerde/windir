function loadImages(){var e=document.querySelectorAll(".lazy");e.length?e.forEach(e=>{document.querySelector("#content").scrollTop>e.offsetTop-50&&(e.src=e.dataset.src,e.classList.remove("lazy"))}):document.removeEventListener("scroll",loadImages)}function showImg(){const e=document.querySelector(".modal");e.querySelector("img").src=this.src,document.querySelector("html").classList.add("locked"),e.style.display="flex",e.classList.add("fade-in"),e.addEventListener("animationend",()=>e.classList.remove("fade-in"),{once:!0}),event.stopPropagation(),document.addEventListener("click",()=>{document.querySelector("html").classList.remove("locked"),e.classList.add("fade-out"),e.addEventListener("animationend",()=>{e.classList.remove("fade-out"),e.style.display="none"},{once:!0})},{once:!0})}document.querySelectorAll(".thumbnail").forEach(e=>e.addEventListener("click",showImg)),document.querySelector("#content").addEventListener("scroll",loadImages);