var PLAY=1;
var END=0;
var gameState=1;

var score=0

var gameoverImage

var knife,knifeImage
var fruit,fruitImage1,fruitImage2,fruitImage3,fruitImage4;
var monster,monsteranimation

var monsterGroup,fruitGroup;

var swoosh
var over

function preload(){
  monsteranimation= loadAnimation("alien1.png","alien2.png");
  
  gameoverImage=loadImage("gameover.png");
  
  knifeImage = loadImage("sword.png");
  fruitImage1= loadImage("fruit1.png");
  fruitImage2= loadImage("fruit2.png");
  fruitImage3= loadImage("fruit3.png");
  fruitImage4= loadImage("fruit4.png");
  
  swoosh=loadSound("knifeSwooshSound.mp3");
  over=loadSound("gameover.mp3");
}

function setup(){
  createCanvas (400,400);
  
  monsterGroup=createGroup();
  fruitGroup=createGroup();
  
  knife=createSprite(200,200);
  knife.addImage(knifeImage);
  
}
function draw(){
 background("blue");
  
  textSize(20);
  text("score:"+score,300,50);
  
  
  if(gameState===PLAY){
    knife.x=mouseX;
    knife.y=mouseY;
    fruits();
    enemy();
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      swoosh.play();
      score=score+2
    }
    if(monsterGroup.isTouching(knife)){
      gameState=END
      
      over.play();
    }
  }
  if(gameState===END){
   fruitGroup.destroyEach()
   monsterGroup.destroyEach()
   knife.addImage(gameoverImage); 
  }
  
  drawSprites()
  
}


function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("monster",monsteranimation);
    monster.y= Math.round(random(100,300));
    monster.scale=0.5;
    monster.velocityX=-(8+(score/10));
    monster.lifetime=50;
    monsterGroup.add(monster);
  }
}


function fruits(){
  if(World.frameCount%80===0){
    
    
    fruit=createSprite(400,200,20,20)
    fruit.y= Math.round(random(100,300));
    fruit.scale=0.4
    var rand= Math.round(random(1,4));
    if(rand === 1){
      fruit.addImage(fruitImage1);
    }
    if(rand === 2){
      fruit.addImage(fruitImage2);
    }
    if(rand === 3){
      fruit.addImage(fruitImage3);
    }
    if(rand === 4){
      fruit.addImage(fruitImage4);
    }
     fruit.velocityX=-(8+(score/4))
     fruit.lifetime=50;
     fruitGroup.add(fruit);
    
    
    position=Math.round(random (1,2))
    if (position===1)
    {
      fruit.x=400;
      fruit.velocityX=-(8+(score/4));
    }
    else
      if (position===2){
      fruit.x=1;
      fruit.velocityX= (8+(score/4));
    }
  }
}
