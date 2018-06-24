// giphy api key 4k56iwIPS0RnWf5HeBblECm7wDCme0eb


var shows = ["Buffy The Vampire Slayer", "Star Trek The Next Generation", "Person of Interest", "CSI:Miami", "Gravity Falls", "Iron Chef", "Darkwing Duck"];
var gifs = [];
var gifThumbnail = [];
var ratings = [];
var gifTitle = [];
var favoriteGifs = [];

$(document).ready(function () {
    var generateButtons = function () {
        $(".button-list").empty();
        shows.forEach(element => {
            var newButton = $("<button>");
            newButton.text(element);
            newButton.attr("data-button", element);
            newButton.addClass("show-button");
            $(".button-list").append(newButton)
        });
        var newButton = $("<button>").addClass("new-show").text("Add a Show!");
        $(".button-list").append(newButton);
    }

    //fired when a show button is clicked
    //makes api calls to ombd and giphy
    $(document).on("click", ".show-button", function () {
        var showInfoDiv = $(".show-info");
        showInfoDiv.empty();
        var showName = $(this).attr("data-button");
        console.log(showName);
        var omdbQuery = "https://www.omdbapi.com/?apikey=trilogy&type=series&t=" + showName;
        $.ajax({
            url: omdbQuery,
            method: "GET"
        }).then(function (response) {
            if (response.Response === "False") {
                showInfoDiv.append($("<h2>").text("Couldn't Find Show in Database ¯\\_(ツ)_/¯"));
                console.log(response);
                return;
            }
            var poster = $("<img>").attr({
                src: response.Poster,
                alt: showName + " Poster"
            })
            var posterDiv = $("<div>").append(poster).addClass("poster-div");
            showInfoDiv.append(posterDiv);
            var textInfoDiv = $("<div>");
            textInfoDiv.addClass("text-info");
            textInfoDiv.append($("<h2>").text(response.Title));
            textInfoDiv.append($("<p>").text("Year: " + response.Year));
            textInfoDiv.append($("<p>").text("Actors: " + response.Actors));
            textInfoDiv.append($("<p>").text("Plot: " + response.Plot));
            textInfoDiv.append($("<p>").text("Seasons: " + response.totalSeasons));
            showInfoDiv.append(textInfoDiv);
        })
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + showName + "&api_key=4k56iwIPS0RnWf5HeBblECm7wDCme0eb&limit=10";
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                gifs.push(response.data[i].images.fixed_height.url);
                gifThumbnail.push(response.data[i].images.fixed_height_still.url);
                ratings.push(response.data[i].rating);
                gifTitle.push(response.data[i].title);
            }
            for (var i = 0; i < gifs.length; i++) {
                var gifDiv = $("<div>").addClass("gif-div");
                gifDiv.prepend($("<button>").text("Add to Favorites").attr("data-gifID", i).addClass("favorites").attr("download", ""));
                gifDiv.prepend($("<a href='" + gifs[i] + "' download><button>Download GIF</button></a>"));
                gifDiv.prepend($("<p>").text("Rating: " + ratings[i]));
                gifDiv.prepend($("<p>").text("Title: " + gifTitle[i]));
                gifDiv.prepend($("<img>").attr({
                    "src": gifThumbnail[i],
                    "alt": gifTitle[i],
                    "class": "gif-image still",
                    "data-id": i
                }));
                $(".gif-list").prepend(gifDiv);
            }
        })
    })

    //add a show button is clicked
    $(document).on("click", ".new-show", function () {
        $("header").animate({ opacity: .5 }, 500);
        $(".container").animate({ opacity: .5 }, 500, function () {
            var newForm = $("<form>").addClass("form");
            var newLabel = $("<label>");
            newLabel.attr("for", "new-show").text("Add a Show");
            var newInput = $("<input>");
            newInput.attr({
                "type": "text",
                "name": "new-show",
                "id": "textInput"
            });
            var newButton = $("<button>");
            newButton.attr("type", "submit").text("Submit").addClass("submit-button");
            newForm.append(newLabel, newInput, newButton);
            $("body").append(newForm);
            newForm.show(500);
            $(":input[name=new-show]").focus();
        });
    });

    //submit button on add a show window
    $(document).on("click", ".submit-button", function (event) {
        event.preventDefault();
        var movieName = $("#textInput").val().trim();
        console.log(movieName);
        shows.push(movieName);
        $(".form").hide(500);
        $("header, .container").animate({ opacity: 1 }, 500, function () {
            generateButtons();
            $(".form").remove();
        });
    });

    //pause and unpause gif on click
    $(document).on("click", ".gif-image", function () {
        if ($(this).hasClass("still")) {
            $(this).attr("src", gifs[$(this).attr("data-id")]).removeClass("still").addClass("animated");
        }
        else if ($(this).hasClass("animated")) {
            $(this).attr("src", gifThumbnail[$(this).attr("data-id")]).removeClass("animated").addClass("still");
        }
    })

    //header favorites button clicked
    $(".favorites-button").click(function () {
        if ($(".container").is(":visible")) {
            var newDiv = $("<div>").addClass("favorite-container");
            for (var i = 0; i < favoriteGifs.length; i++) {
                var gifDiv = $("<div>").addClass("gif-div");
                gifDiv.prepend($("<a href='" + gifs[favoriteGifs[i]] + "' download><button>Download GIF</button></a>"));
                gifDiv.prepend($("<p>").text("Rating: " + ratings[favoriteGifs[i]]));
                gifDiv.prepend($("<p>").text("Title: " + gifTitle[favoriteGifs[i]]));
                gifDiv.prepend($("<img>").attr({
                    "src": gifThumbnail[favoriteGifs[i]],
                    "alt": gifTitle[favoriteGifs[i]],
                    "class": "gif-image still",
                    "data-id": favoriteGifs[i]
                }));
                newDiv.append(gifDiv);
            }
            $(".container").slideUp(500, function () {
                var favoritesHeader = $("<h2>").text("My Favorite Gifs").addClass("center");
                var favoritesContainer = $("<div>").addClass("fav-page").hide();
                favoritesContainer.append(favoritesHeader);
                favoritesContainer.append(newDiv);
                $("body").append(favoritesContainer);
                if(favoriteGifs.length===0) {
                    favoritesContainer.append($("<h2>").text("Go Pick Some Favorites and Come Back!").addClass("center"));
                }
                favoritesContainer.slideDown(1000);
            });
        }
    })

    //home button clicked 
    $(document).on("click",".home",function() {
        $(".fav-page").slideUp(500, function() {
            $(".fav-page").remove();
            $(".container").slideDown(1000);
        });
        
    });

    //Add to Favorites Clicked
    $(document).on("click",".favorites",function() {
        if(!favoriteGifs.includes($(this).attr("data-gifID"))) {
            favoriteGifs.push($(this).attr("data-gifID"));
            $(this).text("Favorited!");
        }
    });

    //start page code
    generateButtons();
})