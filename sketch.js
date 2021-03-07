var play=1;
var end=0;
var background
var gameState=play;

var ground;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var score;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 

  
}



function setup() {
  createCanvas(1200,380);
  
   monkey=createSprite(60,340);
//monkey.debug=true;
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;

   ground=createSprite(300,375,100000,10);
  ground.velocityX= -4;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
   score=0
}


function draw() {
  background ("lightgreen");
  stroke("black");
  fill("black");
  textSize(20);
    
   monkey.velocityY= monkey.velocityY +0.8;

  monkey.collide(ground);
  
  if(gameState===play){
     score= score + Math.round(getFrameRate()/60);

    if(ground.x<0){
    ground.x=ground.width/2;
  }
  
   if(keyDown("space") && monkey.y>200){
    monkey.velocityY=-10;
  }
  
  spawnBananas();
  spawnObstacles();
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=end;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }
   
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
   score=score=0+1;
    monkey.scale=monkey.scale+0.025;
    
   
  }

   text("score=0",700, 50);
  text("Survival Time:"+ score,150, 50);
  drawSprites();
}

function spawnBananas(){
  if(frameCount%80===0){
    var rand=Math.round(random(200, 300));
    banana=createSprite(620,rand,10,10);
    banana.depth=monkey.depth-1;
    banana.addImage(bananaImage);
    banana.lifetime=170;
    banana.velocityX=-4;
    banana.scale=0.1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,330,15,15);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=180;
    obstacle.velocityX=-4;
    obstacle.depth=monkey.depth+1;
    obstacle.scale=0.20;
    obstacleGroup.add(obstacle);
  }
}


