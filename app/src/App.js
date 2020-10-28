import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Welcome from "./components/Welcome"
import Trivia from "./components/Trivia"
import Results from "./components/Results"


//Three main components:
// 1. Welcome / Begin
// 2. Trivia
// 3. Review / Play Again 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/trivia" component={Trivia} />
        <Route path="/results" component={Results} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
