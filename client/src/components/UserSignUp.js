import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. 


class UserSignUp extends Component {

    state = {

    }

    render() {
        
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form>
                        <div>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text" 
                                className="" 
                                placeholder="First Name" 
                                value=""
                            />
                        </div>
                        <div>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text" 
                                className="" 
                                placeholder="Last Name" 
                                value=""
                            />
                        </div>
                        <div>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                class="" 
                                placeholder="Email Address" 
                                value=""
                            />
                        </div>
                        <div>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                className="" 
                                placeholder="Password" 
                                value=""
                            />
                        </div>
                        <div>
                            <input 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                className="" 
                                placeholder="Confirm Password"
                                value=""
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

export default UserSignUp;