
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});




Parse.Cloud.define('checkFeedStatus', function(request, response) {

    var startTime = new Date().getTime(); // Get the start time
    var timeLimit = 8000; // max time 10 seconds
    

    // Function we want to repeat
    // function checkForChange() {
    //
    //     var q = new Parse.Query( Parse.Object.extend('RemoteFeed') );
    //     q.get('OhHL5g0ToP').then(function(remoteFeedObject) {
    //
    //         var currentTime = new Date().getTime();
    //
    //         // if feed var was set, respond with true
    //         if(remoteFeedObject.get("shouldFeed")) {
    //             response.success("Should feed");
    //         }
    //         // if we havent reached the time limit, check again
    //         else if (currentTime - startTime < timeLimit) {
    //
    //             checkForChange();
    //         }
    //         // otherwise exit and say that no change was detected
    //         else {
    //             response.success("No change was detected");
    //         }
    //
    //
    //
    //     }, function(e) {
    //         // handle error
    //
    //     });
    //
    // }

    response.success("test");

    // Start the repeat function
    checkForChange();

    
});