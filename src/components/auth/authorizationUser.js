import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteUser = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  var ls = sessionStorage.getItem("wm.auth");

  var responseData = JSON.parse(ls);
  // ls && responseData.token

  return (
    <Route
      {...rest}
      render={(props) =>
        ls && ls.length > 0 && responseData.displayName && responseData.role === "User" ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRouteUser;
