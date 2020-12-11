class Button {
  constructor(nbColumns, nbRows, radius, ctx, w, h, state) {
    this.nbColumns = nbColumns;
    this.nbRows = nbRows;
    this.r = radius;
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.marginW = this.spacingW / 2;
    this.marginH = this.spacingH / 2;
    this.startX = this.spacingW;
    this.startY = this.r;
    this.closePosition = this.r;
    this.openPosition = 100;
    this.position = "open";
    this.state = state;
  }

  draw() {
    this.ctx.fillStyle = "#fafafa";
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#0000ff";
    this.ctx.arc(this.r, this.r, this.r, 0.5 * Math.PI, 1.5 * Math.PI, false);
    this.ctx.arc(100, this.r, this.r, 1.5 * Math.PI, 0.5 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
    this.drawTimer();
  }
  drawTimer() {
    console.log("drawTimer");
    this.ctx.beginPath();
    this.ctx.fillStyle = "#fff";
    this.ctx.arc(this.openPosition, this.r, this.r - 3, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  changeState(e) {
    let posX = this.r;
    let posY = this.r;
    let r = this.r - 5;
    let change = false;
    // let state = this.state.value();
    if (
      e.clientX < 82 &&
      e.clientX > 58 &&
      e.clientY < 134 &&
      e.clientY > 107
    ) {
      console.log("çapasse");
      change = true;

      // let state = this.state.value();
      // let state = this.state.value(true);

      // this.position(state);
      console.log("position OK");
      return change;
    }
  }
  map(n, start1, stop1, start2, stop2, withinBounds) {
    const newval =
      ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    return newval;
  }

  move(incTime, endTime, colorState) {
    console.log("move");
    if (colorState == "white") {
      this.openPosition = this.map(
        incTime,
        0,
        endTime,
        this.openPosition,
        this.closePosition
      );

      if (this.openPosition == this.closePosition) {
        this.position = "closed";
      }
      // console.log(this.openPosition);
    } else if (colorState == "black") {
      this.openPosition = this.map(
        incTime,
        0,
        endTime,
        this.closePosition,
        this.openStartPosition
      );
      if (this.openStartPosition == this.openPosition) {
        this.position = "open";
      }
    }
    // console.log(incTime, endTime,this.position);
  }
}
