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
        b.addClass("btn-secondary");
        b.attr("data-beast", topics[i]);
        b.text(topics[i]);
        $("#button-dump").append(b);
    }
};

// APPLICATION
// ==========================================================

generateButtons();

// create new button w/ form
$("#add-beast").on("click", function(event) {
    event.preventDefault();
    var newBeast = $("#beast-input").val().trim();
    topics.push(newBeast);
    generateButtons();
});

//generate gifs on button click
$("#button-dump").on("click", ".beast-btn", function() {
    var beast = $(this).attr("data-beast");
    var queryURL = apiSearch + beast + key + limitTen;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        // put response into a variable
        var results = response.data;
        // loop through results
        for (var e = 0; e < results.length; e++) {
            // omits r-rated gifs
            if (results[e].rating !== "r"/* && results[i].rating !== "pg-13"*/) {
                // gets rating to be display
                var rating = results[e].rating;
                // make a div
                var gifDiv = $("<div>");
                // display rating
                var hThree = $("<h3>").text("Rated: " + rating);
                // make an img
                var beastImage = $("<img>");
                // link to paused gif for img
                beastImage.attr("src", results[e].images.fixed_height_still.url);
                // attributes & class for play/pause
                beastImage.attr("data-still", results[e].images.fixed_height_still.url);
                beastImage.attr("data-animate", results[e].images.fixed_height.url);
                beastImage.attr("data-state", "still");
                beastImage.addClass("gif");
                // places gifs on the page
                $("#gif-dump").prepend(gifDiv);
                gifDiv.append(beastImage);
                gifDiv.append(hThree);
            }
        }
    });
});

// play/pause by clicking gif
$("#gif-dump").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
});