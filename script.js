$(document).ready(function() {
  // listen for save button clicks
  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

    // save the value in localStorage as time
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      console.log(blockHour, currentHour);

      // check if we've moved past this time
      if (currentHour > blockHour){
      // then add class "past"
      $(this).addClass("past");
      $(this).removeClass("future"); 
      $(this).removeClass("present"); 
      }
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      }
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  hourUpdater();

  // set up interval to check if current time needs to be updated
  var timeStatus = setInterval(hourUpdater (15000));
  // which means execute hourUpdater function every 15 seconds

  // load any saved data from localStorage
  var allLogs = [];
  for(var i=0; i<localStorage.length; i++)
  {
    allLogs.push(localStorage.key(i));    
  }

  for(var i=0; i<allLogs.length; i++)
  {
    var id = allLogs[i];
    var value = localStorage.getItem(id);
    $("#" + id + " textarea").val(value);
  }

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
