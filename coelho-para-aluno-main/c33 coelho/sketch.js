const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope
var fruit
var fruitCom
var bgImg
var food
var rabbit
var bunny
var botton
var blink
var eat
var sad
var bgSound,cutSound,sadSound,eatSound,ballonSound
var ballonAir
function preload(){
  bgImg=loadImage("background.png")
  food=loadImage("melon.png")
  rabbit=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  bgSound=loadSound("sound1.mp3")
  cutSound=loadSound("rope_cut.mp3")
  sadSound=loadSound("sad.wav")
  eatSound=loadSound("eating_sound.mp3")
  ballonSound=loadSound("air.wav")
  blink.playing=true
  eat.playing=true
  sad.playing=true
  eat.looping=false
  sad.looping=false
}


function setup() 
{
  createCanvas(500,700)
  frameRate(80);


  engine = Engine.create();
  world = engine.world;

  botton=createImg("cut_btn.png")
  botton.position(220,30)
  botton.size(50,50)
  botton.mouseClicked(drop)

  ballonAir=createImg("balloon.png")
  var options={
    density:0.001
  }
 
  fruit=Bodies.circle(300,300,15,options)
  Matter.Composite.add(rope.body,fruit)
   ground = new Ground(200,690,600,20);
   fruitCom=new Link(rope,fruit)
  
  rope = new Rope(7,{x:245,y:30})
 
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  bunny=createSprite(230,620,100,100)
  bunny.addImage(rabbit)
  bunny.scale=0.2

  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
   rectMode(CENTER);
   ellipseMode(RADIUS);
   textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(bgImg,width/2,height/2,500,700)
  if(fruit!=null){
 image(food,fruit.position.x,fruit.position.y,70,70)
  }
  Engine.update(engine);
  ground.show();
 rope.show()

 if (colide(fruit,bunny)==true) {
  bunny.changeAnimation("eating")
}
if (colide(fruit,gound.body)==true) {
  bunny.changeAnimation("crying")
}
  drawSprites();

}

function drop(){
  rope.break()
  fruitCom.dettach()
  fruitCom=null
}
function collide(body,sprite){
  if (body!=null) {
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<=80) {
      World.remove(engine.world,fruit)
      fruit=null
      return true
      
    } else{}
    return false
  }
}
function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  ballonSound.play()
}