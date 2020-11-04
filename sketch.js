var monkey, monkey_running
var gameOver, gameOverImage
var banana, bananaImage
var obstacle, obstacleImage
var FoodGroup, banana
var obstacleGroup, obstacle
var survivalTime = 0
var Banana = 0
var ground, groundImage, invisibleGround;
var START
var PLAY = 1
var END = 0
var gameState = START
localStorage["Highest.score"] = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  groundImage = loadImage("ground2.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameover.png")

}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(40, 350, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle", 0, 0, 300);

  ground = createSprite(400, 395, 900, 10)
  ground.addImage(groundImage);
  ground.velocityX = -5;

  invisibleGround = createSprite(200, 400, 400, 10)
  invisibleGround.visible = false;

  gameOver = createSprite(200, 200)
  gameOver.addImage(gameOverImage);

  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("lightGreen");
  //text(mouseX+","+mouseY,mouseX,mouseY)

  if (gameState === START) {
    monkey.visible = false;
    ground.visible = false;
    ground.velocityX = 0;
    obstacleGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
    textSize(15)
    text("Press 'S' Key To Start The Game", 90, 200)
    gameOver.visible = false;
    // Banana = 0;
   // survivalTime = 0;

  }

  if (keyDown("s")&&gameState === START) {   
    gameState = PLAY;
         //Banana = 0;
   //survivalTime = 0;

  }

  if (gameState === PLAY) {
    stroke("Black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("SURVIVAL TIME: " + survivalTime, 120, 50)
    ground.velocityX = -5;
    obstacleGroup.velocityX = -4.5;
    FoodGroup.velocityX = -6;
    monkey.visible = true;
    ground.visible = true;
    gameOver.visible = false;
   
    text("BANANA: " + Banana, 160, 80);
    textSize(20);
    text("HST: " + localStorage["Highest.score"], 180, 110)
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 280) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);

    banana();
    obstacle();

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      Banana = Banana + 1;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      obstacleGroup.destroyEach();
    }

  } else if (gameState === END) {
    ground.velocityX = 0;
    obstacleGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
    monkey.visible = false;
    ground.visible = false;
    gameOver.visible = true;
    stroke("Black");
    textSize(20);
    fill("black");
    text("SURVIVAL TIME: " + survivalTime, 120, 50)
    text("HST: " + localStorage["Highest.score"], 180, 80)
    if (localStorage["Highest.score"] < survivalTime) {
      localStorage["Highest.score"] = survivalTime;
    }
  }
  //if(mousePressedOver(gameOver)&&gameState === END){
   //gameState = START;
  //}

  drawSprites();
}

function banana() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(398, Math.round(random(170, 290)), 20, 20)
    banana.setCollider("circle", 0, 0, 200);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 110;
    banana.scale = 0.09;
    FoodGroup.add(banana);

  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(398, 372, 20, 20);
    obstacle.setCollider("circle", 0, 0, 250);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4.5;
    obstacle.lifetime = 110;
    obstacle.scale = 0.15;
    obstacleGroup.add(obstacle);
  }
}

function obstacle1() {
  if (frameCount % 150 === 0) {
    var obstacle1 = createSprite(398, 372, 20, 20);
    obstacle1.setCollider("circle", 0, 0, 250);
    obstacle1.addImage(obstacleImage);
    obstacle1.velocityX = -4.5;
    obstacle1.lifetime = 110;
    obstacle1.scale = 0.15;
    obstacleGroup.add(obstacle1);
  }
}