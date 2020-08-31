var database;
var dog;
var normalDog;
var happyDog;
var foodS,foodStock;

function preload()
{
  //load images here
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog = createSprite(250,250,10,10);
  dog.addImage(normalDog);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("orange");
  text("Note: Press The Up Arrow Key To Feed Drago Milk!",20,50);
  textSize(15);
  fill("white");
  text("Milk Remaining: "+foodS,185,400);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}



