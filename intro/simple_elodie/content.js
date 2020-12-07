console.log("ca marche");

var paras = document.querySelectorAll('p'), i;
for (i = 0; i < paras.length; ++i) {
  paras[i].style.transform = "rotate(45deg)";
}