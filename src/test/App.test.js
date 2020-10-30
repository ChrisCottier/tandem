import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import {BrowserRouter} from 'react-router-dom'

import App from '../App'
import Trivia from '../components/Trivia'
import Results from '../components/Results'
import {chooseQuestions, findTotalCorrect, dataForTests} from '../data/utils'
import { act } from 'react-dom/test-utils';

test('Welcome screen displays welcome message and link', () => {
  //Arrange
  const app = render(<App />);
  const header = screen.getByText(`Welcome to Chris' Trivia Challenge!`)
  const beginLink = screen.getByTestId('begin-link')

  //Act

  //Assert
  expect(header).toBeInTheDocument()
  expect(beginLink).toHaveAttribute('href', '/trivia')

  app.unmount();
});


test('Begin takes the application to the first question', async () => {
  //Arrange
  const app = render(<App />);
  const beginButton = screen.getByTestId('begin-button');

  //Act
  fireEvent.click(beginButton);
  await screen.findByText('Question Number');
  //Assert
  expect(screen.getByTestId('question-number')).toHaveTextContent('1');

  app.unmount();
});

test('User can change selections.', () => {
  // //Arrange
  const data = dataForTests();
  const trivia = render(<Trivia data={data} />);

  //Act
  const option1 = screen.getByTestId('option-1');
  const option2 = screen.getByTestId('option-2')
  fireEvent.click(option1);
  fireEvent.click(option2);

  //Assert
  expect(option1).not.toHaveAttribute('class', 'grid-square clickable selected');
  expect(option2).toHaveAttribute('class', 'grid-square clickable selected');
  trivia.unmount();
});

test('User is shown correct answer. User can not re-submit answer.', async () => {
  // //Arrange
  const data = dataForTests();
  const trivia = render(<Trivia data={data} />);
  

  //Act
  const option1 = screen.getByTestId('option-1');
  fireEvent.click(option1);

  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);
  await screen.findByTestId('reveal-answer');
  
  //Assert
  expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
  expect(submitButton).not.toBeInTheDocument();

  trivia.unmount();
});

test('User progresses to next question after submission.', async () => {

  //Arrange
  const data = dataForTests();
  const trivia = render(<Trivia data={data} />);
  const firstPageNum = Number.parseInt(screen.getByTestId('question-number').innerHTML);
  

  //Act
  const option1 = screen.getByTestId('option-1');
  fireEvent.click(option1);

  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);
  await waitFor(async ()=> { await screen.findByTestId('submit-button')}, {timeout: 3300, });
  
  const secondPageNum = Number.parseInt(screen.getByTestId('question-number').innerHTML);
  
  //Assert
  expect(secondPageNum === firstPageNum + 1).toBeTruthy()
  trivia.unmount();
});

test('Review displays the 10 questions with proper right/wrong formatting.', async () => {
  
  //Arrange
  const data = dataForTests();
  const questions = chooseQuestions(10, data);
  const correctAnswers = [true, false, true, false, false, true, true, false, false, false]
  const totalCorrect = findTotalCorrect(correctAnswers);
  const results = render(<BrowserRouter><Results questions={questions} correctAnswers={correctAnswers}/></BrowserRouter>);
  
  const reviewed = await screen.findAllByTestId('review-question');
  const numWithCorrectClass = reviewed.reduce((acc,node) => {
    const nodeHasCorrectClass = node.classList.contains('success');
    
    if (nodeHasCorrectClass) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0)

  //Act
  
  //Assert
  expect(reviewed.length === 10).toBeTruthy();
  expect(numWithCorrectClass === totalCorrect).toBeTruthy();


  results.unmount();
});
