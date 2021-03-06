
var cols, rows;
var w = 20;
var grid = [];

var current;
var dif=500;
var stack = [];
var gamestate=1;
var dif1,dif2,dif3,dif4,play;
var i1,i2,i3,i4,i5,i6,i7,i8,i9;
var player,power,test;


function setup() {
  createCanvas(dif,dif);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);
  dif1=createSprite(250,100,100,50);
  dif1.addImage(i1);
  dif1.scale=0.15
  dif2=createSprite(250,200,100,50);
  dif2.addImage(i2);
  dif2.scale=0.1
  dif3=createSprite(250,300,100,50);
  dif3.addImage(i3);
  dif3.scale=0.1
  dif4=createSprite(250,400,100,50);
  dif4.addImage(i4);
  dif4.scale=0.1
  player=createSprite(10,10,10,10);
  player.addImage(i5);
  player.scale=0.1
  player.visible=false;
  test=createSprite(490,490,10,10);
  //power=createSprite(20,70,5,5);
  play=createSprite(dif/2,dif/2,100,50);
  play.addImage(i8);
  play.scale=0.5;
  play.visible=false;

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];


}

function preload(){
  
i1=loadImage("easy.png");
i2=loadImage("modrate.png");
i3=loadImage("hard.png");
i4=loadImage("very hard.png");
i5=loadImage("dog.png");
i6=loadImage("images.jpg");
i7=loadImage("download.jpg");
i8=loadImage("images.png");
//i9=l
}

function draw() {
  

  if(gamestate===1){
   background(45);

   player.visible=false;

   if(mousePressedOver(dif1)){
     dif=200; 
     gamestate=2;
   }

   if(mousePressedOver(dif2)){
    dif=300;
    gamestate=2;
  }

  if(mousePressedOver(dif3)){
    dif=400;
    gamestate=2;
  }

  if(mousePressedOver(dif4)){
    dif=500;
    gamestate=2;
  }

   drawSprites();

  }
  if(gamestate===2){

    resizeCanvas(dif,dif);
    background(i6);

    
    dif1.visible=false;
    dif2.visible=false;
    dif3.visible=false;
    dif4.visible=false;

    player.visible=true;

    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
  
    current.visited = true;
    current.highlight();
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
  
      // STEP 2
      stack.push(current);
  
      // STEP 3
      removeWalls(current, next);
  
      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }

    if(player.x>=490&&player.y>=490){
      gamestate=3;
    }

    if (keyIsDown(LEFT_ARROW)) {
      player.x -= 5;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += 5;
    }
  
    if (keyIsDown(UP_ARROW)) {
      player.y -= 5;
    }
  
    if (keyIsDown(DOWN_ARROW)) {
      player.y += 5;
    }
  drawSprites();
  }

  if(gamestate===3){
    background(i7);
    play.visible=true;
    if(mousePressedOver(play)){
      reset();
    }
    
    drawSprites();
  }
  
}
  


function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function reset(){
    dif1.visible=true;
    dif2.visible=true;
    dif3.visible=true;
    dif4.visible=true;
    gamestate=1;
 play.visible=false;
 dif=500;
 player.y=10;
 player.x=10;
}
