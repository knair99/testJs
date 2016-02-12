/**
 * Created by kprasad on 2/5/16.
 */

var quizQuestions = [
    {question: "How many states does India have?",
        choices: ["29", "30", "28", "31"],
        correctAnswer:0},

    {question: "How many Lok Sabha constituencies does India have?",
        choices: ["29", "543", "275", "250"],
        correctAnswer:1},

    {question: "Who is the current President of India?",
        choices: ["Narendra Modi", "Rajnath Singh", "Hamid Ansari", "Pranab Mukherjee"],
        correctAnswer:3},

    {question: "What is India's national language?",
        choices: ["English", "Sanskrit", "Hindi", "None of the above"],
        correctAnswer:3}

];

var index = 0;
var score = 0;

$(document).ready(function()
{
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