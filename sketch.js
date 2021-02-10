var balo;
var game;

var position
var bg;
function preload() {
  //preload the images here
  bg=loadImage("1.png")
  balloon=loadAnimation("2.png","3.png","4.png")
  
  }

function setup() {
  database=firebase.database();
  createCanvas(1300 ,700);

  balo=createSprite(200, 200);
  balo.addAnimation("bal",balloon);
  balo.scale=0.5;

  var ballposition=database.ref('ball/position')
   ballposition.on("value", readPosition)
}

function draw() {
  background(bg);
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
    balo.scale=0.5;
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
    balo.scale=0.5;
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    balo.scale=scale+0.0000000000001;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
    balo.scale=scale+0.001;
  }  
  drawSprites();
  fill ("black")
  textSize(30 )
  text("*******************press the arrows to move the Balloon******************",300,50)
  
}
function writePosition(x,y)
{
  //.set() is used to set the values in database 
  database.ref('ball/position').set({
    'x': position.x + x , 
    'y': position.y + y
  })
}
function readPosition(data)
{
  //.val() to extract values from data and store  in var position
  position = data.val();
  console.log(position.x);
  balo.x = position.x;
  balo.y = position.y;
}
