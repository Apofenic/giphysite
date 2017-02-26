
    



    
    // array for the topics list
    var topicArray = [];
    // function that gets search results from giphy API
    function displayGifs() {

      $('#searchResults').html(' ');

      console.log(this);
       var search = $(this).attr('data-name');
       var queryURL = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=dc6zaTOxFJmzC";
       
       $.ajax({
         url: queryURL
         , method: 'GET'
       }).done(function(response){
            
            for (var i = 0; i < 10; i++) {
              var text = $("<div>");
              var rating = response.data[i].rating
              console.log(rating);
              text.addClass("gif");
              text.attr("data-gifvalue",[i]);
              text.attr("id",'gif_'+ i);
             
              text.html("<p>Rating: " + rating + "</p><img src='" + response.data[i].images.fixed_height_still.url + "'>");
              $("#searchResults").append(text);
            }  

            $('.gif').on("click", function() {

              var gifId =($(this).attr("id"))
              var state = $(this).attr('data-state');
              console.log(gifId);

              var gifValue =($(this).attr("data-gifvalue"))
              gifValue = parseInt(gifValue);
              console.log(gifValue);

              if(state !== 'animate'|| state == 'still'){
                $('#'+gifId+'').html("<p>Rating: " + rating + "</p><img src='" + response.data[gifValue].images.fixed_height.url + "'>");
                $(this).attr('data-state','animate');
              }else{
                $('#'+gifId+'').html("<p>Rating: " + rating + "</p><img src='" + response.data[gifValue].images.fixed_height_still.url + "'>");
                $(this).attr('data-state','still');
              } 
            
            });
        });
       
    
    }

    //function to create buttons for each topic
    function renderButtons() {

        $("#topicList").empty();

        for (var i = 0; i < topicArray.length; i++) {

            var a = $("<button>");
          
            a.addClass("topic");
          
            a.attr("data-name", topicArray[i]);
         
            a.text(topicArray[i]);
            
            $("#topicList").append(a);
        }
    }

    // click event that adds new topics to the topic list 
    $("#addTopic").on("click", function(event) {
          
        event.preventDefault();

        var topic = $("#searchInput").val().trim();
          
        topicArray.push(topic);

        renderButtons();
    });
    
    // uses giphy api to search for for gifs based on which topic was clicked
    $(document).on("click", ".topic", displayGifs);
    
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();


