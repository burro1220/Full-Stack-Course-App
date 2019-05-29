import React from "react";
import { Link, NavLink } from 'react-router-dom';
import UserContext from './UserContext'

const Header = () => {  
    
   
    return  (

        //Utilize Context API to pass User Data
        <UserContext.Consumer>

            {/* Context must return a function */}
            { ({ user, signOut, loggedIn }) => (

                /* Conditionally render header depending on loggedIn state */
                loggedIn ?(
                <div>
                    <div className="header">
                        <div className= "bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            <span>Welcome {user.firstName} {user.lastName}!</span>
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
                ))}
        </UserContext.Consumer> 
    )
    
    
}

export default Header;