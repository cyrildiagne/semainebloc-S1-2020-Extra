chrome.extension.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === 'clickButtons') {
    await waitForDocumentReady();
    let state = await searchAndClick('a');
  }
});

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.classList.add('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

function drawCanvas(history) {
  // Add link
  for (const link of history) {
    console.log(link);
    const a = document.createElement('a');
    a.innerText = link.text;
    a.href = link.href;
    a.classList.add('link')
    a.style.left = Math.floor(link.coords.x) + 'px';
    a.style.top = Math.floor(link.coords.y) + 'px';
    container.appendChild(a);
  }

  // Draw lines
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.moveTo(history[0].coords.x + 50, history[0].coords.y + 50);
  for (const link of history) {
    ctx.lineTo(link.coords.x + 50, link.coords.y + 50);
  }
  ctx.stroke();
}

async function load() {
  await waitForDocumentReady();
  chrome.runtime.sendMessage({ action: 'getHistory' }, resp) => {
    console.log('history is:', resp, test);
    console.log(chrome.runtime.lastError);
    if (resp) {
      console.log('history draw canvas');
      drawCanvas(resp.links);
    }
  });
}
load();

async function searchAndClick(selector) {
  const hyperlinks = document.querySelectorAll(selector);

  if (hyperlinks.length === 0) return false;

  const randomIndex = Math.floor(Math.random() * hyperlinks.length);
  const randomHyperlink = hyperlinks[randomIndex];

  randomHyperlink.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });

  await waitForScrollEnd();

  // console.log(randomHyperlink);
  const coords = randomHyperlink.getBoundingClientRect();
  const text = randomHyperlink.innerText;
  const href = randomHyperlink.href;
  const link = { coords: coords, text: text, href: href };

  chrome.extension.sendMessage({
    action: 'newPage',
    link: link,
  });

  randomHyperlink.classList.add('wanderer--highlight');

  await delay(500);

  randomHyperlink.click();

  return true;
}
