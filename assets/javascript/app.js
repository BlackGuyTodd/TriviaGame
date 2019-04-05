$(document).ready(function () {

    // INSTRUCTIONS =========================================
    // //You'll create a trivia game that shows only one question until the player answers it or their time runs out.
    // If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

    // The scenario is similar for wrong answers and time-outs.


    // If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
    // If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.


    // On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).




    // GLOBAL VARIABLES =====================================
    var clockRunning = false;
    var intervalId;
    var countDownTimer = 15;
    var userPick;
    var currentQuestion = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswer = 0;
    var questions = [{
        question: "Which television series began each show with a voiceover 'Space... the Final Frontier. These are the voyages of the starship Enterprise...'",
        answers: ["All the Star Trek series", "Star Trek Enterprise", "Star Trek Voyager", "Star Trek The Orignal Series & Star Trek TNG"],
        correctAnswer: "All the Star Trek series"
    }, {
        question: "The original 'Star Trek' series ran from 1966 to 1969; then, beginning in 1987, several 'Star Trek' spin-off series ran continuously until 2005. How many 'Star Trek' series first aired during that eighteen year time period?",
        answers: ["4", "5", "3", "6"],
        correctAnswer: "4"
    }, {
        question: "This starbase was the site of Kirk's court martial for the death of Ben Finney",
        answers: ["Starbase 3", "Starbase 4", "Deep Space 9", "Starbase 11"],
        correctAnswer: "Starbase 11"
    }, {
        question: "Which of the following Q-themed episodes is NOT from 'Star Trek: Voyager'",
        answers: ["The Q and the Grey", "Q2", "Death Wish", "True Q"],
        correctAnswer: "True Q"
    }, {
        question: "Where is the Borg's native territory?",
        answers: ["The Gamma Quadrant", "The Delta Quadrant", "The Alpha Quadrant", "The Beta Quadrant"],
        correctAnswer: "The Delta Quadrant"
    }, {
        question: "'Star Trek' has introduced us to various sports, and we have seen quite a few of them. But which of the following sports was never shown during any incarnation of 'Star Trek'?",
        answers: ["Springball", "Anbo-jytsu", "Tsunkatse", "Parrises Squares"],
        correctAnswer: "Parrises Squares"
    }
    ];

    function createQuestion(index) {
        $("#questionblock").empty();
        $("#answerblock").empty();
        console.log(questions[index])
        var question = $("<p>");
        question.text(questions[index].question);
        question.addClass("question");
        $("#questionblock").append(question);
        for (var i = 0; i < questions[index].answers.length; i++) {
            console.log(questions[index].answers[i]);
            var button = $("<button>");
            button.text(questions[index].answers[i]);
            button.addClass("answer btn btn-success");
            button.attr("choice", questions[index].answers[i]);
            $("#answerblock").append(button);
        }
        countDownTimer = 15;
        startTimer();
        checkAnswer();

    }

    function checkAnswer() {
        $(".answer").on("click", function () {
            userPick = $(this).attr("choice");
            console.log($(this).attr("choice"));
            if (userPick === questions[currentQuestion].correctAnswer) {
                console.log("Correct");
                correctAnswers++;

            } else {
                incorrectAnswers++;
            }
            currentQuestion++;
            quizResults();
            // createQuestion(currentQuestion);
        })
    }

    // // for (var i = 0; i < questions.length; i++) {
    // //     $("<div>").append(questions.question);
    // //     $("<p>").append(questions.answers[i]);

    // }

    function startTimer() {

        if (!clockRunning) {
            intervalId = setInterval(decrement, 1000);
            clockRunning = true;
        }
    }

    function decrement() {

        //  Decrease number by one.
        countDownTimer--;
        console.log(countDownTimer);
        //  Show the number in the #show-number tag.
        $("#timeleft").html("<h2>Time left: " + countDownTimer + "</h2>");


        //  Once number hits zero...
        if (countDownTimer === 0) {

            //  ...run the stop function.
            stop();
            clockRunning = false;
            //  Alert the user that time is up.
            alert("Time Up!");
            createQuestion(currentQuestion++);
        }
    }

    function stop() {

        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
        incorrectAnswers++;
        clockRunning = false;
    }




    function quizResults() {
        if (currentQuestion === questions.length) {
            console.log("Quiz Done");
            stop();
            $("#answerblock").empty();
            $("#questionblock").empty();
            //Append Wins and losses 
            $("#correct-answers").html("<p id='correct'>Correct Answers: " + correctAnswers + "</p>");
            $("#incorrect-answers").html("<p id='incorrect'>Incorrect Answers: " + incorrectAnswers + "</p>");
            //Then reset variables to 0
            currentQuestion = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            countDownTimer = 15;
            //option to restart the game, a button that recalls start game function.
            var newButton = $("<button id='reset-button'>Reset</button>");
            $(".reset-button").append(newButton);

        } else {
            createQuestion(currentQuestion);
        }
    }


    //Display a start button on the screen. *maybe a star trek song plays*
    $("#start").on("click", function () {
        //Create a div to display question
        //with the timer
        createQuestion(currentQuestion);
        $("#start").hide();
        //Create a div to hold 



    })

    $(document).on("click", "#reset-button", function(){
        createQuestion(currentQuestion);
        $("#correct-answers").empty();
        $("#incorrect-answers").empty();
        $("#reset-button").empty();
    })
    $("#reset-button").on("click", function () {
        //Create a div to display question
        //with the timer
        // createQuestion(currentQuestion);



    })
})
