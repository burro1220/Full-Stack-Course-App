import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, ...rest }) {
    
    //Use local storage to check if username and only direct user to route if logged in, otherwise redirect to /signin
    return (
            <Route
                {...rest}
                render={props =>
                    (localStorage.getItem("username")) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                />
          )
        }
      />
      
    );
  }

  export default PrivateRoute;