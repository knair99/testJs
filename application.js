/**
 * Created by kprasad on 2/5/16.
 */

var quizQuestions = null;
var index = -1; //For initial nav button value
var score = 0;
var answers = [];
var prev_ans = 0;

//Function to load JSON file
//Use AJAX for local query
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'question.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
//When document is ready use AJAX callback
$(document).ready(function()
{
    //Load questions from JSON file into quizQuestions
    if(quizQuestions === null){
        //this is the callback
        loadJSON(function(response){
           var all  = JSON.parse(response);
           quizQuestions = all.questions;
        });
    }

    //Setup page
    var nav_button;
    nav_button = $(this).find(".quiz_button");
    nav_button.css("display", "block");

    var nav_back_button;
    nav_back_button = $(this).find(".quiz_back_button");
    nav_back_button.css("display", "none");


    //Event handler for navigation button
    nav_button.on('click', function() {

        //Increment index to next question
        index = index + 1;

        //Display the back button
        nav_back_button.css("display", "block");
        //Don't need the title any more
        $(".main").find("h1").css("display", "none");
        //Reset choices on answers input
        for (j = 0; j < 4; j++) {
            $("#choice" + j).prop('checked', false);
        }

        //Calculate previous questions score from here
        if (index > 0) {
            //Get previous question's answer
            var correct = quizQuestions[index-1].correctAnswer;
            if(prev_ans === correct ){
                score = score + 1;
                console.log("correct");
            }
        }

        //Terminate & Display final score
        if (index > 3) {
            $('.quiz_start').css("display", "none");
            $('.results').css("display", "block");
            $('.results').append('<strong> ' + score  + ' out of 4 </strong>');
            return;
        }
        //start by displaying the block of Q&A
        $(".quiz_q_and_a").css("display", "block");
        //set the questions
        var question = quizQuestions[index].question;
        $(".questions").text(question);
        //fill in answers
        for (var i = 0; i < 4; i++) {
            var answer = quizQuestions[index].choices[i];
            $("label[for=choice" + i + "]").text(answer);
        }
        //Set stage for next question
        $(this).css("display", "block");
        $(this).text("Next");

    });

    //Event handler for back button
    nav_back_button.on('click', function() {

        //Start by decrementing index to previous question
        index = index - 1;

        //Display the block of Q&A
        $(".quiz_q_and_a").css("display", "block");

        //set the questions
        var question = quizQuestions[index].question;
        $(".questions").text(question);

        //fill in answers
        for(var i=0; i < 4; i++){
            var answer = quizQuestions[index].choices[i];
            $("label[for=choice" + i + "]").text(answer);
        }

    });

    //Event handler for answer select
    $('.answers').on('change', function(){
         prev_ans = parseInt($('input[name=answer]:checked', '.answers').val());
    });

});