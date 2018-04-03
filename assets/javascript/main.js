// Initialize Firebase
var config = {
    apiKey: "AIzaSyAzpeh_fG9KACsoOAm0F6VSAm4o_G49E1w",
    authDomain: "train-schedule-b8aae.firebaseapp.com",
    databaseURL: "https://train-schedule-b8aae.firebaseio.com",
    projectId: "train-schedule-b8aae",
    storageBucket: "train-schedule-b8aae.appspot.com",
    messagingSenderId: "911134151956"
  };
  firebase.initializeApp(config);


// Define firebase database
var database = firebase.database();


//Button for adding trains
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trName = $("#trName").val().trim();
  var trDestination = $("#trDestination").val().trim();
  var trTime = $("#trTime").val().trim();
  var trFrequency = $("#trFrequency").val().trim();

  // Clears all of the text-boxes
  $("#trName").val("");
  $("#trDestination").val("");
  $("#trTime").val("");
  $("#trFrequency").val("");

  // Add each employee's data to the database
  database.ref().push({
      name: trName,
      destination: trDestination,
      time: trTime,
      frequency: trFrequency
  })
});

// Firebase watcher
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    // Frequency of the train
    var trFrequency = childSnapshot.val().frequency;
    // Original start time of the train
    var trStart = childSnapshot.val().time;
    // Start time converted back 1 year
    var trStartConverted = moment(trStart, "HH:mm").subtract(1, "years");
    // Difference between the current time and the start time of the train
    var diffTime = moment().diff(moment(trStartConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % trFrequency;
    // Minutes until next train
    var tMinutesTillTrain = trFrequency - tRemainder;
    // Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#train-table > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
    childSnapshot.val().frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
})