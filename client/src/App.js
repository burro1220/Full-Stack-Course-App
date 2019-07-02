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
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';



//Top-Level Component managing user log-in global state
class App extends Component {

  //Initialize state  
  state = {

    //Authenticated user data
    authUserData: {},
    //Validation errors
    validationErrors: '',
    //previous path
    prevPath: ''

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }}

//Handle Signing in
handleSignIn(e, email, password, props){

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

        const name = user.firstName + ' ' + user.lastName;
        
        //Persist User Data in Local Storage
        localStorage.setItem("id", user.id);
        localStorage.setItem("username", email);
        localStorage.setItem("password", password);
        localStorage.setItem("name", name);

        //Clear validation errors
        this.setState({
          validationErrors: ''
        });

        //Redirect user to previous page upon login
        const {history} = this.props;
        const path = this.State.prevPath ? this.State.prevPath.pathname : '/courses';
        history.push(path);

      }
    })
    //Catch error
    .catch(err => {
      
      //Handle request errors
      if(err.response.status === 400){
               
        const error = err.response.data.message;
        
        this.setState({
            validationErrors: error
        });
    
      } else if(err.response.status === 500){

        //Send unhandled server to /error
        this.props.history.push("/error");
    }
      
    });
    
  }



//Handle Signing Out by setting authUserData back to empty object
handleSignOut(){

    //Clear local storage
    localStorage.clear();

    //Reset validation errprs
    this.setState({
     validationErrors: ""
    });

    //Redirect to /courses
    this.props.history.push("/courses");



}

render() {
return (

    //Provide Context
    <UserContext.Provider 
      value={{
        signIn: this.handleSignIn.bind(this),
        signOut: this.handleSignOut.bind(this),
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
            <Route exact path="/courses/:id" render={ () => <CourseDetail /> } />
            <PrivateRoute exact path="/courses/:id/update" component= {UpdateCourse} /> 
            <Route path="/forbidden" component= {Forbidden} /> 
            <Route path="/error" component = {UnhandledError} />
            <Route path ="/notfound" component = {NotFound} />
            <Redirect to ="/notfound" />
          </Switch>  
      </div>
    </UserContext.Provider>
    
  )};
}

export default withRouter(App);
