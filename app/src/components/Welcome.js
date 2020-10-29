import React from 'react'
import {NavLink} from 'react-router-dom'

const Welcome = () => {
    return (
        <main>
            <div id="welcome-container">
                <h1>Welcome to Chris' Trivia challenge!</h1>
                <div>
                    Instructions
                </div>
                <ul>
                    <li>Don't be a moron</li>
                </ul>
                <NavLink to="trivia">
                    <button>Begin</button>
                </NavLink>
            </div>
        </main>
    )
}

export default Welcome