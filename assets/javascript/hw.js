var animals = ["cats", "dogs", "parrots", "birds", "lioncubs"];

//Function for adding button for the searched animal
function renderButtons(){

    // To empty the buttons already existing while loading to prevent repetition
    $("#buttonDiv").empty();

    

    //create a new button every time for the animals in the array in every iteration
    for (var i=0; i<animals.length; i++){
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttonDiv").append(a);
    }
        
}

//On clicking submit, a button with the search item will be added to the button array
$("#add-animal").on("click", function(event){
    event.preventDefault();

    var animal = $("animal-input").val();
    console.log(animal);
    animals.push(animal);
    console.log(animals);
    renderButtons();
});
renderButtons();

