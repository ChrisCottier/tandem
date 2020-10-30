import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Welcome from "./components/Welcome"
import Trivia from "./components/Trivia"
import data from './data/data'


//Three main views:
// 1. Welcome
// 2. Trivia / Question Page
// 3. Review 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/trivia">
          <Trivia data={data} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
