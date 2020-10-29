import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import App from '../App'

test('Welcome screen displays welcome message and link', () => {
  //Arrange
  render(<App />);
  const header = screen.getByText(`Welcome to Chris' Trivia Challenge!`)
  const beginLink = screen.getByTestId('begin-link')

  //Act

  //Assert
  expect(header).toBeInTheDocument()
  expect(beginLink).toHaveAttribute('href', '/trivia')

  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});


test('Begin takes the application to the first question', async () => {
  //Arrange
  render(<App />);
  const beginButton = screen.getByTestId('begin-button');

  //Act
  fireEvent.click(beginButton);
  await screen.findByText('Question Number');
  //Assert
  expect(screen.getByTestId('question-number')).toHaveTextContent('1');

});

test('User can change selections.', () => {
  // //Arrange
  render(<App />);

  //Act
  const option1 = screen.getByTestId('option-1');
  const option2 = screen.getByTestId('option-2')
  fireEvent.click(option1);
  fireEvent.click(option2);

  //Assert
  expect(option1).not.toHaveAttribute('class', 'grid-square clickable selected');
  expect(option2).toHaveAttribute('class', 'grid-square clickable selected');

});

test('User is shown correct answer. User can not re-submit answer.', async () => {
  // //Arrange
  render(<App />);
  

  //Act
  const option1 = screen.getByTestId('option-1');
  fireEvent.click(option1);

  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);
  await screen.findByTestId('reveal-answer');
  
  //Assert
  expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
  expect(submitButton).not.toBeInTheDocument();

});

// test('User progresses to next question after submission.', async () => {
//   // //Arrange
//   render(<App />);
//   const firstPageNum = Number.parseInt(screen.getByTestId('question-number').innerText);
  

//   //Act
//   const option1 = screen.getByTestId('option-1');
//   fireEvent.click(option1);

//   const submitButton = screen.getByTestId('submit-button');
//   fireEvent.click(submitButton);
//   setTimeout(()=>{},3000)
//   await screen.findByTestId('submit-button');
//   const secondPageNum = Number.parseInt(screen.getByTestId('question-number').innerText);
  
//   //Assert
//   expect(secondPageNum === firstPageNum + 1)

// });
