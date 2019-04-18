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

//generate gifs on button click
$("button").on("click", function() {
    var beast = $(this).attr("data-beast");
    var queryURL = apiSearch + beast + key + limitTen;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        // console.log(response);
        var results = response.data;
        // console.log(results);
        for (var e = 0; e < results.length; e++) {
            if (results[e].rating !== "r"/* && results[i].rating !== "pg-13"*/) {
                
                var rating = results[e].rating;

                var gifDiv = $("<div>");
                

                var hThree = $("<h3>").text("Rated: " + rating);

                var beastImage = $("<img>");
                beastImage.attr("src", results[e].images.fixed_height_still.url);
                // attributes & class for play/pause
                beastImage.attr("data-still", results[e].images.fixed_height_still.url);
                beastImage.attr("data-animate", results[e].images.fixed_height.url);
                beastImage.attr("data-state", "still");
                beastImage.addClass("gif");

                $("#gif-dump").prepend(gifDiv);
                gifDiv.append(beastImage);
                gifDiv.append(hThree);
                
                // console.log(gifDiv);
            }
        }
    });
});

// play/pause by clicking gif

// 
// $(".gif").on("click", function() {
//         var state = $(this).attr("data-state");
//         if (state === "still") {
//             $(this).attr("src", $(this).attr("data-animate"));
//             $(this).attr("data-state", "animate");
//         } 
//         else {
//             $(this).attr("src", $(this).attr("data-still"));
//             $(this).attr("data-state", "still");
//         };

//         console.log(state);

// });

// WHY DOES THIS WORK BUT MY CODE DOESNT?!?!?
$(document.body).on('click', ".gif", function () {
    var $img = $(this);
    if ($img.attr("data-state") == "still") {
        $img.attr("src", $img.attr("data-animate"));
        $img.attr("data-state", "animated");
    } else {
        $img.attr("src", $img.attr("data-still"));
        $img.attr("data-state", "still");
    }
});

// when button pressed, grab 10 paused gifs from giphy api: COMPLETE
    // when gif clicked play, click again to pause
// display rating under gif: COMPLETE

