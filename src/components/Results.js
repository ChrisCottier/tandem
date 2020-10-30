import React from 'react';
import {NavLink} from 'react-router-dom';

import {findTotalCorrect} from '../data/utils'

const Results = (props) => {
    const {questions, correctAnswers} = props;

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
                        <div className={`review-question ${correct ? 'success' : 'fail'}`} data-testid='review-question' key={ind}>
                            <div>
                                <i className={correct ? 'fas fa-check fa-3x success' : 'fas fa-times fa-3x fail'}></i>
                                <span>{`${ind + 1}. ${question.question}`}</span></div>
                            <span>
                                {`Correct answer: ${question.correct}`}
                            </span>
                        </div>
                    )
                })}
            </div>
            <div id="results-options">
                <NavLink to='/'><button>Play Again!</button></NavLink>
            </div>

        </main>
    )
}

export default Results