console.log("I'm three  extension")
let p = document.getElementsByTagName("p");
/* for (par of p) {
    par.style.backgroundColor = "red"
    console.log(par.style);
} */

chrome.runtime.onMessage.addListener((message, sender, response) => {
    console.log(message.txt)
});

document.onmousemove = (e) => {
    /* console.log(e.target) */
    e.target.originalColor = e.target.style.backgroundColor
    console.log(e.target.originalColor)
    e.target.style.backgroundColor = "orange"
    e.target.onmouseleave = () => {
        e.target.style.backgroundColor = e.target.originalColor;
        console.log(e.target.originalColor)
        console.log("removed")
        e.target.removeEventListener("mouseleave", e.onmouseleave);
    }
}