import React, { useEffect, useState } from "react";
import "./App.css";
// import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import LiveShow from "./pages/LiveShow";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import MovieReview from "./pages/MovieReview";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import AuthRoute from "./util/AuthRoute";
// import { logoutUser, getUserData } from "./redux/actions/userAction";
// import { SET_UNAUTHENTICATED } from "./redux/types";
import axios from "axios";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { connect } from "react-redux";
import { SocketProvider } from "./contexts/SocketProvider";
// const token = localStorage.mashDBToken;
// // console.log(token);
// if (token) {
//   console.log(token);
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     store.dispatch(logoutUser());
//     window.location.href = "/login";
//   } else {
//     store.dispatch({ type: SET_UNAUTHENTICATED });
//     axios.defaults.headers.common["Authorization"] = token;
//     store.dispatch(getUserData());

//     // window.location.href = "/";
//   }
// }

function App({ userId }) {
  const [id, setId] = useState(null);
  useEffect(() => {
    console.log(userId);
    if (userId !== undefined) {
      setId(userId);
    }
  }, [userId]);
  return (
    // <Provider store={store}>

    <div className="app">
      <Router>
        <Navbar />
        <div className="app__container">
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <SocketProvider id={id}>
              <Route exact path="/" component={Home} />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/live" component={LiveShow} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/movie/:id" component={MovieReview} />

              <Route exact path="/signup" component={Signup} />
              <Route exact path="/@:userName" component={Profile} />
              <Route exact path="/messages/inbox/">
                <Chat />
              </Route>
              <Route exact path="/messages/inbox/:roomId">
                <Chat />
              </Route>
            </SocketProvider>
          </Switch>
        </div>
      </Router>
    </div>
    // </Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.user._id,
  };
};
export default connect(mapStateToProps)(App);
