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

function drawCanvas(history) {
  for (const page of history) {
    console.log(page);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.ellipse(page.coords.x, page.coords.y, 50, 50, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

async function load() {
  await waitForDocumentReady();
  chrome.runtime.sendMessage('getHistory', (resp, test) => {
    console.log('history is:', resp, test);
    if (resp) {
      console.log('history draw canvas');
      drawCanvas(resp);
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
