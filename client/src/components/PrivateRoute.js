import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <UserContext.Consumer>
            {({ loggedIn }) => (
                <Route
                {...rest}
                render={props =>
                    loggedIn ? (
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
            )}
        </UserContext.Consumer>
      
    );
  }

  export default PrivateRoute;