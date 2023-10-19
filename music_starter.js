// Initialize variables
let firstRun = true; // Flag to run certain setup code only on the first frame
let earthImg; // Variable to store an image of Earth
let moonImg; // Variable to store an image of the Moon
let space_manImg; // Variable to store an image of a spaceman
let manDepth = 10; // Initial depth of the spaceman
let manInc = true; // Flag to control spaceman's depth increment direction
let stars = []; // Array to store star positions
let numStars = 100; // Number of stars
let starSpeed = 5; // Speed at which stars move across the screen
let coverAlpha = 0; // Initial alpha value for the white cover

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  if (firstRun) {
    // Set up initial configuration only on the first frame
    rectMode(CENTER);
    earthImg = loadImage('earth.png');
    moonImg = loadImage('moon.png');
    space_manImg = loadImage('space_man.png');
    firstRun = false;

    // Generate random star positions
    for (let i = 0; i < numStars; i++) {
      let x = random(width);
      let y = random(height);
      stars.push(createVector(x, y));
    }
  }

  // Move stars horizontally across the screen
  for (let star of stars) {
    star.x -= starSpeed * (drum / 100);
    if (star.x < 0) {
      star.x = width;
      star.y = random(height);
    }
  }

  background(0); // Set the background color to black

  fill(255);
  noStroke();
  // Draw stars as small ellipses
  for (let star of stars) {
    ellipse(star.x, star.y, 2, 2);
  }

  // Draw images of Earth and the Moon with dynamic positions based on bass
  image(earthImg, width / 2 - (500 + bass / 2) / 1 - manDepth / 10, 1 * height / 5 - (100 + bass / 2) / 2, 500 + bass / 2, 500 + bass / 2);
  image(moonImg, width / 2 + manDepth / 50 + 100, height / 2 - 50, 100, 100);

  // Control the depth of the spaceman
  if (manDepth <= -100) {
    manInc = true;
  }
  if (manDepth >= 100) {
    manInc = false;
  }

  // Adjust spaceman's depth based on the 'other' parameter
  if (manInc) {
    manDepth = manDepth - (other - 90) / 10;
  } else {
    manDepth = manDepth + (other - 90) / 10;
  }

  // Draw the spaceman image with dynamic position and size based on drum and manDepth
  image(space_manImg, width / 2 - drum / 4 + manDepth / 5, height / 2 - drum / 2, drum / 2 + 50, drum / 2 + 50);

  // Adjust the alpha of the white cover based on vocal
  coverAlpha = map(100 - vocal, 0, 100, 20, 0); // Reduced maximum alpha

  // Draw a white cover with variable transparency
  noStroke();
  fill(255, coverAlpha);
  rect(width / 2, height / 2, width, height);

  // Draw a green waveform pattern based on the vocal input
  stroke("#00FF41");
  strokeWeight(4);
  noFill();
  let vocalAmplitude = map(vocal, 0, 100, 0, vocal / 4);
  let vocalFrequency = map(vocal, 0, 300, 10, 100);
  vocalStepSize = 10;
  vocalYPos = height / 5;

  for (let i = 100; i < width - 100; i += vocalStepSize) {
    let yOffset = map(cos(i * vocalFrequency), -1, 1, -vocalAmplitude, vocalAmplitude);
    line(i, vocalYPos - yOffset, i, vocalYPos + yOffset);
  }

  noStroke();
  fill("#00FF41");
  textFont('Monospace');
  textAlign(CENTER);
  textSize(20 + vocal / 10);
  // Display text with variable size based on vocal
  text(words, width / 2, height / 8);

  noFill();
  strokeWeight(200);
  stroke("grey");
  // Draw a grey ellipse in the background
  ellipse(width / 2, height / 2, width + 200, height + 200);
}
