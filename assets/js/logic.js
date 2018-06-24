// giphy api key 4k56iwIPS0RnWf5HeBblECm7wDCme0eb


var shows = ["Buffy The Vampire Slayer", "Star Trek The Next Generation", "Person of Interest", "CSI Miami", "Gravity Falls", "Chopped", "House MD"];

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
    $(document).on("click", ".show-button", function () {
        var showInfoDiv = $(".show-info");
        showInfoDiv.empty();
        showInfoDiv.show(400);
    })
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
            console.log("I'm run twice for some unknown reason");
        });
    });
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

//start page code
generateButtons();
})