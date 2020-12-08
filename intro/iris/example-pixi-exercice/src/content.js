const circle = new PIXI.Graphics()
    .beginFill(0xff00ff)
    .drawCircle(100, 100, 30)
    .endFill()

pixi.stage.addChild(circle)
pixi.stage.on("pointermove", moveCircle);

//mouse interactions
function moveCircle(e){
    let pos = e.data.global;
    circle.x = pos.x;
    circle.y = pos.y;
}