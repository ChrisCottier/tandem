# Multiple Choice Trivia Application

## About

This project was created using the Create React App Bootstrap for Tandem's Software Engineer Apprentice Challenge. The goal of this
application is to allow users to engage in a round of trivia (10 questions), with feedback along the way and after the round is finished.
From a pool of 20 questions, 10 are chosen in random order, guaranteeing a different experience each round.

React seemed like a natural choice for this kind of application for two primary reasons:
[-] The quiz pages will likely be identical except for input, so writing component that can take similar inputs and display them
in an identical fashion seemed like a useful and flexible tact.
[-] React Hooks, in this case useState and useEffect, supply the state management necessary to progress through and display results of a trivia
quiz.

## Installing and Launching

1. Clone this repository: `git clone https://github.com/ChrisCottier/tandem.git`, or download and extract.
2. Navigate to the project root folder in your terminal.
3. Run `npm install` to install react and other dependencies.
4. Run `npm start` to start the application
5. The application may open in your default browser, if not, navigate to http://localhost:3000.
6. Instructions on how to play are visible on the welcome page. Enjoy!

## Testing

1. After installing react and the other application dependencies, a series of unit test can be ran using the command `npm test`.

## Features

### Multi-page Quiz

The primary feature of this application is the multi-page quiz. Using a state managing "Trivia" component, "QuestionPage" components are selectively rendered based on the currentIndex state (index corresponds to question number - 1).

```javascript
if (currentIndex < 10) {
  return (
    <QuestionPage
      // Each state is needed to display the quiz page for every question.
      // after the response to each question, correct answers and current page are updated
      questions={questions}
      currentIndex={currentIndex}
      correctAnswers={correctAnswers}
      setCorrectAnswers={setCorrectAnswers}
      setCurrentIndex={setCurrentIndex}
    />
  );
} else {
  return <Results questions={questions} correctAnswers={correctAnswers} />;
}
```

The QuestionPage component is reactive to user input based on its own state management. It allows users to change their selection before submitting, and will supply immediate right/wrong feedback. The two functions that handle user input events can be seen below.

```javascript
//Functions to handle user input
const changeSelection = (event) => {
  event.stopPropagation();

  //if the answer is already revealed, changing selections is disallowed
  if (revealAnswer[0]) return;

  const selected = event.currentTarget;
  const text = selected.getAttribute("data-text");
  setSelectedAnswer(text);
};

const submitAnswer = (event) => {
  event.stopPropagation();
  if (selectedAnswer === "") return;

  //First we will display whether the user got the answer correct
  const isCorrect = selectedAnswer === currentTrivia.correct;
  setRevealAnswer([true, isCorrect]);

  //After a timeout, the states will be reset, and the next question will be shown.
  setTimeout(() => {
    setRevealAnswer([false, false]);
    setSelectedAnswer("");
    const newCorrectStatus = [...correctAnswers, isCorrect];
    setCorrectAnswers(newCorrectStatus);
    setCurrentIndex(currentIndex + 1);
    setCurrentTrivia(questions[currentIndex + 1]);
  }, 3000);
};
```

### Quiz Review

After finishing the quiz, users can see again their total score and which questions they got right or wrong. The "Results" component is rendered after all the questions are finished, displaying right and wrong ansers with selected CSS formatting.

```javascript
const Results = (props) => {
  const { questions, correctAnswers } = props;

  const totalCorrect = findTotalCorrect(correctAnswers);
  return (
    <main>
      <div id="results-header">
        {`You got ${totalCorrect} out of 10 questions correct! Woooooo`}
      </div>
      <div id="results-review">
        {questions.map((question, ind) => {
          const correct = correctAnswers[ind];
          return (
            <div className={`review-question ${correct ? "success" : "fail"}`}>
              <div>
                <i
                  className={
                    correct
                      ? "fas fa-check fa-3x success"
                      : "fas fa-times fa-3x fail"
                  }
                ></i>
                <span>{`${ind + 1}. ${question.question}`}</span>
              </div>
              <span>{`Correct answer: ${question.correct}`}</span>
            </div>
          );
        })}
      </div>
      <div id="results-options">
        <NavLink to="/">
          <button>Play Again!</button>
        </NavLink>
      </div>
    </main>
  );
};
```
