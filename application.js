/**
 * Created by kprasad on 2/5/16.
 */

var quizQuestions = null;

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'question.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


var index = 0;
var score = 0;



$(document).ready(function()
{

    if(quizQuestions === null){
        loadJSON(function(response){
           var all_questions  = JSON.parse(response);
           quizQuestions = all_questions.questions;
        });
    }

    var nav_button;
    nav_button = $(this).find(".quiz_button");
    nav_button.css("display", "block");

    //Event handler for navigation button
    nav_button.on('click', function() {
        //Don't need the title any more
        $(".main").find("h1").css("display", "none");

        //Reset choices
        for(j=1; j <= 4; j++) {
            $("#choice" + j).prop('checked', false);
        }

        //Terminate & Display final score
        if(index > 3){
            $('.quiz_start').css("display", "none");
            $('.results').css("display", "block");
            $('.results').append('<strong> ' + score + ' out of 4 </strong>');
        }

        //hide the button
        $(this).css("display", "none");

        //start by displaying the block of Q&A
        $(".quiz_q_and_a").css("display", "block");

        //set the questions
        var question = quizQuestions[index].question;
        $(".questions").text(question);

        //fill in answers
        for(var i=0; i < 4; i++){
            var answer = quizQuestions[index].choices[i];
            var j = i + 1;
            $("label[for=choice" + j + "]").text(answer);
        }

        //Set stage for next question
        $(this).css("display", "block");
        $(this).text("Next Question!");

    });

    //Event handler for answer select
    $('.answers').on('change', function(){
        //Find out answer & grade it
        var ans = parseInt($('input[name=answer]:checked', '.answers').val());
        var correct = quizQuestions[index].correctAnswer;
        console.log(ans + ' type ' + typeof(ans));
        console.log(correct + ' type ' + typeof(correct));

        if(ans === correct ){
            console.log ("yay");
            score = score + 1;
        }
        //Increment index to next question
        index = index + 1;
    });

});