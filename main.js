song = "";

function preload()
{
    song = loadSound("music.mp3");
}

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas =  createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        
  }
}

function draw() {
    image(video, 0, 0, 600, 500);
	Fill("#FF0000");
	stroke("#FF0000")

	circle(rightWristx,rightWristY,20);
}
if(rightWristY >0 && rightWristY <=100)
{
	document.getElementById("speed").innerHTML = "Speed = 0.5x";
	song.rate(0.5);
}
if(rightWristY >100 && rightWristY <=200)
{
	document.getElementById("speed").innerHTML = "Speed = 1x";
	song.rate(1);
}

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY); 
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;     
        song.setVolume(volume); 
    }


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


