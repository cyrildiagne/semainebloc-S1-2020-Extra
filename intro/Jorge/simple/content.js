console.log("hello from  fromcontent.js")

const imgs = document.body.getElementsByTagName('img')
for (const img of imgs) {
    img.style.transform = 'rotate(45deg)';
}