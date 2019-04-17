// GLOBAL VARIABLES
// ==========================================================

// mythological beasts
var topics = ["dragon", "pheonix", "kraken", "sphinx", "basilisk", "manticore", "leviathon", "cthullu"];


// FUNCTIONS
// ==========================================================

// create buttons using for-loop for each string in array
function generateButtons() {
    $("#button-dump").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("beast-btn");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-dump").append(b);
    }
};

// take user input from html form and add to topics
    // recreate buttons



// APPLICATION
// ==========================================================

generateButtons();
// when button pressed, grab 10 paused gifs from giphy api
    // when gif clicked play, click again to pause
// display rating under gif

