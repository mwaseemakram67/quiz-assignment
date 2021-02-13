(function () {
    const myQuestions = [
        {
            question: "Who invented JavaScript?",
            answers: {
                a: "Douglas Crockford",
                b: "Sheryl Sandberg",
                c: "Brendan Eich"
            },
            correctAnswer: "c"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                a: "Node.js",
                b: "TypeScript",
                c: "npm"
            },
            correctAnswer: "c"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                a: "Angular",
                b: "jQuery",
                c: "RequireJS",
                d: "ESLint"
            },
            correctAnswer: "d"
        },
        {
            question: "What is the return type of the hashCode() method in the Object class?",
            answers: {
                a: "Object",
                b: "int",
                c: "long",
                d: "void"
            },
            correctAnswer: "b"
        },
        {
            question: "Which method of the Class.class is used to determine the name of a class represented by the class object as a String?",
            answers: {
                a: "getClass()",
                b: "intern()",
                c: "getName()",
                d: "toString()"
            },
            correctAnswer: "c"
        },
        {
            question: "Which of the following is true about the anonymous inner class?",
            answers: {
                a: "It has only methods",
                b: "Objects can't be created",
                c: "It has a fixed class name",
                d: "It has no class name"
            },
            correctAnswer: "d"
        },
        {
            question: "What do you mean by nameless objects?",
            answers: {
                a: "An object created by using the new keyword.",
                b: "An object of a superclass created in the subclass.",
                c: "An object without having any name but having a reference.",
                d: "An object that has no reference."
            },
            correctAnswer: "d"
        },
        {
            question: "Which package contains the Random class?",
            answers: {
                a: "java.util package",
                b: "java.lang package",
                c: "java.awt package",
                d: "java.io package"
            },
            correctAnswer: "a"
        },
        {
            question: "Which of the following is an immediate subclass of the Panel class?",
            answers: {
                a: "Applet class",
                b: "Window class",
                c: "Frame class",
                d: "Dialog class"
            },
            correctAnswer: "a"
        },
        {
            question: "Which option is false about the final keyword?",
            answers: {
                a: "A final method cannot be overridden in its subclasses.",
                b: "A final class cannot be extended.",
                c: "A final class cannot extend other classes.",
                d: "A final method can be inherited."
            },
            correctAnswer: "c"
        }
    ];

    // Functions
    const suffleFunction = shuffle(myQuestions)
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        suffleFunction.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question">${questionNumber + 1}) ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    //Shuffle function return randomly mixed array.
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;
        const result = [];

        // for each question...
        suffleFunction.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';

            }
            // if answer is wrong or blank
            else {
                result.push(
                    `<div class="result-options">
              <div class="result-question">${questionNumber + 1}) ${currentQuestion.question} </div>
              <div class="user-answer">Your Answer: ${userAnswer ? userAnswer : "" } ) ${currentQuestion.answers[userAnswer] ? currentQuestion.answers[userAnswer] :  "Not Answered" } </div>
              <div class="correct-answer">Correct Answer: ${currentQuestion.correctAnswer} ) ${currentQuestion.answers[currentQuestion.correctAnswer]} </div>
            </div>`
                );
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        resultsOutput.style.display = "block";
        resultContent.innerHTML = result.join('');

        // show number of correct answers out of total
        resultsContainer.innerHTML = `You got: ${numCorrect} out of ${myQuestions.length}`;
        quizContent.style.display = "none";
        submitButton.style.display = 'none';
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }


    // Variables
    const quizContent = document.getElementById('quiz-container');
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const resultsOutput = document.getElementById('result-output');
    const submitButton = document.getElementById('submit');
    const resultContent = document.getElementById('results-container');
    // building quiz to render
    buildQuiz();

    // Pagination
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);
})();
