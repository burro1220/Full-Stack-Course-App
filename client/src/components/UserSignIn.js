import React, { Component } from "react";
import { Link } from "react-router-dom";


//This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. 
class UserSignIn extends Component {

    //Component State manages form changes
    state = {

        //initialize state to empty string
        emailAddress: '',
        password: ''
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


    render(){
        return(
     
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>

                        {/* On submit, pass input values and event into handleSignIn, available through props */}
                        <form onSubmit= { e => this.props.handleSignIn(e, this.state.emailAddress, this.state.password)}>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text"
                                    onChange = {this.handleInputChange} 
                                    className="" 
                                    placeholder="Email Address"                                          
                                />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    onChange = {this.handleInputChange} 
                                    className="" 
                                    placeholder="Password" 
                                />
                            </div>
                            <div class="grid-100 pad-bottom">

                                {/* The component renders a "Sign In" button that when clicked signs in the user */}
                                <button 
                                    className="button" 
                                    type="submit">
                                    Sign In
                                </button>
                                
                                {/* The component renders a "Cancel" button that returns the user to the default route (i.e. the list of courses) */}
                                <Link 
                                    className="button button-secondary" 
                                    to='/'>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? 
                        <Link to="/signup">
                            Click here
                        </Link>
                        to sign up!
                    </p>
                </div>
            </div>
     )}
}

export default UserSignIn;