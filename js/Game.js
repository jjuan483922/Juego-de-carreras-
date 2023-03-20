class Game {
  constructor() {
    this.reinicio=createButton("")

  }
  

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }


  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.reinicio.class("resetButton")
    this.reinicio.position(width/2+230,100)
  }

  play() {
    this.handleElements();
     this.reinicioDejuego();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
var index = 0
for(var plr in allPlayers){
index +=1;
var x = allPlayers[plr].positionX;
var y = height- allPlayers [plr].positionY;

cars[index-1].position.x = x;
cars[index-1].position.y = y;
if(index==player.index){
fill ("black")
ellipse(x,y,60,60)
camera .position.x=width/2
camera .position.y=cars[index-1].position.y
}
}
this.controls()
      drawSprites();
    }
  }
  controls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update();


    }
    if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+260){
      player.positionX+=10
      
      player.update();}

      if(keyIsDown(LEFT_ARROW)&&player.positionX>width/2-300){
        player.positionX-=10
        
        player.update();}
  }
  reinicioDejuego(){
     this.reinicio.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,gameState:0,players:{}
      })
      window.location.reload();
     })

  }
}


