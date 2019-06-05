import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';



//This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. 


class UserSignUp extends Component {

    //Component State manages form changes
    state = {

        //initialize state to empty string
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    };

    //Handle changes to user input
    handleInputChange = e => {
        
        //Grab reference to current input field
        const inputField = e.target;

        //Set state using input's name reference and field value
        this.setState({
            [inputField.name]: inputField.value
        });
    };


    //Handle Signing Up
    handleSignUp(e){

        //Prevent default submission
        e.preventDefault();

        //Destructure
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        //Check if passwords match
        if( password !== confirmPassword ) {

            //Handle passwords don't match error
            console.log('Passwords do not match');
            
            

        } else {

            //If Passwords match
            //Make request 
            axios.post('http://localhost:5000/api/users', { firstName, lastName, emailAddress, password })
                
            //Upon response
                .then( res => {
                    console.log(res)
                
                //check for response status success
                if (res.status === 201){

                    console.log(`User ${firstName} ${lastName} successfully created`);
                    this.props.signIn(e, emailAddress, password);

                    
            
            
                }
            })
            //Catch error
            .catch(err => {
                console.log(err)
            });
            
        }
    
        
  }

    render() {

        const { firstName, lastName, emailAddress, password } = this.state;
        
        return(
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                        <div>
                            {/* On submit, pass input values and event into handleSignIn, available through props */}
                            <form onSubmit={e => this.handleSignUp(e, firstName, lastName, emailAddress, password )}>
                                <div>
                                    <input 
                                        id="firstName" 
                                        name="firstName" 
                                        type="text" 
                                        className="" 
                                        placeholder="First Name" 
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="lastName" 
                                        name="lastName" 
                                        type="text" 
                                        className="" 
                                        placeholder="Last Name" 
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress" 
                                        type="text" 
                                        className="" 
                                        placeholder="Email Address" 
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        className="" 
                                        placeholder="Password" 
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="password" 
                                        className="" 
                                        placeholder="Confirm Password"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="grid-100 pad-bottom">
                                    
                                    {/* The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. */} 
                                    <button 
                                        className="button" 
                                        type="submit">
                                        Sign Up
                                    </button>

                                    {/* This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses). */}
                                    <button 
                                        className="button button-secondary" 
                                        to='/'>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>
                            Already have a user account?
                                <Link to="/signin">
                                    Click here
                                </Link> 
                            to sign in!
                        </p>
                    </div>
                </div>
            
        )
    }
}

export default withRouter(UserSignUp);