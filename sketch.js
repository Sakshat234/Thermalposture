// // Copyright (c) 2019 ml5
// //
// // This software is released under the MIT License.
// // https://opensource.org/licenses/MIT

// /* ===
// ml5 Example
// PoseNet example using p5.js
// === */

let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
let rightwx = 0;
let rightwy=0;
let img;

function setup() {
    img= loadImage('images1.jpeg')
  createCanvas(640, 480);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  filter(INVERT);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  // select('#status').html('Model Loaded');
  poseNet.on('pose', gotPose);
  // This sets up an event that fills the global variable "poses"
}

function gotPose(results) {
  poses = results;
  
  // with an array every time new poses are detected
  if (! poses || poses.length < 1) return;
  //leave this function if the results don't look right
  // console.log(poses[0].pose);
  noseX = poses[0].pose.nose.x;
  noseY = poses[0].pose.nose.y;
  rightwx = poses[0].pose.rightWrist.x;
  rightwy= poses[0].pose.rightWrist.y;
}

function draw() {
  image(video, 0, 0, width, height);
  fill(255,0,0);
  ellipse(noseX, noseY,20, 20);
  fill(0,0,255);
  ellipse(rightwx, rightwy,20,20);
}
// let fingers;

// function setup() {
//   createCanvas(1000, 1000);
//   // specify multiple formats for different browsers
//   fingers = createVideo(['thermal.mp4']);
//   fingers.hide(); // by default video shows up in separate dom
//   // element. hide it and draw it to the canvas
//   // instead
// }

// function draw() {
//   background(150);
//   image(fingers, 10, 10); // draw the video frame to canvas
// //   filter(GRAY);
// //   image(fingers, 150, 150); // draw a second copy to canvas
// }

// function mousePressed() {
//   fingers.loop(); // set the video to loop and start playing
// }
