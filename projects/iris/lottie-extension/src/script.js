//ajout array avec toutes mes urls
const allMyUrls = [
  'res/pissenlits.json',
  'res/pissenlits-blue.json',
  'res/algaes.json',
  'res/algaes-pink.json',
  'res/fish.json',
];

//
const width = 580;
const height = 830;

function addVisual(x, y) {
  const el = document.createElement('div');
  el.classList.add('lottie-anim');
  el.style.left = x - width * 0.5 + 'px';
  el.style.top = y - height * 0.5 + 'px';
  el.style.width = width + 'px';
  el.style.height = height + 'px';

  const index = Math.floor(Math.random() * 5);
  const url = allMyUrls[index];

  bodymovin.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: chrome.runtime.getURL(url),
  });
  document.body.append(el);
}

const frequency = 5000; // in ms
setInterval(() => {
  const x = window.innerWidth * Math.random();
  const y = window.innerHeight * Math.random();
  addVisual(x, y);
}, frequency);

// document.body.addEventListener('click', (ev) => {
//   addVisual(ev.clientX, ev.clientY)
// });
