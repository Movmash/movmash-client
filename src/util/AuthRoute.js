import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function AuthRoute({ component: Component, authenticated, ...rest }) {
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);
