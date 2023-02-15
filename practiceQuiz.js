function generateQuiz(questions, quizContainer, resultsContainer, submitButton, continueButton){

    //randomly select 3 choices in a list
    rand_questions = chooseRandom(questions, 3)

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer to this question...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input class = "radio-choice" type="radio" name="question'+i+'" value="'+letter+'">'
                        // + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    showQuestions(rand_questions, quizContainer);

    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'green';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'crimson';
            }
        }

        // show number of correct answers out of total and allow to continue
        // resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        if (numCorrect == 3) {
            button = '<a class="btn btn-success" href="cleaning.html" >Continue</a>';
            continueButton.innerHTML = button;
        }
    }

    submitButton.onclick = function(){
        showResults(rand_questions, quizContainer, resultsContainer);
    }
}

function chooseRandom(arr, num) {
    var shuffled = arr.sort(() => 0.5 - Math.random());
    // console.log(shuffled.slice(0, num));
    return shuffled.slice(0, num);
}