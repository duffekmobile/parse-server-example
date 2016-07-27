Parse.$ = jQuery;

/*~~~~~~~~~~~~~~~~~~~~
Initialize Parse with your Parse application javascript keys
~~~~~~~~~~~~~~~~~~~~*/
Parse.initialize("pettutor"); //THIS IS APP ID NOT MASTER KEY
//console.log("Hello");
Parse.serverURL = "https://ptremotetest.herokuapp.com/parse";

var RemoteFeed = Parse.Object.extend("RemoteFeed");
var parObj;
var timeToggle;
var lastUpdateTime;
var currentTime;
var timeMil;
var timer;

function listenToggle() {
    /*
    if (timeToggle != 1) {
        intervalId = setInterval(listenForFeed, 5000);
        timeToggle = 1;
    }else{
        clearInterval(intervalId);
        timeToggle = 0;
    }
    */
    listenForFeed();

}

/*~~~~~~~~~~~~~~~~~~~~
 This prints to the console the current
 state of shouldFeed from Parse every 5 seconds
 ~~~~~~~~~~~~~~~~~~~~*/
function listenForFeed() {
    console.log("Listening... ");
    Parse.Cloud.run('checkFeedStatus').then(function(response){
        console.log(response);

        if(response == "Should feed"){
            timeNow = new Date().getTime();
            console.log("Feed Detected at: " + timeNow);
        }

        listenForFeed();
    });
    /*
    var query = new Parse.Query(RemoteFeed);
    query.first().then(function(object){
            console.log("Hello! " + object.get("shouldFeed"));
        },
        function(error){
            console.log("Error!");
        });
    */
    /*
    //console.log("listen");
    var query = new Parse.Query(RemoteFeed);


    //get the first row
    query.first({
        success: function(object){
            parObj = object;
            //Successfully retrieved first object
            console.log(parObj.get("shouldFeed"));
            if(object.get("shouldFeed") == false){
                console.log("Listening");
                console.log("Last Updated: " + object.updatedAt);
            }else{
                console.log("FEEDING!");
                console.log("Last Updated: " + object.updatedAt);

                currentTime = new Date();
                lastUpdateTime = object.updatedAt;
                
                timeMil = currentTime.getTime();
                updateMil = lastUpdateTime.getTime();

                timer = timeMil - updateMil;
                console.log("Equation: " + currentTime + " - " + lastUpdateTime);
                console.log("Time from server: " + timer);

                setFalse(object);
            }
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
    */
}


/*~~~~~~~~~~~~~~~~~~~~
 This function will set shouldFeed to false
 ~~~~~~~~~~~~~~~~~~~~*/
function setFalse(obj) {
    //console.log(obj);
    //var query = new RemoteFeed();

    obj.set("shouldFeed", false);

    obj.save(null, {
        success: function(obj) {
            // Execute any logic that should take place after the obj is saved.
        },
        error: function(obj, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to make true, with error code: ' + error.message);
        }
    });
}


/*
 This toggles the text and class of the
 Log In button
 */
$(document).ready(function(){
    $("#listenBtn").click(function(){
        $("#listenBtn").toggleClass("button-off");
        if($("#listenBtn").val() == "Listen"){
            $("#listenBtn").val("Listening...");
        }else{
            $("#listenBtn").val("Listen");
        }
    })
});