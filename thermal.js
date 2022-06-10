let fingers;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
let rightwx = 0;
let rightwy=0;

function setup() {
  createCanvas(1000, 1000);
  // specify multiple formats for different browsers
  fingers = createVideo(['thermal.mp4']);
  poseNet = ml5.poseNet(fingers, modelReady);
  fingers.hide(); // by default video shows up in separate dom
  // element. hide it and draw it to the canvas
  // instead
}
function modelReady(){
    poseNet.on('pose', gotPose);
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
    background(10);
  image(fingers, 10, 10);
  fill(255,0,0);
  ellipse(noseX, noseY,20,20);
  fill(0,0,255);
  ellipse(rightwx, rightwy,20,20);
  }

function draw(results) {
    
  background(10);
  image(fingers, 10, 10);
  fill(255,0,0);
  ellipse(noseX, noseY,20,20);
  fill(0,0,255);
  ellipse(rightwx, rightwy,20,20);
//   for(let i =0;i<pose.keypoints.length;i++){
//       let x =pose.keypoints[i].position.x;
//       let y =pose.keypoints[i].position.y;
//       fill(0,255,0);
//       ellipse(x,y,16,16);

// }
   
  
}

function mousePressed() {
  fingers.loop(); // set the video to loop and start playing
}