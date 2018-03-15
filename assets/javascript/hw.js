var animals = ["cats", "dogs", "parrots", "birds", "lions"];

function displayAnimals() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NNTsl0EV1lnlP0srz9RMTwD2f6g8cjoc&q=" + animal + "&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i=0; i<results.length; i++){
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;

            var p = $("<p>").text("Rating: "+ rating)
            var animalImage = $("<img>");

            animalImage.addClass("gif");

            animalImage.attr("data-state", "still");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("alt", results[i].title);

            gifDiv.append(p);
            gifDiv.append(animalImage);

            $("#animals-view").prepend(gifDiv);

        }

            renderButtons();
    })
}

//Function for adding button for the searched animal
function renderButtons() {

    // To empty the buttons already existing while loading to prevent repetition
    $("#buttonDiv").empty();



    //create a new button every time for the animals in the array in every iteration
    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttonDiv").append(a);
    }

}

//On clicking submit, a button with the search item will be added to the button array
$("#add-animal").on("click", function (event) {

    //This will prevent the page reloading after every time the submit button is clicked.
    event.preventDefault();

    if ($("#animal-input").val() !== " ") {

        var animal = $("#animal-input").val();
        console.log(animal);


        $("#animal-input").val(" ");
        animals.push(animal);
        console.log(animals);
        renderButtons();
    }
});

$(document).on("click", ".animal-btn", displayAnimals);

$(document).on("click", ".gif", function(){

    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

renderButtons();