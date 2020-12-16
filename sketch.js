//Game States
var PLAY=1;
var END=0;
var gameState=1;
var ground;
var count = 0;
var monkey, monkey_running,moving,monkey_collided,collided;

var jungle,background;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var gameover,gameoverImage;

var score;

var survivalTime;



function preload(){ 
  jungle=loadImage("jungle.jpg");
monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png")
   
 monkey_collided=loadAnimation("monkey_collided.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover.png");

 
}



function setup() {
  //creating canvas
  createCanvas(600,600);
  
 background=createSprite(0,300,600,600);  
  background.velocityX=-4;
   background.scale=0.9;
  background.addImage(jungle);
  background.x=background.width/2;

  //creating monkey
monkey=createSprite(90,415,5,5);
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.07;

   ground = createSprite(400,450,900,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  ground.visible=false ;
  
  gameover = createSprite(300,300);
  gameover.addImage(gameoverImage);



  
  score = 0 
  survivalTime=0;
  count=0;
  obstacleGroup= createGroup();
  FoodGroup= createGroup();

}


function draw() {
   if(gameState === PLAY){
     if(ground.x<0){
   ground.x=ground.width/2;
  }

  if(background.x<100){
    background.x=background.width/2;
  }
     //making the monkey jump  
    if (keyDown ("space")){
      monkey.velocityY= -12;  
    }    
   gameover.visible=false;
  
 
    
  
    
    
    survivalTime=Math.ceil(frameCount/frameRate())
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
     spawnobstacle();
    spawnbanana();
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.setLifetimeEach(0);
   score = score+2;
  }
    
  
  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.setLifetimeEach(0);
    monkey.scale=0.07;
    count = count + 1;
   
  }
   }
  
  
   if(count >= 2){
   gameState = END;
  }
  
  if(gameState===END){
   monkey.changeAnimation(collided);
    background.velocityX=0;
    ground.velocity.X=0;
    FoodGroup.destroyEach();
  obstacleGroup.velocityX=0;
     gameover.visible=true;
    monkey.visible=false;
  }      
  
  

 
      monkey.collide(ground);
 

 drawSprites();
 stroke("black")
  textSize(20);
  fill("black");
 text("SCORE: "+ score, 500,50);
  
  stroke("black")
  textSize(20);
  fill("black");
  text("survivalTime:" + survivalTime,100,50);
  



function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
FoodGroup.add(banana);
    }
}


function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
     obstacle = createSprite(600,415,30,0);
     obstacle.addImage(obstacleImage);
    obstacle.scale = 0.14;
    obstacle.velocityX = -6;
    
    obstacle.setCollider("circle",0,0,150)
    
    //obstacle.debug = true
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   obstacleGroup.add(obstacle);
    }
}

  
            
  
switch(score){
    case  10: monkey.scale= 0.10;
          break;
    case 20: monkey.scale=0.14;
             break;
    case 30: monkey.scale=0.16;
              break;
    case 40: monkey.scale=0.18;
            break;
    case 50: monkey.scale=0.20;
              break;
    case 60: monkey.scale=0.22;
              break;
       default:break;
    
}
  


}



