const width = 580;
const height = 830;

function onClick(ev) {
  const el = document.createElement('div');
  el.classList.add('lottie-anim');
  el.style.left = ev.clientX - width * 0.5 + 'px';
  el.style.top = ev.clientY - height * 0.5 + 'px';
  el.style.width = width + 'px';
  el.style.height = height + 'px';

  bodymovin.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: chrome.runtime.getURL('res/pissenlits.json'),
  });
  document.body.append(el);
}

document.body.addEventListener('click', onClick);
