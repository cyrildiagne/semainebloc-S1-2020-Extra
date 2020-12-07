img = document.getElementsByTagName("img");
txt = document.getElementsByTagName("p");

for (let i = 0; i < img.length; i++) {
  img[i].classList.add("imgRot");
  console.log(img[i].classList.add("imgRot"));
}

for (let i = 0; i < txt.length; i++) {
  txt[i].style.fontSize = "10vw";
  txt[i].style.color = "red";
}
