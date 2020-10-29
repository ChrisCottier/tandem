import React from 'react'
import {NavLink} from 'react-router-dom'

const Welcome = () => {
    return (
        <main>
            <div id="welcome-container">
                <h1 className="centered">Welcome to Chris' Trivia Challenge!</h1>
                <div id="instrucitons-header">
                    Instructions
                </div>
                <ul>
                    <li>
                        Press Begin to start the round of trivia! A round has
                        10 randomly selected questions.
                    </li>
                    <li>
                        Select an answer to the prompted question by clicking 
                        it's square.
                    </li>
                    <li>
                        When you have decided on your selection, click submit
                        to continue.
                    </li>
                    <li>
                        After the 10 questions, you can review which questions
                        you got right or wrong. Have fun!
                    </li>
                </ul>
                <NavLink className="centered" to="trivia" data-testid='begin-link'>
                    <button id='begin-button' data-testid='begin-button' className="clickable">Begin</button>
                </NavLink>
            </div>
        </main>
    )
}

export default Welcome