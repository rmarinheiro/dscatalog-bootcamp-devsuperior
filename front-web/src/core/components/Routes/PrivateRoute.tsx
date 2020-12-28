import React from 'react';
import { Route, Redirect } from 'react-router';
import {  isAuthenticate, isAllowByRole, Role } from 'core/utils/auth';

type Props = {
    children : React.ReactNode;
    path:string;
    allowRoutes?: Role[];
}
 const PrivateRoute = ({children,path,allowRoutes }:Props) => {
     
//    const isAuthenticated = true;

    //"authData" no localStorage
     //access_token não pode estar expirado
    return (
      <Route
        path={path}
        render={({ location }) => {
            if(!isAuthenticate()){ 
              return (
              <Redirect
                  to={{
                pathname: "/admin/auth/login",
                state: { from: location }
              }}
            />
            )
          } else if( isAuthenticate() && !isAllowByRole(allowRoutes)){
            return (
              <Redirect to={{pathname: "/admin"}}/>
            )
          }
          return children;
        }}
      />
    );
  }

  export default PrivateRoute;