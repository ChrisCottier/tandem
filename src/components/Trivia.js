import React, {useState} from 'react'

import QuestionPage from './QuestionPage'
import Results from './Results'
import data from '../data/data'
import {chooseQuestions} from '../data/utils'


const Trivia = () => {
    
    //The questions state will store 10 questions in this round of trivia
    const [questions, setQuestions] = useState([]);

    //correctAnswer stores whether the user got the question at that index correct
    const [correctAnswers, setCorrectAnswers] = useState([]);

    //currentQuestion keeps track of the question progression
    const [currentIndex, setCurrentIndex] = useState(0);

    //populate questions by choosing 10 randomly on component load.
    useState(() => {
        if (questions.length !== 0) return;
        setQuestions(chooseQuestions(10, data));
    })


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
        )
    } else {
        return(
            <Results
            questions={questions}
            correctAnswers={correctAnswers}
            />
        )
    }
}

export default Trivia