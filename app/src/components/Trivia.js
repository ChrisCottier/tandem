import React, {useEffect, useState} from 'react'

import QuestionPage from './QuestionPage'
import data from '../data/data'
import {chooseQuestions} from '../data/utils'


const Trivia = () => {
    
    //The questions state will store 10 questions in this round of trivia
    const [questions, setQuestions] = useState([]);

    //correctAnswer stores whether the user got the question at that index correct
    const [correctAnswers, setCorrectAnswers] = useState([]);

    //currentQuestion keeps track of the question progression
    const [currentQuestion, setCurrentQuestion] = useState(1);

    //populate questions by choosing 10 randomly on component load.
    useState(() => {
        if (questions.length !== 0) return;
        setQuestions(chooseQuestions(10, data));
    })


    if (currentQuestion < 11) {
        return (
            <QuestionPage 
            // Each state is needed to display the quiz page for every question.
            // after the response to each question, correct answers and current page are updated
            questions={questions}
            currentQuestion={currentQuestion}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setCurrentPage={setCurrentQuestion}
            ></QuestionPage>
        )
    } else {
        return(<></>)
    }
}

export default Trivia