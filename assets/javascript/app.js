//Giftastic Farm Animals

//Pseudocode
    //Overview:
      
        //when you click on an image, it starts the gif
        //when you click again, it stops the gif


    
    //when button is clicked, pull up gifs
        //should include rating (restrict rating)
        //auto-still image
        //when gif is clicked, should play gif
        //when gif is clicked again, should stop playing gif

    //when new button is clicked
        //clear gif div of previous animal
        //repopulate with new animal


//Initial array of farm animals  
    var topics = ["cow", "sheep", "llama", "pig", "farm cat", "sheep dog", "chicken", "rooster", "goat", "pygmy goat",
                    "horse", "duck", "alpaca", "donkey", "turkey", "rabbits"]; 

//capture the new animal name from the data-attribute
    // function alertAnimalName() {
    //     var animalName = $(this).attr("new-animal");

    //     alert(animalName);
    //   };
      
//function for displaying animal buttons
function renderButtons() {
    
    //delete old buttons
    $(".buttons").empty();

    //create buttons out of array
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            //add class to new button
            a.addClass("animal");
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

    //add new animal from textbox to topics array
    topics.push(animal);

    //render all buttons
    renderButtons();

    //empty textbox field 
    // $("#add-animal").empty();

});

    //render initial buttons
    renderButtons();

    //on any dynamic-button click, alert animal name
    $(document).on("click", ".animal", function(){
        event.preventDefault();
        var animal = $(this).attr("new-animal");
    

    //   //event listener for buttons
    //   $(".buttons").click(function(){
    //       event.preventDefault();
    //       //create variable to hold button data
    //       var animal = $(this).attr("new-animal");
         
          
          //fill query giphy API
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
                        animal + "&api_key=0Ow8dwl9ntnRmU7yuryWwv6Z5lrMC7Fd&limit=10";
             //!!need search?q= !!
            //!!and rating!!

            //create ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
            
            //for loop to log response
            for (var i = 0; i < response.data.length; i++) {
               var animalDiv = $("<div>");
               //add rating
               var p = $("<p>").text("Rating: " + response.data[i].rating);
               //get image
               var animalImage = $("<img>");
               //add image and rating to div
               animalImage.attr("src", response.data[i].images.fixed_height.url);
               animalDiv.append(p);
               animalDiv.append(animalImage);
               $("#gifsHere").prepend(animalDiv);
            }
            })
      });

     