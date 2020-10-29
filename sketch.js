//variable for sprite
var trex,trex_running;

var gameoverimg;

var restartimg;

var trex_collided;

var ground,groundImage;

var invisibleground;

var cloudImage;

var cloud;

var obstacle;

var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score=0;

var obstaclegroup;

var cloudgroup;

var PLAY=1;

var END=0;

var gamestate=PLAY;

var jumpsound;

var diesound;

var checkpointsound;

//to load animation
function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided=loadAnimation("trex_collided.png")
  
  groundImage=loadAnimation("ground2.png");
  
 cloudImage=loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  
  obstacle2=loadImage("obstacle2.png");
  
  obstacle3=loadImage("obstacle3.png");
  
  obstacle4=loadImage("obstacle4.png");
  
  obstacle5=loadImage("obstacle5.png");
  
  obstacle6=loadImage("obstacle6.png");
  
  gameoverimg=loadImage("gameOver.png");
  
  restartimg=loadImage("restart.png");
  
  jumpsound= loadSound("jump.mp3");
  
  diesound= loadSound("die.mp3");
  
  checkpointsound= loadSound("checkPoint.mp3")
  
}

function setup()
// function setup where we will create sprites
{
  createCanvas(600,200);
 
  trex=createSprite(50,160,20,50);
  //adding animation to the sprite
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
 
  
  // we created scale for trex
  trex.scale=0.5;
  trex.x=50;
  
  ground=createSprite(200,180,400,20);
  
   ground.addAnimation("ground",groundImage);
  
  
  ground.x=ground.width /2;
  
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false;
  //creating edges
  edges=createEdgeSprites();
  
  obstaclegroup= new Group();
  
  cloudgroup= new Group();
  
  trex.setCollider("circle",0,0,40)
  //addiing artificial intillegence to t rex.
 // trex.setCollider("rectangle",0,0,400,trex.height)
  trex.debug=false;
  
  gameover=createSprite(300,100);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  
  restart=createSprite(300,140);
  restart.addImage(restartimg);
  restart.scale=0.5
}

function draw()
{
  
  background("yellow");
  
  text("Score: " +score,500,20);
  
 
  
  
  //using console.log
  console.log(trex.depth);
  
  if(gamestate==PLAY)
    
    {
      ground.velocityX=-2;
      
       score=score+Math.round(frameCount/60);
      
      if(score>0 && score%100==0){
        
        checkpointsound.play();
        
      }
      
      gameover.visible=false;
      restart.visible=false;
      
      
      if(ground.x<0)
          {
            ground.x=ground.width/2;
          }
      
      if(keyDown("space") && trex.y>=100)
          {
            trex.velocityY=-10;
            
            jumpsound.play();
          }
      generatecloud();
      generateobstacles();
      
      
      
      if(obstaclegroup.isTouching(trex))
        
        {
          
          //adding artificial intelligence
          
            //trex.velocityY=-12;
          
          //jumpsound.play();
          
          gamestate=END;
          
          diesound.play();
          
          
          
        }
      
    }
  
  else if(gamestate==END)
    
    {
      
      ground.velocityX=0;
      trex.velocityY=0;
      
      obstaclegroup.setVelocityXEach(0);
      cloudgroup.setVelocityXEach(0);
      trex.changeAnimation("collided",trex_collided);
      //giving lifetime for obstacle because obstacles were disappearing...
      obstaclegroup.setLifetimeEach(-1);
      cloudgroup.setLifetimeEach(-1);
      
      gameover.visible=true;
      restart.visible=true;
      
    }
  
  
  // we made the trex jump using if condition

  
  // we added gravity to the trex
  trex.velocityY=trex.velocityY+0.5;
  //trex colliding edges
  trex.collide(invisibleground);
  
 if(mousePressedOver(restart))
   {
     
      reset();
     
   }
  
  
  drawSprites();
}

//generate clouds

function generatecloud()


{
 
  
  if (frameCount%60 == 0)
       {
               cloud=createSprite(600,100,40,10);
cloud.velocityX=-3;
         
         cloudgroup.add(cloud);
         
         
         cloud.addImage(cloudImage);
         
       cloud.scale=0.5;
         
         cloud.y=Math.round(random(10,60));
         
       console.log(cloud.depth);
         
         cloud.depth=trex.depth;
         
       trex.depth=trex.depth+1;
         
          cloud.lifetime=200;
        } 
  
}

// creating a function for obstacles

function generateobstacles()

{
  if (frameCount%60==0)
    {
      
      var obstacle=createSprite(600,165,10,40);
      
      obstacle.velocityX=-(4+2*score/100);
      
      obstaclegroup.add(obstacle);
      
      var rand=Math.round(random(1,6));//rand is a local variable..
      
      switch(rand)
        
        {
            
          case 1  : obstacle.addImage(obstacle1);
            break;
            
            case 2 : obstacle.addImage(obstacle2);
            break;
            
            case 3  : obstacle.addImage(obstacle3);
            break;
            
            case 4  : obstacle.addImage(obstacle4);
            break;
            
            case 5  : obstacle.addImage(obstacle5);
            break;
            
            case 6  : obstacle.addImage(obstacle6);
            break;
            
            default : break;
            
        }
      obstacle.scale=0.5;
      obstacle.lifetime=200;
    
    }
  
}

function reset(){
  
  gamestate=PLAY;
  
 obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score=0; 
  trex.changeAnimation("running","trex_running");
  
  
  
}