import React from "react";
import { Link, NavLink } from 'react-router-dom';

const Header = props => {

    //Grab reference to state of login
    const { loggedIn, signOut } = props;
    const { firstName, lastName } = props.authUserData;
    

    return loggedIn ? (
        <div>
            <div className="header">
                <div className= "bounds">
                <h1 className="header--logo">Courses</h1>
                  <nav>
                    <span>Welcome {firstName} {lastName}!</span>
                    <Link 
                        className="signout" 
                        to="/signout"
                        onClick= {signOut}>
                        Sign Out
                    </Link>
                  </nav>  
                </div>
            </div>
            <hr />
        </div>
    ) : (
        <div>
            <div className="header">
                <div className= "bounds">
                <h1 className="header--logo">Courses</h1>
                    <nav>
                        <NavLink 
                            className="signup" 
                            to="/signup">
                            Sign Up
                        </NavLink>
                        <NavLink 
                            className="signin" 
                            to="signin">
                            Sign In
                        </NavLink>
                    </nav>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Header;