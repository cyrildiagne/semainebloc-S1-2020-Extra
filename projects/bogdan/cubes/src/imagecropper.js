const ImageCropper = {
  init() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  },

  async makeSquare(image, size = 64) {
    image = await this.load(image.src);

    console.log(image);

    this.ctx.fillRect(0, 0, size, size);

    this.ctx.save();

    let { width, height } = image;

    this.canvas.width = this.canvas.height = size;

    this.ctx.translate(size / 2, size / 2);
    this.ctx.translate(-width / 2, -height / 2);
    this.ctx.drawImage(image, 0, 0);

    this.ctx.restore();

    return this.canvas.toDataURL();
  },

  load(url) {
    return new Promise((resolve) => {
    let image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.src = url;
    });
  },
};

ImageCropper.init();
