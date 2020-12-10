//ajout array avec toutes mes urls
const allMyUrls = ['res/pissenlits.json', 'res/pissenlits-blue.json', 'res/algaes.json', 'res/algaes-pink.json'];

//
const width = 580;
const height = 830;

function onClick(ev) {
  const el = document.createElement('div');
  el.classList.add('lottie-anim');
  el.style.left = ev.clientX - width * 0.5 + 'px';
  el.style.top = ev.clientY - height * 0.5 + 'px';
  el.style.width = width + 'px';
  el.style.height = height + 'px';

  const index = Math.floor(Math.random() * 4);
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

document.body.addEventListener('click', onClick);
