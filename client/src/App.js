import React, { Component } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import axios from 'axios';


//import components
import Header from './components/Header';
import Courses from './components/Courses';





class App extends Component {

  state = {

  }

  render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/courses" /> } />
            <Route exact path="/courses" render={ () => <Courses /> } />
          </Switch>
      </div>
    </BrowserRouter>
  )};
}

export default App;
