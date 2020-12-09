var mouseX;
var mouseY;
mouseX = mouseY = 0;
var init = false;
var rollyRoll = false;
var frameCount = 0;

var flutterRate = .01;
var flutterAmplitude = .12;

console.log("hello asdf content !")
var rick = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thecurrent.org%2Ffeature%2F2018%2F03%2F09%2Ftoday-in-music-history-rick-rolls-us-all&psig=AOvVaw2gcMPhf2yguKzTHRzP2SDG&ust=1607433548799000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjalN_6u-0CFQAAAAAdAAAAABAD"

var a = document.getElementsByTagName("*");
var imgs = document.getElementsByTagName("img");
/* for (var i = 0; i < imgs.length; i++) {
    var e = imgs[i]
    e.src = rick;
    console.log(e.src)
} */
init = true;

var video = document.getElementsByTagName("video")[0];

function loop() {
    var fluctuation = (Math.sin(frameCount * flutterRate) + 1) / 2 * flutterAmplitude;
    video.playbackRate = 1 + Math.sin(Math.sin(Math.sin(fluctuation)));
    console.log(video.playbackRate);

    requestAnimationFrame(loop);
    frameCount++;
}
loop();

/* var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.cssClass { transform: rotate(0deg) } .cssClass:hover {transform:scale(1.2)}';
document.getElementsByTagName('head')[0].appendChild(style);
for (var i = 0; i < a.length; i++) {
    const e = a[i];
    e.classList.add("cssClass")
} */



/* console.log(a);  */
function roll() {
    for (var i = 0; i < a.length; i++) {
        /* console.log(i) */
        const e = a[i];
        /* e.style.transform = "rotate(-90" + (i / 10) + "deg) + translate(" + mouseX + "px," + mouseY + "px);"; */

        e.style.transform = "rotate(" + (mouseX - innerWidth / 2) / 1000 + "deg)"
            /* e.style.transform = "rotateX(" + (mouseX - innerWidth / 2) / 1000 + "deg) rotateY(" + (mouseY - innerHeight / 2) / 1000 + "deg);" */
            /* console.log(e.style.transform) */
            /* style.innerHTML = ".cssClass { transform: rotate( " + (mouseX - innerWidth / 2) / 1000 + "deg)}"; */
    }
}


window.onmousemove = (e) => {
    if (init) {
        if (rollyRoll) {
            roll();
        }
        /* console.log(e.clientX, e.clientY) */
        mouseX = e.clientX;
        mouseY = e.clientY;

        /* console.log("rotate(-90" + (1 / 10) + "deg) translate(" + mouseX + "px," + mouseY + "px)") */
        /*  console.log(a) */


    }
}