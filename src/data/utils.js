export const chooseQuestions = (numQuestions, questions) => {
    const selectedQuestions = [];
    let n = 0;
    while (n < numQuestions) {
        const randomInd = Math.floor((Math.random() * questions.length));
        selectedQuestions.push(questions[randomInd])
        questions.splice(randomInd, 1);
        n++
    }
    return selectedQuestions
} 

export const randomizeOptions = (otherAnswers, correct) => {
    const randomInd = Math.floor(3 * Math.random());
    const copy = [...otherAnswers]
    copy.splice(randomInd, 0, correct);
    return copy;
}

export const findTotalCorrect = (arr) => {
    return arr.reduce((acc, ele) => {
        if (ele) {
            return acc + 1
        }
        return acc;
    }, 0)
}