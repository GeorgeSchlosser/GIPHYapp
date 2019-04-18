// GLOBAL VARIABLES
// ==========================================================

// mythological beasts
var topics = ["dragon", "pheonix", "kraken", "sphinx", "basilisk", "manticore", "leviathan", "cthullu"];

var key = "&api_key=7zafGwFJdX1OVFG69CMxokYSTWaTgR4Y";
var apiSearch  = "https://api.giphy.com/v1/gifs/search?q=";
var limitTen = "&limit=10";


// FUNCTIONS
// ==========================================================

// create buttons using for-loop for each string in array
function generateButtons() {
    $("#button-dump").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("beast-btn");
        b.attr("data-beast", topics[i]);
        b.text(topics[i]);
        $("#button-dump").append(b);
    }
};

// take user input from html form and add to topics
    // recreate buttons



// APPLICATION
// ==========================================================

generateButtons();

// get gifs on button click
$("button").on("click", function() {
    var beast = $(this).attr("data-beast");
    var queryURL = apiSearch + beast + key + limitTen;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        var results = response.data;
        // console.log(results);
        for (var e = 0; e < results.length; e++) {
            if (results[e].rating !== "r"/* && results[i].rating !== "pg-13"*/) {
                
                var rating = results[e].rating;

                var gifDiv = $("<div>");

                var hThree = $("<h3>").text("Rated: " + rating);

                var beastImage = $("<img>");
                beastImage.attr("src", results[e].images.fixed_height_still.url);

                $("#gif-dump").prepend(gifDiv);
                gifDiv.append(beastImage);
                gifDiv.append(hThree);
                
                // console.log(gifDiv);
            }
        }
    });
});

// when button pressed, grab 10 paused gifs from giphy api
    // when gif clicked play, click again to pause
// display rating under gif

