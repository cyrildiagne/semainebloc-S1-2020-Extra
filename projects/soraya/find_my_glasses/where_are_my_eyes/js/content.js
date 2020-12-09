console.log('hello from content.js');
//document.body.style.transform="rotate(1deg)";

// const ps = document.body.querySelectorAll("p");
// for (const p of ps) {
//     p.style.transform="rotate(90deg)";
// }


const ps = document.body.getElementsByTagName("p");
for (const p of ps) {
    p.classList.add('custom-p');
}

const hs1 = document.body.getElementsByTagName("h1");
for (const h of hs1) {
    h.classList.add('custom-h');
}

const hs2 = document.body.getElementsByTagName("h2");
for (const h of hs2) {
    h.classList.add('custom-h');
}

const hs3 = document.body.getElementsByTagName("h3");
for (const h of hs3) {
    h.classList.add('custom-h');
}

const as = document.body.getElementsByTagName("a");
for (const a of as) {
    a.classList.add('custom-a');
}


const imgs = document.body.getElementsByTagName("img");
for (const img of imgs) {
   // img.style.transform="rotate(45deg)";
    img.classList.add('custom-img');
}

const lis = document.body.getElementsByTagName("li");
for (const li of lis) {
   // img.style.transform="rotate(45deg)";
    li.classList.add('custom-li');
}

const spans = document.body.getElementsByTagName("span");
for (const span of spans) {
   // img.style.transform="rotate(45deg)";
    span.classList.add('custom-span');
}

const tds = document.body.getElementsByTagName("td");
for (const td of tds) {
   // img.style.transform="rotate(45deg)";
    td.classList.add('custom-td');
}

const ths = document.body.getElementsByTagName("th");
for (const th of ths) {
    th.classList.add('custom-th');
}

const buttons = document.body.getElementsByTagName("button");
for (const button of buttons) {
    button.classList.add('custom-button');
}

// const divs = document.body.getElementsByTagName("div");
// for (const div of divs) {
//    // img.style.transform="rotate(45deg)";
//     div.classList.add('custom-div');
// }