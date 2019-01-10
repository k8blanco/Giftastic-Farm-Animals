//Giftastic Farm Animals


//Initial array of farm animals  
    var topics = ["cow", "sheep", "llama", "pig", "farm cat", "chicken", "goat", "pygmy goat",
                    "horse", "donkey", "rabbit", "duck"]; 

//function for displaying animal buttons
function renderButtons() {
    
    //delete old buttons
    $(".buttons").empty();

    //create buttons out of array
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");

            //add classes to new button
            a.addClass("animal");
            a.addClass("col-md-2");

            //add data attribute
            a.attr("new-animal", topics[i]);

            //initial button text
            a.text(topics[i]);

            //add button to html
            $(".buttons").append(a);
        }
};

//on click function for submit button/add new animal
$("#add-animal").click(function(event){

    //prevent default behavior when clicked
    event.preventDefault();

    //grab the text from the textbox
    var animal = $("#animal-input").val().trim();
    // searchInput = searchInput.toLowerCase();

    //add new animal from textbox to topics array
    topics.push(animal);

    //render all buttons
    renderButtons();

});

    //render initial buttons
    renderButtons();

    //on any dynamic-button click, run function
    $(document).on("click", ".animal", function(){
        event.preventDefault();
        var animal = $(this).attr("new-animal");
          
        //Giphy queryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
                        animal + "&api_key=0Ow8dwl9ntnRmU7yuryWwv6Z5lrMC7Fd&limit=10";
        

        //create ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            //for loop to log response
            for (var i = 0; i < response.data.length; i++) {

                //restrict rating, create cards 
                if (topics[i].rating !== "r" && topics[i].rating !== "pg-13") {
                    var animalDiv = $("<div class='card' id='animalDiv'>");
                    
                    //create rating and title variables
                    var ratingText = $("<h5 class='card-title'>").text("Rating: " + response.data[i].rating);
                    var titleText = $("<p class='card-text'>").text("" + response.data[i].title);

                    //create image variable & add class
                    var animalImage = $("<img class='card-img-top'>");

                    //add still and animate attributes to image
                    animalImage.attr({
                        "src": response.data[i].images.fixed_height_still.url,
                        "data-still": response.data[i].images.fixed_height_still.url,
                        "data-animate": response.data[i].images.fixed_height.url,
                    });
                        
                    //add image, rating and metadata to div
                    animalDiv.append(animalImage);
                    animalDiv.append(ratingText, titleText);
                    $("#gifsHere").prepend(animalDiv);
                    

                };
            }
        });
    });

       //on click, animate or still
       $(document).on("click", "img", function(){
            var imgStatus = $(this).attr("src");
            var stillURL = $(this).attr("data-still");
            var animateURL = $(this).attr("data-animate");

            if (imgStatus === stillURL) {
                $(this).attr("src", animateURL)
            }

            else {
                $(this).attr("src", stillURL)
            }
    });

    // -------------------------------------------------------------------------- //

    //Petfinder API

$(document).ready(function(){
   
    //Petfinder queryURL
    var queryURL = "https://api.petfinder.com/pet.getRandom?key=856e3c7f30bce92473037525f6338193&output=basic&format=json"

    //create ajax call
    $.ajax({
    url: queryURL,
    dataType: "jsonp",
    method: "GET"
    }).then(function(response) {
        console.log(response)
            var petDiv = $("<div class='card' id='animalDiv'>");
            var profileDiv = $("<div class='card' id='profilePetDiv'>");

            var petTitle = $("<h2>").text("Adopt Your Next Love");
            var petName = $("<h3 class='card-title'>").text("Meet " + response.petfinder.pet.name.$t);
            var petImage = $("<img id='pet'>");
            var petProfile = $("<p class='card-text'>").text("" + response.petfinder.pet.description.$t);

            var contactEmail = $("<p class='card-text'>").text("To learn more about me, please email: " + 
                response.petfinder.pet.contact.email.$t);
            var contactPhone = $("<p class='card-text'>").text("or call: " + 
                response.petfinder.pet.contact.phone.$t);

            petImage.attr("src", response.petfinder.pet.media.photos.photo[0].$t);
            
            petDiv.append(petTitle, petName, petImage);
            petDiv.append(contactEmail);
            $(".petfinderHere").append(petDiv);

            if (response.petfinder.pet.contact.phone.$t) {
                petDiv.append(contactPhone)
            };
            

            profileDiv.append(petProfile);
            $(".petDescription").append(profileDiv);

            

    });

});