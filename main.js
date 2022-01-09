status="";
function preload() {
objects=[];
}
function setup() {
    canvas=createCanvas(480,330);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,480,380);
    if(status!= "") {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == value) {
                video.stop()
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=value+" found";
                var synth = window.speechSynthesis;
                var utterthis = new SpeechSynthesisUtterance(value+"found");
                synth.speak(utterthis);
            }
            else {
                document.getElementById("status").innerHTML=value+" not found";
            }
        }
    }
}
function modelLoaded() {
    console.log("model loaded")
    status=true;
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    value=document.getElementById("input").value;
}