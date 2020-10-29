import React, {useEffect, useState} from 'react'

import {randomizeOptions} from '../data/utils'

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
    const [options, setOptions] = useState([])

        
    //how many correct questions so far, correctAnswers will be an array of 
    //true/false (corresponding to right or wrong answers)
    const totalCorrect = correctAnswers.reduce((acc, ele) => {
        if (ele) {
            return acc + 1
        }
        return acc;
    }, 0)

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
        setSelectedAnswer('');
        const isCorrect = (selectedAnswer === currentTrivia.correct);
        const newCorrectStatus = [...correctAnswers, isCorrect];
        setCorrectAnswers(newCorrectStatus);
        setCurrentTrivia(questions[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);

    }
    

    //Component
    return (
        <main>
            {/* The header sub-component gives round information and the question */}
            <div id="trivia-header">
                <div>
                    <h2>Question Number</h2>
                    <span>{currentIndex + 1}</span>
                </div>

                <div>
                    {currentTrivia.question}
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
                <div id="output-text"><span>{selectedAnswer}</span></div>
                <button onClick={submitAnswer}>Submit</button>
            </div>
        </main>
    )
}

export default QuestionPage