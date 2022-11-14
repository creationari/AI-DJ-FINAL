song = "";
left_wrist_X = 0;
left_wrist_Y = 0;
right_wrist_X = 0;
right_wrist_Y = 0;
scoreLeftWristY = 0;
scoreRightWristY = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function gotPoses(results){
if(results.length > 0){
    console.log(results);

    scoreLeftWristY = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWriftY = "+scoreLeftWristY);
    
    left_wrist_X = results[0].pose.leftWrist.x;
    left_wrist_Y = results[0].pose.leftWrist.y;
    right_wrist_X = results[0].pose.rightWrist.x;
    right_wrist_Y = results[0].pose.rightWrist.y;
    console.log("Left wrist x = "+left_wrist_X);
    console.log("Left wrist y = "+left_wrist_Y);
    console.log("Right wrist x = "+right_wrist_X);
    console.log("Right wrist y = "+right_wrist_Y);
}
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("cyan");

circle(right_wrist_X , right_wrist_Y, 20);
    if(right_wrist_Y > 0 && right_wrist_Y <= 100)
    {
    document.getElementById("speed").innerHTML = "speed = 0.5x";
    song.rate(0.5);
    }
    else if(right_wrist_Y > 100 && right_wrist_Y <= 200)
    {
    document.getElementById("speed").innerHTML = "speed = 1x";
    song.rate(1);
    }
    else if(right_wrist_Y > 200 && right_wrist_Y <=300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(right_wrist_X > 300 && right_wrist_X <=400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(right_wrist_X > 400 && right_wrist_Y <=500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
    else if(right_wrist_Y > 400 && right_wrist_Y <=500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
    if(scoreLeftWristY > 0.2)
    {
    circle(left_wrist_X,left_wrist_Y,20);
    In_NumberLeftWristY = Number(left_wrist_Y);
    remove_decimal = floor(In_NumberLeftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}