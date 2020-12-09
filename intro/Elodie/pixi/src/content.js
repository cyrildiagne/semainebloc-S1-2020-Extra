const circle = new PIXI.Graphics()
    .beginFill(0xff00ff)
    .drawCircle(0, 0, 30)
    .endFill()

pixi.stage.addChild(circle);

pixi.stage.interactive = true;
pixi.stage.on("pointermove", moveCircle);

function moveCircle(e){
    let pos = e.data.global;
    circle.x = pos.x;
    circle.y = pos.y;
}