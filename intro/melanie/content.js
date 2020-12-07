
const imgs = document.body.getElementsByTagName("img");

for (const img of imgs) {
    img.style.transform = "rotate(" + Math.random(1)*100  + "deg)";
    img.classList.add("rotate");
    console.log('sisi');
}