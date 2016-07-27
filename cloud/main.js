
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});




Parse.Cloud.define('checkFeedStatus', function(req, res) {
    var query = new Parse.Query(RemoteFeed);
    query.first().then(function(object){
        console.log("Hello! " + object.get("shouldFeed"));
    },
    function(error){
        console.log("Error!");
    });


    //res.success('Hi');
});