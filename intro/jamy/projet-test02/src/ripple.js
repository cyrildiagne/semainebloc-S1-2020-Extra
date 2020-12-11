class Ripple {
  constructor(x, y) {
    // The displacement map.
    let mapUrl;
    if (chrome.runtime && chrome.runtime.getURL) {
      mapUrl = chrome.runtime.getURL("res/map.png");
    } else {
      mapUrl = "/res/map.png";
    }
    const mapTexture = PIXI.Texture.from(mapUrl);
    // sprite.
    this.sprite = new PIXI.Sprite(mapTexture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.scale.set(0.1);
    // filter.
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
  }

  update() {
    this.sprite.scale.x += 0.04;
    this.sprite.scale.y += 0.04;
  }
}
