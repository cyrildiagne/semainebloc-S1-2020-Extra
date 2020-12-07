const ps = document.body.querySelectorAll("p");
//const img = document.body.querySelector
const imgs = document.body.getElementsByTagName("img");


for (const img of imgs) {
    img.style.transform = "rotate(45deg)";

}


for (const p of ps){
    p.style.transform = "rotate(90deg)";
} 


