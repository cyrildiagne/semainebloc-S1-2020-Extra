console.log("ca marche");

// var paras = document.querySelectorAll('p'), i;
// for (i = 0; i < paras.length; ++i) {
//   paras[i].style.transform = "rotate(45deg)";
// }

const imgs = document.body.getElementsByTagName("img");
for(const img of imgs){
    img.style.transform = "rotate(45deg)"
    img.classList.add("rotate");
}