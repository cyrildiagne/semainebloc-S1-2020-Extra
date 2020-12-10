particlesSettings.particles.number.value = 100;

async function run() {
  const container = document.createElement('div');
  container.id = 'particles-js';
  document.body.appendChild(container);

  particlesJS('particles-js', particlesSettings);
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});
