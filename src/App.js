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
// import Signup from "./pages/Singup";
// import AuthRoute from "./util/AuthRoute";
// import { logoutUser, getUserData } from "./redux/actions/userAction";
// import { SET_UNAUTHENTICATED } from "./redux/types";
// import axios from "axios";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { connect } from "react-redux";
import { SocketProvider } from "./contexts/SocketProvider";
import Room from "./pages/Room";
import Singup from "./pages/Singup";
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

function App({ userId, isAuthenticated }) {
  const [id, setId] = useState(null);
  useEffect(() => {
    console.log(userId);
    if (userId !== undefined) {
      setId(userId);
    }
  }, [userId]);
  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   console.log(window.location.pathname)

  //   // if (!isAuthenticated ) {
  //   //   if (window.location.pathname !== "/login"){
  //   //     window.location.href = "/login";
  //   //   }
        
  //   // }
  // }, [isAuthenticated]);

  return (
    // <Provider store={store}>
    <SocketProvider id={id}>
      <div className="app">
        <Router>
          <div className="app__container">
            <Switch>
              {/* <Route exact path="/login"> */}
              <Route exact path="/login">
                <Login />
              </Route>
              {/* </Route> */}
             
              <Route exact path="/">
                <Navbar />
                <Home />
              </Route>
              <Route exact path="/movies">
                <Navbar />
                <Movies />
              </Route>
              <Route exact path="/live">
                <Navbar />
                <LiveShow />
              </Route>
              <Route exact path="/search">
                <Navbar />
                <Search />
              </Route>
              <Route exact path="/explore">
                <Navbar />
                <Explore />
              </Route>
              <Route exact path="/movie/:id">
                <Navbar />
                <MovieReview />
              </Route>

              <Route exact path="/signup">
                <Navbar />
                <Singup />
              </Route>
              <Route exact path="/@:userName">
                <Navbar />
                <Profile />
              </Route>
              <Route exact path="/messages/inbox/">
                <Navbar />
                <Chat />
              </Route>
              <Route exact path="/messages/inbox/:roomId">
                <Navbar />
                <Chat />
              </Route>
            </Switch>
            <Route exact path="/live/room/:roomCode" component={Room} />
          </div>
        </Router>
      </div>
    </SocketProvider>
    // </Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.user._id,
    isAuthenticated: state.user.authenticated,
  };
};
export default connect(mapStateToProps)(App);
