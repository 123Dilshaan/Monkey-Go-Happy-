var bananaImage, obstacleImage, obstacleGroup, bananaGroup, bckIMG, bckground, score, monkeyA, monkey, ground;

function preload() {
  bckIMG = loadImage("jungle.jpg");
  monkeyA = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(70, 340, 10, 10);
  monkey.addAnimation("monkey", monkeyA);
  monkey.scale = 0.15;

  bckground = createSprite(0, 0, 600, 400);
  bckground.addImage("bckground", bckIMG);
  bckground.scale = 2;
  bckground.velocityX = -3;
  bckground.x = bckground.width / 2;

  ground = createSprite(200, 390, 800, 10);
  ground.visible = false;

  score = 0;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background(220);

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
  if (bckground.x < 0) {
    bckground.x = bckground.width / 2;
  }
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;

  }
  switch (score) {
    case 10:
      monkey.scale = 0.17;
      break;
    case 20:
      monkey.scale = 0.19;
      break;
    case 30:
      monkey.scale = 0.21;
      break;
    case 40:
      monkey.scale = 0.23;
      break;
  }

  if (monkey.isTouching(obstacleGroup)) {
    monkey.scale = 0.15;
  }

  edges = createEdgeSprites();
  monkey.collide(edges[2]);
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.depth = bckground.depth + 1;
  monkey.collide(ground);
  spawnBanana();
  obstacles();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 500, 50);
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = Math.round(random(100, 200));
    banana.velocityX = -5;
    banana.lifetime = 120;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 300 === 0) {
    var stone = createSprite(600, 360, 20, 20);
    stone.addImage(obstacleImage);
    stone.scale = 0.15;
    stone.x = Math.round(random(100, 500));
    stone.velocityX = -5;
    stone.lifetime = 170;
    obstacleGroup.add(stone);
  }

}