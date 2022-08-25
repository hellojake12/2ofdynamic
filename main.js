status="";
object=[];

function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}

function draw(){
    image(video,0,0,280,280);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i< object.length; i++){
            document.getElementById("status").innerHTML="Status :Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects : "+object.length;
            

            fill("red");
            percent= floor(object[i].confidence*100);
            text(object[i].label +" "+ percent +"%", object[i].x, object[i].y);
            noFill()
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML= object_name+" found";
            }
            else{
                document.getElementById("status").innerHTML= object_name+" not found";
            }
        }

    }

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}