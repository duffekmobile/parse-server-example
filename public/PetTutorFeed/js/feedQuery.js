Parse.$ = jQuery;

/*~~~~~~~~~~~~~~~~~~~~
Initialize Parse with your Parse application javascript keys
~~~~~~~~~~~~~~~~~~~~*/
Parse.initialize("123123123");
Parse.serverURL = "https://ptremotetest.herokuapp.com/parse"

var RemoteFeed = Parse.Object.extend("RemoteFeed");
var parObj;

/*~~~~~~~~~~~~~~~~~~~~
 shouldFeed is default to False.
 This queries Parse, then sets the
 returned object to a global variable - parObj
 ~~~~~~~~~~~~~~~~~~~~*/
function feedQuery(){
    //find the first row
    var query = new Parse.Query(RemoteFeed);

    //get the first row
    query.first({
        success: function(object){
            //Successfully retrieved first object
            console.log("Query made");

            //set object to global variable
            parObj = object;
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
}


/*~~~~~~~~~~~~~~~~~~~~
This sets shouldFeed to true
 ~~~~~~~~~~~~~~~~~~~~*/
function feedButton() {
    parObj.set("shouldFeed", true);
    parObj.save(null, {
        success: function(parObj) {
            //This takes place after the parObj is saved.
            timer(parObj);
        },
        error: function(parObj, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to make true, with error code: ' + error.message);
        }
    });

    return parObj;
}


/*~~~~~~~~~~~~~~~~~~~~
This function is called when the FEED button
is pressed, and again when shouldFeed is set to true
 ~~~~~~~~~~~~~~~~~~~~*/
function timer(obj){
    //if shouldFeed is true
    //timer starts
    if(obj == null){
        document.getElementById("feedButton").className = "button-off";
        //console.log(obj)
        startTime = event.timeStamp;
        console.log("start= " + startTime);
    }
    //if shouldFeed is false
    //timer ends and calculates difference
    else{
        document.getElementById("feedButton").className = "button-on";
        //console.log(obj)
        endTime = event.timeStamp;
        console.log("end= " + endTime);
        durationTime = endTime - startTime;
        console.log("duration= " + durationTime);
    }
}

/*
This toggles the text and class of the
Log In button
 */
$(document).ready(function(){
    $("#loginBtn").click(function(){
        $("#loginBtn").toggleClass("button-off");
        if($("#loginBtn").val() == "Log In"){
            $("#loginBtn").val("Log Out");
        }else{
            $("#loginBtn").val("Log In");
        }
    })
});