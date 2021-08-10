var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Hero, heroRun, HerodeadImg;
var Gem, gemImg;
var Ground, groundImg;
var Villian, villians;
var villian1Img, villian1Attack;
var villian2Img;
var villian3Img, villian3Attack;
var villians;
var clouds;
var gems;
var Cloud, cloud1Img, cloud2Img, cloud3Img;
var cityBackground, cityImg;
var Moon, moonImg;
var backgroundImg;
var invisibleGround;



function preload() {
  heroRun = loadAnimation("/hero/Run.png", "/hero/Run1.png", "/hero/Run2.png", "/hero/Run3.png", "/hero/Run4.png", "/hero/Run5.png", "/hero/Run6.png");
  gemImg = loadAnimation("Gem.png");
  groundImg = loadAnimation("ground2.png");
  villian1Img = loadAnimation("/villian1/robot.png");
  villian1Attack = loadAnimation("/villian1/robotweapon.png");
  villian2Img = loadAnimation("/villian2/pumpkinHead.png");
  villian3Img = loadAnimation("/villian3/zombie.png");
  villian3Attack = loadAnimation("/villian3/Attack1.png", "/villian3/Attack2.png", "/villian3/Attack3.png", "/villian3/Attack4.png", "/villian3/Attack5.png", "/villian3/Attack6.png")
  HerodeadImg = loadAnimation("/hero/Dead.png", "/hero/Dead1.png", "hero/Dead2.png", "/hero/Dead3.png", "/hero/Dead4.png", "hero/Dead5.png", "hero/Dead6.png");
  cloud1Img = loadImage("../clouds/cloud1.png");
  cloud2Img = loadImage("../clouds/cloud2.png");
  cloud3Img = loadImage("../clouds/cloud3.png");
  cityImg = loadImage("cityImg.png");
  moonImg = loadImage("moon.png")
  backgroundImg = loadImage("background.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight)
  Hero = createSprite(30, height - 100, 10, 10);
  Hero.addAnimation("hero", heroRun)
  Hero.scale = 0.17;

  /* Gem = createSprite(370,30,10,10);
  Gem.addImage("Gem", gemImg);
  Gem.scale = 0.4; */
  Ground = createSprite(width / 2, height - 30, width, 10);
  Ground.addAnimation("gImage", groundImg)

  invisibleGround = createSprite(width / 2, height - 20, width, 10)
  invisibleGround.visible = 0;

  //Villian = createSprite(300,345,10,10);
  //Villian.addAnimation("villian",villianImg)
  //Villian.scale = 0.21;

  Moon = createSprite(100,135,10,10)
  Moon.addImage("moon", moonImg)
  Moon.scale = 0.18;
  
  cityBackground = createSprite(width + 300, windowHeight - 100, 10, 10)
  cityBackground.addImage("city", cityImg);
  cityBackground.scale = 0.5;
  cityBackground.depth = Hero.depth
  Hero.depth = Hero.depth + 1;
  cityBackground.setCollider("point", 0, 0);

  villians = new Group()

  clouds=new Group()

  gems= new Group()

}

function draw() {

  background(backgroundImg);

  //if and else if for two different states of the given game

  /*if(gameState === 0){
     gameState = PLAY;
   }
  else if(gameState === 1){
    gameState = end;
      }*/
  if (gameState === PLAY) {
    //score = score + Math.round(getFrameRate()/60);
    console.log(gameState);
    Ground.velocityX = -6;
    cityBackground.velocityX = -6;

    if (keyDown("space")) {
      Hero.velocityY = -10;
    }

    Hero.velocityY = Hero.velocityY + 0.8

    if (Ground.x < 0) {
      Ground.x = Ground.width / 2;
    }
    if (cityBackground.x < 0) {
      cityBackground.x = cityBackground.width / 2;

      if(villians.isTouching(Hero)){
        gameState = END;
    }
    

    if (keyDown(LEFT_ARROW)) {
      Hero.velocityX = -1;
    }
    if (keyDown(RIGHT_ARROW)) {
      Hero.velocityX = 1;
    }
    spawnvillians()
    spawnClouds()
    //if(frameCount%60===0){
      
      
      /*if(choice===1){
        spawnvillians(1);
      }
      else if(choice===2){
        spawnvillians(2);
      }
      else if(choice===3){
        spawnvillians(3);
      }
      else{
        spawnGems()
      } */
    }
    //gems group touching hero destroy them, increase score
   /* if(Hero.isTouching(villians)){
      Hero.changeAnimation("dead", HerodeadImg)
      //destroy villians group
      Hero.velocityX = 0;
      Hero.velocityY = 0; 
    }*/
  }

 
} 
 if(gameState === END){
  Ground.velocityX = 0;
  Hero.velocityY = 0;
  villians.setVelocitysXEach(0);
  clouds.setVelocityXEach(0);  
  }
  Hero.collide(invisibleGround)
  drawSprites();

function spawnClouds() {
  if(frameCount%10===0){
    Cloud = createSprite(width, random(height / 3, height / 4))
    var num = Math.round(random(1,3))
    switch(num){
      case 1:Cloud.addImage("cloud1", cloud1Img);
      break;
      case 2:Cloud.addImage("cloud2", cloud2Img);
      break;
      case 3:Cloud.addImage("cloud3", cloud3Img);
      break;
      default : console.log(1)
      break;
    
  }

    Cloud.velocityX= -6;
    Cloud.scale = 0.17;
    clouds.add(Cloud)
    Cloud.lifetime = width;
  }
}
function spawnvillians(a) {
  if(frameCount%10===0){
  Villian = createSprite(width, random(height/3, height/6));
  var choice = Math.round(random(1,4))
  switch(choice){
      case '1':Villian.addAnimation("villian1", villian1Img);
      break;
      case '2':Villian.addAnimation("villian1", villian2Img);
      break;
      case '3':Villian.addAnimation("villian1", villian3Img);
      break;
      default : console.log(1)
      break;
  }
  Villian.scale = 0.21;
  Villian.velocityX = -6;
  Villian.lifetime = width;
  villians.add(Villian)
  //swtich between 
}
}
function spawnGems() {
  var h=random(height/2, height/2+150)
  Gem=createSprite(width,height)
  Gem.velocityX = -6;
  Gem.lifetime = width/6;
  gems.add(Gem)
}
