Parse.$ = jQuery;

/*~~~~~~~~~~~~~~~~~~~~
Initialize Parse with your Parse application javascript keys
~~~~~~~~~~~~~~~~~~~~*/
Parse.initialize("pettutor");
Parse.serverURL = "https://ptremotetest.herokuapp.com/parse"

var RemoteFeed = Parse.Object.extend("RemoteFeed");
var parObj;

/*~~~~~~~~~~~~~~~~~~~~
This makes a new row and sets it to false.
I had this because I wasn't sure how to create
a new row in Parse manually, so I decided to use code
instead.
~~~~~~~~~~~~~~~~~~~~

var RemoteFeed = Parse.Object.extend("RemoteFeed");
var remoteFeed = new RemoteFeed();

remoteFeed.set("shouldFeed", false);

remoteFeed.save(null, {
  success: function(remoteFeed) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + remoteFeed.id);
  },
  error: function(remoteFeed, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

*/

/*~~~~~~~~~~~~~~~~~~~~
 This prints to the console the current
 state of shouldFeed from Parse every 5 seconds
 ~~~~~~~~~~~~~~~~~~~~*/
function listenForFeed(obj) {
    //console.log("See me every 5 seconds!");
    var query = new Parse.Query(RemoteFeed);

    document.getElementById("listenButton").className = "button-off";

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

function feedQuery(){
    //find the first row
    var query = new Parse.Query(RemoteFeed);

    //get the first row
    query.first({
        success: function(object){
            //Successfully retrieved first object
            console.log(object);
            //triggerFeed(object);
            parObj = object;
        },
        error: function(error){
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

/*~~~~~~~~~~~~~~~~~~~~
shouldFeed is default to False.
This queries Parse, then calls
a function to set RemoteFeed to true
 ~~~~~~~~~~~~~~~~~~~~*/
function feedButton(){
    //console.log(parObj.get("shouldFeed"));
    triggerFeed(parObj);
}


/*~~~~~~~~~~~~~~~~~~~~
This sets shouldFeed to true
 ~~~~~~~~~~~~~~~~~~~~*/
function triggerFeed(obj) {
    obj.set("shouldFeed", true);
    obj.save(null, {
        success: function(obj) {
            // Execute any logic that should take place after the obj is saved.
            //alert('FEEDING!');
            timer(obj);
        },
        error: function(obj, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to make true, with error code: ' + error.message);
        }
    });

    return obj;
}


/*~~~~~~~~~~~~~~~~~~~~
This sets a timer for the listening function
 ~~~~~~~~~~~~~~~~~~~~*/
//var myVar = setInterval(listenForFeed, 5000);



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
