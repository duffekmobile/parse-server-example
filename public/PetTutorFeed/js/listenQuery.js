Parse.$ = jQuery;

/*~~~~~~~~~~~~~~~~~~~~
Initialize Parse with your Parse application javascript keys
~~~~~~~~~~~~~~~~~~~~*/
Parse.initialize("123123123");
Parse.serverURL = "https://ptremotetest.herokuapp.com"

var RemoteFeed = Parse.Object.extend("GameScore");
var parObj;
var timeToggle;

function listenToggle() {
    if (timeToggle != 1) {
        intervalId = setInterval(listenForFeed, 5000);
        timeToggle = 1;
    }else{
        clearInterval(intervalId);
        timeToggle = 0;
    }

}

/*~~~~~~~~~~~~~~~~~~~~
 This prints to the console the current
 state of shouldFeed from Parse every 5 seconds
 ~~~~~~~~~~~~~~~~~~~~*/
function listenForFeed(obj) {
    //console.log("See me every 5 seconds!");
    var query = new Parse.Query(RemoteFeed);


    //get the first row
    query.first({
        success: function(object){
            parObj = object;
            //Successfully retrieved first object
            console.log(parObj.get("shouldFeed"));
            if(object.get("shouldFeed") == false){
                console.log("Listening");
            }else{
                console.log("FEEDING!");
                setFalse(object);
            }
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
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