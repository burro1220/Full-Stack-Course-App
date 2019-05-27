import React, { Component } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import axios from 'axios';


//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';





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
            <Route exact path="/courses/:id" render={ props => <CourseDetail {...props} /> } />
            <Route path="/courses/create" render={ props => <CreateCourse /> } />
            <Route path="/courses/:id/update" render={ props => <UpdateCourse {...props} /> } />
            <Route path="/signin" render={ props => <UserSignIn /> } />
            <Route path="/signup" render={ props => <UserSignUp /> } />
            <Route path="/signout" render={ props => <UserSignOut /> } />
            

          </Switch>
      </div>
    </BrowserRouter>
  )};
}

export default App;
