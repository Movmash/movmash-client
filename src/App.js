import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import LiveShow from "./pages/LiveShow";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import MovieReview from "./pages/MovieReview";
function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="app__container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/live" component={LiveShow} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/movie/:id" component={MovieReview} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
