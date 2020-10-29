import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Welcome from "./components/Welcome"
import Trivia from "./components/Trivia"


//Three main views:
// 1. Welcome
// 2. Trivia / Question Page
// 3. Review 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/trivia" component={Trivia} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
