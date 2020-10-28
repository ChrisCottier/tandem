import React, {useEffect, useState} from 'react'

import {randomizeOptions} from '../data/utils'

const QuestionPage = (props) => {
    const {
        questions,
        currentQuestion,
        correctAnswers,
        setCorrectAnswers,
        setCurrentQuestion
    } = props;

    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [options, setOptions] = useState([])

    //find current question and destructure its keys
    const currentTrivia = questions[currentQuestion - 1];
    const {question, incorrect, correct } = currentTrivia;

    //how many correct questions so far, correctAnswers will be an array of 
    //true/false (corresponding to right or wrong answers)
    const totalCorrect = correctAnswers.reduce((acc, ele) => {
        if (ele) {
            return acc + 1
        }
        return acc;
    }, 0)

    //array with randomized order of options
    useEffect(() => {
        if (options.length > 0) return;
        setOptions(randomizeOptions(incorrect, correct));

    })

    //Functions to handle user input
    const changeSelection = (event) => {
        event.stopPropagation()
        const selected = event.currentTarget;
        const text = selected.getAttribute('data-text');
        setSelectedAnswer(text);
    }
    

    //Component
    return (
        <main>
            {/* The header sub-component gives round information and the question */}
            <div id="trivia-header">
                <div>
                    <h2>Question Number</h2>
                    <span>{currentQuestion}</span>
                </div>

                <div>
                    {question}
                </div>

                <div>
                    <h2>Total Correct</h2>
                    <span>{totalCorrect}</span>
                </div>

            </div>

            <div id="trivia-options">
                {options.map((option, ind) => {
                    return (
                        <div 
                        className={`grid-square ${option === selectedAnswer ? 'selected' : ''}`} 
                        key={ind} 
                        data-text={option} 
                        onClick={changeSelection}>
                            <div className="option" >{option}</div>
                        </div>
                    )
                })}
            </div>


            <div id="trivia-output">
                <div>{selectedAnswer}</div>
                <button>Submit</button>
            </div>
        </main>
    )
}

export default QuestionPage