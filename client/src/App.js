import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import axios from 'axios';
import UserContext from './components/UserContext';


//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';


//Top-Level Component managing user log-in state
class App extends Component {

  //Initialize state  
  state = {

    //Authenticated user data
    authUserData: {},
    //Authentication state
    loggedIn: false,
    //User Password
    password: '',
    //Validation errors
    validationErrors: ''

  }

//Handle Signing in
handleSignIn(e, email, password){

    //Prevent default submission
    if(e){
      e.preventDefault();
    }

    //Make request 
    axios.get('http://localhost:5000/api/users',
    
      //Set Authorization header
      {
        auth: {
            username: email,
            password: password
        }
    
      }
    )
    //Upon response
    .then( res => {

      
      //check for response status success
      if (res.status === 200){

        //Grab reference to User Data
        const user = res.data;

        //Set User data and loggedIn status
        this.setState({
          authUserData: user,
          loggedIn: true,
          password: password,
          validationErrors: ''
        });

        //Redirect user upon login
        this.props.history.push("/courses");

      }
    })
    //Catch error
    .catch(err => {
      
      const error = err.response.data.message;

      this.setState({
        validationErrors: error
      })
      
    });
    
  }



//Handle Signing Out by setting authUserData back to empty object
handleSignOut(){
    this.setState({
      authUserData: {},
      loggedIn: false,
      password: ''
    });

}

render() {
return (

    //Provide Context
    <UserContext.Provider 
      value={{
        user: this.state.authUserData,
        password: this.state.password,
        signIn: this.handleSignIn.bind(this),
        signOut: this.handleSignOut.bind(this),
        loggedIn: this.state.loggedIn,
        validationErrors: this.state.validationErrors

        }}>
      <div className="App">
        <Header />
          <Switch>

            {/* root route redirects to /courses */}
            <Route exact path="/" render={ () => <Redirect to="/courses" /> } />

            {/* signing routes */}
            <Route path="/signin" render={ () => <UserSignIn/> }  />
            <Route path="/signout" render={ () => 
              <Redirect to="/signin"
              /> } 
            />
            <Route path="/signup" render={ () => <UserSignUp signIn={this.handleSignIn.bind(this)} /> } />

            {/* courses routes */} 
            <Route exact path="/courses" render={ () => <Courses /> } />
            <PrivateRoute exact path="/courses/create" component= {CreateCourse}   />
            <Route exact path="/courses/:id" render={ props => <CourseDetail {...props} /> } />
            <PrivateRoute exact path="/courses/:id/update" component= {UpdateCourse} />       
          </Switch>  
      </div>
    </UserContext.Provider>
    
  )};
}

export default withRouter(App);
