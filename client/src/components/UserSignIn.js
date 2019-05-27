import React, { Component } from "react";
import { Link } from "react-router-dom";


//This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. 






class UserSignIn extends Component {

    //Component State manages current user data
    state = {

        //Grab Reference to Credentials
        emailAddress: '',
        password: ''
    };

    render(){
        return(
     
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" className="" placeholder="Password" value="" />
                            </div>
                            <div class="grid-100 pad-bottom">

                                {/* The component renders a "Sign In" button that when clicked signs in the user */}
                                <button className="button" type="submit">Sign In</button>
                                
                                {/* The component renders a "Cancel" button that returns the user to the default route (i.e. the list of courses) */}
                                <Link className="button button-secondary" to='/'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
     )}
}

export default UserSignIn;