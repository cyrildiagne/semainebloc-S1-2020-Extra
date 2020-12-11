class Visual {
  constructor(animationPath, x, y) {
    this.x = x;
    this.y = y;

    const el = document.createElement('div');
    this.el = el;
    el.classList.add('lottie-anim');
    el.style.left = -width * 0.5 + 'px';
    el.style.top = -height * 0.5 + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';

    // const index = Math.floor(Math.random() * 4);
    // let url = allMyUrls[index];

    // url = allMyUrls[4];

    let player = bodymovin.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
      },
      path: chrome.runtime.getURL(animationPath),
    });
    document.body.append(el);

    this.computeCSS();
    // console.log(player);
  }

  avoid(targX, targY) {
    let v = P.createVector(this.x - targX, this.y - targY);
    let speed = P.map(v.mag(), 100, 200, 5, 0);
    // console.log(speed)
    v.setMag(speed < 0 ? 0 : speed);

    this.x += v.x;
    this.y += v.y;

    this.computeCSS();
  }

  computeCSS() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    // this.el.style.backgroundColor = 'red';
  }
}
