console.log('hello from content.js');

const imgs = document.body.getElementsByTagName('img');
for (const img of imgs){
    img.classList.add('custom-img');
}