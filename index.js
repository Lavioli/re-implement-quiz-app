//All numbers in the js file is referenced by the index number of an array. 
//only the display of the current question will have +1. 

var QUESTIONS = [{
    text: 'question 1',
    answers: [
        '0815',
        '2B',
        'BAM128',
        'Barely'
    ],
    answer: 0
}, {
    text: 'question 2',
    answers: [
        'You',
        'Who',
        'There',
        'You'
    ],
    answer: 1
}, {
    text: 'question 3',
    answers: [
        'Then',
        'There',
        'Yes',
        'You'
    ],
    answer: 2
}, {
    text: 'question 4',
    answers: [
        'Who',
        'What',
        'Where',
        'How'
    ],
    answer: 3
}];

var state = {
    currentQuestion: -1, //-1 indicates the presence of the array
    correctlyAnswered: []
};

//calculates total questions
var computeTotalQuestion = function() {
    return QUESTIONS.length;
}

//calculate current question the user is working on
var computeCurrentQuestion = function() {
    return state.currentQuestion + 1;
}

//calculate the score of correctly answered questions
var computeCorrectScore = function() {
    return state.correctlyAnswered.length;
}

//calculate current question the user is working on
var computeCurrentQuestion = function() {
    return state.currentQuestion + 1;
}

//resets the current question back to -1
var resetCurrentQuestion = function() {
    return state.currentQuestion = -1;
}

//reset the current score back to 0;
var resetCurrentScore = function() {
    $('.score').text(0);
}

//outputs computeTotalQuestion result and changes the text of the element in HTML
var renderTotalQuestions = function(questionsLength) {
    $('.questions-total').text(questionsLength);
}

//outputs computeCurrentQuestion result and modifies the text of .current-question
var renderCurrentQuestionNumber = function(currentQuestionNum) {
    $('.question-current').text(currentQuestionNum);
}

//render current score:
var renderCurrentScore = function(correctAnswerScore) {
    $('.score').text(correctAnswerScore);
}

//render question text
var renderQuestionChoices = function() {
    var currentQuestionIndex = state.currentQuestion;
    var questionArrayLocation = QUESTIONS[currentQuestionIndex]
    $('.question').text(QUESTIONS[currentQuestionIndex].text);
    $('.answers').empty();
    questionArrayLocation.answers.forEach(function(element, index) {
        $('.answers').append('<li value="' + index + '">' + element + '</li>');
    })
}

//after all the questions are answered, right after the last question, 
//the questions-page will hide and the results page will show
var showHideDiv = function(showDiv,hideDiv) {
    $(showDiv).show();
    $(hideDiv).hide();
};

//pushes the correct answered question number into the array, 
//will only be invoked if it is the correct answer
var pushCorrectAnswer = function() {
    state.correctlyAnswered.push(state.currentQuestion);
};

//state modification function: move to the next question
var nextQuestionAnswer = function() {
    return state.currentQuestion += 1;

};



//function that resets the currentQuestion to -1, 
var resetGame = function() {
    resetCurrentScore();
    resetCurrentQuestion();
    renderTotalQuestions(computeTotalQuestion());
    computeAndRenderNextQues();
    showHideDiv('.questions-page', '.results-page');
}

var computeAndRenderNextQues = function() {
    if ((state.currentQuestion + 1) >= QUESTIONS.length) {
        showHideDiv('.results-page', '.questions-page');
        $('#results-page-question').hide();
    } else {
        nextQuestionAnswer(); //increments state.currentQuestion  
        renderQuestionChoices(); //displays both question & answer choices
        renderCurrentScore(computeCorrectScore()); //displays current score
        renderCurrentQuestionNumber(computeCurrentQuestion()); //modify currentQuestion that is being displayed, ex: state.currentQuestion=1, but displays 2
    }
}

$(document).ready(function() {

    //when the page first loads, the total number of questions
    //and the first question & choices should be displayed
    renderTotalQuestions(computeTotalQuestion());
    computeAndRenderNextQues();

    //when the answer choice is clicked, it will check for correct/incorrect answer
    //after checking both conditions, the next question should be displayed
    $('.answers').on('click', 'li', function() {
        if ($(this).val() === QUESTIONS[state.currentQuestion].answer) { //if answer is correct
            alert('bravo!!');
            pushCorrectAnswer();
            computeAndRenderNextQues();
        } else {
            alert('Sorry!');
            computeAndRenderNextQues();
        }
    });
$('.restart-button').on('click', function() {
    resetGame();
})




});

