import React from "react";
import { Link, NavLink } from 'react-router-dom';
import UserContext from './UserContext'

const Header = () => {     
   
    return  (

        //Utilize Context API to pass signOut function
        <UserContext.Consumer>

            {/* Context must return a function */}
            { ({ signOut }) => (

                /* Conditionally render header depending on if username found */
                localStorage.getItem("username") ?(
                <div>
                    <div className="header">
                        <div className= "bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            <span>Welcome {localStorage.getItem("name")}!</span>
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
                                        to="/signin">
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