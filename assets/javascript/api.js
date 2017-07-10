var btnArr = ["otters", "puppies", "kittens"];

function displayButtons(){
  console.log("function called displayButtons")
  $("#button-holder").empty();
  for (var i = 0; i < btnArr.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn");
    newButton.addClass("btn-primary");
    newButton.addClass("search-button")
    newButton.text(btnArr[i]);
    newButton.on("click", searchButtonClick);
    $("#button-holder").append(newButton);
  }
};

$("#submit-new-btn").on("click", function(event) {
    event.preventDefault();
    var subj = $("#new-btn").val().trim();
    $("#new-btn").val("");
    btnArr.push(subj);
    displayButtons();
});

function searchButtonClick() {
      var subject = $(this).text();

      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        subject + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var subjectImage = $("<img>");

              subjectImage.attr("src", results[i].images.fixed_height.url);

              gifDiv.append(p);
              gifDiv.append(subjectImage);

              $("#gif-holder").prepend(gifDiv);
            }
          }
        });
    };

displayButtons();