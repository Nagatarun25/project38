

var backgroundImage, groundImage,ground,cloudImage,cloudsGroup,mario_running
var obstacle1,obstacle2, obstacleGroup 
var coinsGroup
var coinImage
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0
var gameOver,restart,gameOverImage,restartImage



function preload(){
backgroundImage=loadImage("images/background.jpg")
groundImage=loadImage("images/ground.png")
cloudImage=loadImage("images/cloud.png")
mario_running=loadAnimation("images/mario1.png", "images/mario2.png","images/mario3.png","images/mario4.png","images/mario5.png","images/mario6.png","images/mario7.png","images/mario8.png")


obstacle1=loadImage("images/mushroom.png")
obstacle2=loadImage("images/mushroom.png")

coinImage=loadImage("images/coin.png")

gameOverImage=loadImage("images/gameOverText.png")

restartImage=loadImage("images/restart.png")
}


function setup(){
    createCanvas(displayWidth,displayHeight)
ground=createSprite(200,750,100,20)
ground.addImage(groundImage)
ground.scale = 4
ground.velocityX=-8

invisibleGround=createSprite(200,800,100,20)


mario = createSprite(100,680,20,50)
mario.addAnimation("running", mario_running);
mario.scale=0.4
mario.setCollider("rectangle",100,0,mario.width-60,mario.height-100)
mario.debug=true

gameOver = createSprite(700,400);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(700,500);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;




cloudsGroup = new Group()

obstacleGroup = new Group()

coinsGroup = new Group()
  
}


function draw(){
    background(backgroundImage)
   
    if(gameState==PLAY){
        if(ground.x<0){
            ground.x=ground.width/2
            }
            
            
            if(keyDown("SPACE")&& mario.y>=640){
            mario.velocityY=-25
            
            
            }
            mario.velocityY=mario.velocityY+0.8
            SpawnObstacles()
            SpawnClouds();
            spawnCoins();
            
            if(mario.isTouching(coinsGroup)){
                coinsGroup.destroyEach()
                score=score+1
                
            }

            if(obstacleGroup.isTouching(mario)){
                gameState=END
            }
    }
    else if(gameState==END){

        gameOver.visible = true;
    restart.visible = true;

        ground.velocityX=0
        mario.velocityY=0

        cloudsGroup.setVelocityXEach(0)
        cloudsGroup.setLifetimeEach(-1)

        obstacleGroup.setVelocityXEach(0)
        obstacleGroup.setLifetimeEach(-1)
        
        coinsGroup.setVelocityXEach(0)
        coinsGroup.setLifetimeEach(-1)
        
        if(mousePressedOver(restart)) {
            reset();
        }
    }

mario.collide(invisibleGround)





    drawSprites();

    textSize(20)

    fill("black")

    textFont("bubblegum sans")

    text("Score :"+score,1200,400)
    

}

function SpawnClouds(){
    if(frameCount % 120===0){
        var cloud = createSprite(1000,120,40,10);
        cloud.y = Math.round(random(250,450));
        cloud.addImage(cloudImage);
        cloud.scale = 2
        cloud.velocityX = -3;
        
         //assign lifetime to the variable
        cloud.lifetime = 400;
    
       
        
        //add each cloud to the group
        cloudsGroup.add(cloud);
    }
}

function SpawnObstacles(){
    if(frameCount % 250===0){
        var obstacle = createSprite(1000,720,40,10);
       //obstacle.debug=true

        var rand = Math.round(random(1,2));
if(rand==1){
    obstacle.addImage(obstacle1)
  
}
if(rand==2){
    obstacle.addImage(obstacle2)
    
}
obstacle.scale= 0.5


      
        
        obstacle.velocityX = -3;
        
         //assign lifetime to the variable
        obstacle.lifetime = 400;
    
       
        
        //add each obstacle to the group

        obstacleGroup.add(obstacle)
      
    }
}


function spawnCoins(){
    if(frameCount % 300===0){
        var coins = createSprite(1000,120,40,10);
        coins.y = Math.round(random(450,650));
        coins.addImage("coins",coinImage);
        coins.scale = 0.05
        coins.velocityX = -3;
        
         //assign lifetime to the variable
        coins.lifetime = 400;
    
       
        
        //add each cloud to the group
        coinsGroup.add(coins);
    }
}


function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstacleGroup.destroyEach();
    cloudsGroup.destroyEach();
    coinsGroup.destroyEach();
    
    score = 0;
    
  }