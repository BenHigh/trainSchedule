/* global moment firebase */
// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyCQmbUXiLPrNTnPzOC0M7ynXgjkLjvX2dY",
  authDomain: "lucky7-f0893.firebaseapp.com",
  databaseURL: "https://lucky7-f0893.firebaseio.com",
  projectId: "lucky7-f0893",
  storageBucket: "lucky7-f0893.appspot.com",
  messagingSenderId: "258155825227"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();


database.ref().on("child_added", function(childSnapshot) {
  var snapshot = childSnapshot;
  var first = moment(snapshot.val().tFirst, "H:mm");

  var tRate = snapshot.val().tRate;


  console.log(first);

  var diff = moment().diff(moment(first, 'minutes'));

  console.log(Math.floor(diff/60000));

  var next = Math.floor(diff/60000) % tRate;
  console.log(next);

  var tTill = tRate - next;

  $("#tCont").append("<tr><td>" + snapshot.val().tName + "</td><td>" + snapshot.val().tDest + "</td><td>" + snapshot.val().tRate + "</td><td>" + moment().add(tTill,"minutes").format("H:mm") + "</td><td>" + tTill + "</td><td>");


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});



$("#submit").click(function(event) {
  event.preventDefault();
  var train = $("#train").val().trim();
  var dest = $("#dest").val().trim();
  var first = $("#first").val().trim();
  var rate = $("#rate").val().trim();

  var first = moment(first, "hh:mm").format("HH:mm");


  database.ref().push({
    tName: train, 
    tDest: dest, 
    tFirst: first, 
    tRate: rate
  }); 
});
