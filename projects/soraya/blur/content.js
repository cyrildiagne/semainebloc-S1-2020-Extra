console.log('hello from content.js');
//document.body.style.transform="rotate(1deg)";

// const ps = document.body.querySelectorAll("p");
// for (const p of ps) {
//     p.style.transform="rotate(90deg)";
// }


const ps = document.body.getElementsByTagName("p");
for (const p of ps) {
   // img.style.transform="rotate(45deg)";
    p.classList.add('custom-p');
}

const hs = document.body.getElementsByTagName("h1");
for (const h of hs) {
   // img.style.transform="rotate(45deg)";
    h.classList.add('custom-h');
}

const imgs = document.body.getElementsByTagName("img");
for (const img of imgs) {
   // img.style.transform="rotate(45deg)";
    img.classList.add('custom-img');
}