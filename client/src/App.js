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


//Top-Level Component managing user log-in state
class App extends Component {

  //Initialize state  
  state = {

    //Authenticated user data
    authUserData: {},
    //Authentication state
    loggedIn: false

  }

  //Handle Signing in
  handleSignIn(e, email, password, err){

    //Prevent default request
    if(!email || !password) {
      e.preventDefault();
    }
    console.log(`email: ${email} password: ${password}`);
    //Make request 
    axios.get('http://localhost:5000/api/users',
    
      //Set Authorization heaeder
      {
        headers: {
          auth: {
            username: email,
            password: password
          }
        }
      }
    )
    //Upon response
    .then( response => {
      console.log(response)
      //check for response status success
      if (response.status === 200){

        
      }
    })
    //Catch error
    .catch(err);
    console.log(err);
  }

  //Handle Signing Out by setting authUserData back to empty object
  handleSignOut(){
    this.setState({
      authUserData: {},
      loggedIn: false
    })
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
            <Route path="/courses/:id/update" render={ props => <UpdateCourse /> } />
            <Route path="/signin" render={ props => 
              <UserSignIn 
                handleSignIn = {this.handleSignIn.bind(this)}
              /> } 
            />
            <Route path="/signup" render={ props => <UserSignUp /> } />
            <Route path="/signout" render={ props => <UserSignOut /> } />
            

          </Switch>
      </div>
    </BrowserRouter>
    
  )};
}

export default App;
