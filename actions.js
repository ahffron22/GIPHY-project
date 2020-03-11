$(document).ready(function() {
  var gifs = ["lion", "Tiger", "bear", "cow", "bird"];

  // gifDisplay function re-renders the HTML to display the appropriate content
  function gifDisplay() {
    var gif = $(this).attr("data-name");
    // var queryURL = "https://www.omdbapi.com/?t=" + gif + "&apikey=trilogy";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gif +
      "&limit=5&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data[0]);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var img = $("<img>").attr(
          "src",
          results[i].images.fixed_height_still.url
        );
        $("#gifs-view").prepend(img);
      }
    });
  }

  // Function for displaying gif data
  function renderButtons() {
    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
      // Then dynamicaly generating buttons for each gif in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gif-btn to our button
      a.addClass("gif-btn");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  // This function handles events where a gif button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input")
      .val()
      .trim();

    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "gif-btn"
  $(document).on("click", ".gif-btn", gifDisplay);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});
