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
      
      // if the current hour is greater than the block hour
      if (currentHour > blockHour){
      // then add class "past"
      $(this).addClass("past");
      $(this).removeClass("future"); 
      $(this).removeClass("present"); 
      }
      // if they are equal
      // then remove class "past" and add class "present"
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      }
      // else
      // remove class "past", remove class "present", add class "future"
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      }
    });
  }

  hourUpdater();

  // set up interval to check if current time needs to be updated
  setInterval(hourUpdater (15000));
  // which means execute hourUpdater function every 15 seconds

  // load any saved data from localStorage
  $('#save').on('click', function(){

    $('input[type="text"]').each(function(){    
        var id = $(this).attr('id');
        var value = $(this).val();
       localStorage.setItem(time, value);

    });   
});

$('#load').on('click', function(){
    $('input[type="text"]').each(function(){    
        var id = $(this).attr('id');
        var value = localStorage.getItem(id);

        $(this).val(value);
    });
});
  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
