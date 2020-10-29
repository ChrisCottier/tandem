import React, {useEffect, useState} from 'react'

import {randomizeOptions, findTotalCorrect} from '../data/utils'

const QuestionPage = (props) => {
    const {
        questions,
        currentIndex,
        correctAnswers,
        setCorrectAnswers,
        setCurrentIndex
    } = props;

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [currentTrivia, setCurrentTrivia] = useState(questions[currentIndex])
    const [options, setOptions] = useState([]);
    const [revealAnswer, setRevealAnswer] = useState([false, false]);

        
    //how many correct questions so far, correctAnswers will be an array of 
    //true/false (corresponding to right or wrong answers)
    const totalCorrect = findTotalCorrect(correctAnswers)

    //array with randomized order of options, updated at each trivia question
    useEffect(() => {
        setOptions(randomizeOptions(currentTrivia.incorrect, currentTrivia.correct));

    },[currentTrivia])

    //Functions to handle user input
    const changeSelection = (event) => {
        event.stopPropagation()
        const selected = event.currentTarget;
        const text = selected.getAttribute('data-text');
        setSelectedAnswer(text);
    }

    const submitAnswer = (event) => {
        event.stopPropagation();
        if (selectedAnswer === '') return;
        //First we will display whether the user got the answer correct
        const isCorrect = (selectedAnswer === currentTrivia.correct);
        setRevealAnswer([true, isCorrect])

        //After a timeout, the next question will be shown
        setTimeout(() => {
            setRevealAnswer([false, false]);
            setSelectedAnswer('');
            const newCorrectStatus = [...correctAnswers, isCorrect];
            setCorrectAnswers(newCorrectStatus);
            setCurrentIndex(currentIndex + 1);
            setCurrentTrivia(questions[currentIndex + 1]);
        }, 3000)

    }
    
    //

    //Component
    return (
        <main>
            {/* The header sub-component gives round information and the question */}
            <div id="trivia-header">
                <div>
                    <h2>Question Number</h2>
                    <span data-testid="question-number">{currentIndex + 1}</span>
                </div>

                <div>
                    {currentTrivia.question}
                </div>

                <div>
                    <h2>Total Correct</h2>
                    <span>{totalCorrect}</span>
                </div>

            </div>

            {/* If the answer has been submitted, the answer will be revealed, else
            the options will be displayed. */}

            {revealAnswer[0] ? (
                <div id="reveal-answer" data-testid="reveal-answer" className={revealAnswer[1] ? 'success-background' : 'fail-background'}>
                    <span>Correct Answer:</span>
                    <span data-testid='correct-answer'>{currentTrivia.correct}</span>
                </div>
            ) : <></>
            }

            <div id="trivia-options">
                {
                options.map((option, ind) => {
                    return (
                        <div 
                        className={`grid-square clickable ${option === selectedAnswer ? 'selected' : ''}`} 
                        key={ind}
                        data-testid={`option-${ind + 1}`}
                        data-text={option} 
                        onClick={changeSelection}>
                            <div className="option" >{option}</div>
                        </div>
                    )
                })
                }
            </div>


            <div id="trivia-output">
                <div id="output-text"><span>{selectedAnswer}</span></div>
                {!revealAnswer[0] ? <button data-testid='submit-button' className="clickable" onClick={submitAnswer}>Submit</button> : <></>}
            </div>
        </main>
    )
}

export default QuestionPage