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
    answer: '0815'
}, {
    text: 'question 2',
    answers: [
        'You',
        'Who',
        'There',
        'Your'
    ],
    answer: 'Who'
}, {
    text: 'question 3',
    answers: [
        'Then',
        'There',
        'Yes',
        'You'
    ],
    answer: 'Yes'
}, {
    text: 'question 4',
    answers: [
        'Who',
        'What',
        'Where',
        'How'
    ],
    answer: 'How'
}];

var state = {
    currentQuestion: -1, //-1 indicates the presence of the array
    correctlyAnswered: []
};

/*Lines 49-62 is using 'The Fisher-Yates (aka Knuth)' shuffle algorithm to shuffle questions and multiple choices arrays
reference: https://github.com/coolaj86/knuth-shuffle*/
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var shuffleQuestion = function(questionArray) {
  shuffle(questionArray);
}

var shuffleChoices = function(questionArray) {
  for(var i = 0; i < questionArray.length; i++){
  shuffle(questionArray[i].answers);
  }
}

//calculates total questions
var computeTotalQuestion = function(questionsArray) {
    return questionsArray.length;
}

//calculate current question the user is working on
var computeCurrentQuestion = function(state) {
    return state.currentQuestion + 1;
}

//calculate the score of correctly answered questions
var computeCorrectScore = function(state) {
    return state.correctlyAnswered.length;
}

//resets the current question back to -1
var resetCurrentQuestion = function(state) {
    return state.currentQuestion = -1;
}

//reset the current score back to 0;
var resetCurrentScore = function(state) {
    state.correctlyAnswered = [];
}

//outputs computeTotalQuestion result and changes the text of the element in HTML
var renderTotalQuestions = function(questionsLength, element) {
    element.text(questionsLength);
}

//outputs computeCurrentQuestion result and modifies the text of .current-question
var renderCurrentQuestionNumber = function(currentQuestionNum, element) {
    element.text(currentQuestionNum);
}

//render current score:
var renderCurrentScore = function(correctAnswerScore, element) {
    element.text(correctAnswerScore);
}

//render question text
var renderQuestionChoices = function(state, questionsArray,questionElement, answerElement) {
    var currentQuestionIndex = state.currentQuestion;
    var questionArrayLocation = questionsArray[currentQuestionIndex]
    questionElement.text(QUESTIONS[currentQuestionIndex].text);
    answerElement.empty();
    questionArrayLocation.answers.forEach(function(element, index) {
        answerElement.append('<li value="' + index + '">' + element + '</li>');
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
var pushCorrectAnswer = function(state) {
    state.correctlyAnswered.push(state.currentQuestion);
};

//state modification function: move to the next question
var nextQuestionAnswer = function(state) {
    return state.currentQuestion += 1;

};


//function that resets the currentQuestion to -1,
var resetGame = function() {
    resetCurrentScore(state);
    resetCurrentQuestion(state);
    shuffleQuestion(QUESTIONS);
    shuffleChoices(QUESTIONS);
    renderTotalQuestions(computeTotalQuestion(QUESTIONS), $('.questions-total'));
    computeAndRenderNextQues(state, QUESTIONS);
    showHideDiv('.questions-page', '.results-page');
}

var computeAndRenderNextQues = function(state, questionsArray) {
    if ((state.currentQuestion + 1) >= questionsArray.length) {
        renderCurrentScore(computeCorrectScore(state), $('.score')); //displays current score
        showHideDiv('.results-page', '.questions-page');
        $('#results-page-question').hide();
    } else {
        nextQuestionAnswer(state); //increments state.currentQuestion
        renderQuestionChoices(state, questionsArray, $('.question'), $('.answers')); //displays both question & answer choices
        renderCurrentScore(computeCorrectScore(state), $('.score')); //displays current score
        renderCurrentQuestionNumber(computeCurrentQuestion(state), $('.question-current')); //modify currentQuestion that is being displayed, ex: state.currentQuestion=1, but displays 2
    }
}

$(document).ready(function() {

    //when the page first loads, the total number of questions
    //and the first question & choices should be displayed
    shuffleQuestion(QUESTIONS);
    shuffleChoices(QUESTIONS);
    console.log(QUESTIONS)
    renderTotalQuestions(computeTotalQuestion(QUESTIONS), $('.questions-total'));
    computeAndRenderNextQues(state, QUESTIONS);

    //when the answer choice is clicked, it will check for correct/incorrect answer
    //after checking both conditions, the next question should be displayed
    $('.answers').on('click', 'li', function() {
        if ($(this).text() === QUESTIONS[state.currentQuestion].answer) { //if answer is correct
            alert('bravo!!');
            pushCorrectAnswer(state);
            computeAndRenderNextQues(state, QUESTIONS);
        } else {
            alert('Sorry!');
            computeAndRenderNextQues(state, QUESTIONS);
        }
    })

    $('.restart-button').on('click', function() {
      resetGame();
    });

});
