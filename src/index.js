// create some variables to store our images
let bgImage;

// create an empty string to record clicked letters
let lettersClicked = '';

// simple way to turn the outline on/off
let debugMode = true;

// object with the data we need for each letter
const letterA = {
  img: null,
  x: 100,
  y: 100,
  radius: 20,
  character: 'A',
};

// tell the browser to load our images before it runs the program
function preload() {
  bgImage = loadImage('hriste.png');
  letterA.img = loadImage('A.png');
}

// this will run once when the program starts
function setup() {
  // this creates a canvas of a certain size
  createCanvas(400, 400);
}

// this will loop after setup finishes
function draw() {
  // draw the background image
  imageMode(CORNER);
  image(bgImage, 0, 40);

  // call our function that draws the letter
  drawLetter();

  // set some properties for the text we will write on the canvas
  textSize(20);
  noStroke();
  fill(255, 0, 0);

  // display clicked letters
  text(lettersClicked, 20, 20);
}

// runs when the mouse is clicked
function mousePressed() {
  // calculate distance from mouse to center of letter
  const distanceToMouse = floor(dist(mouseX, mouseY, letterA.x, letterA.y));

  // if distance bigger than radius, player missed
  if (distanceToMouse > letterA.radius) {
    console.log('miss');
  }
  // otherwise, player clicked the letter
  else {
    console.log('hit');
    lettersClicked += letterA.character;
  }
}

function drawLetter() {
  // draw the letter at the position
  imageMode(CENTER);
  image(
    letterA.img,
    letterA.x,
    letterA.y,
    letterA.radius * 2,
    letterA.radius * 2,
  );

  // if debug mode is on, draw the outline around the letter
  if (debugMode === true) {
    noFill();
    stroke(255, 0, 0);
    ellipse(letterA.x, letterA.y, letterA.radius * 2, letterA.radius * 2);
  }
}
