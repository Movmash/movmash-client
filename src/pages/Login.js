import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
function Login({ user, loginUser }) {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

    useEffect(() => {
      // const user = localStorage.getItem("user");
      // if (user) {
      //   getUserData(user, history);
      //   //   history.push("/");
      // }
      if (user.authenticated ) {
        history.push("/");
      }
    }, [user.authenticated, history]);

  // const postData = () => {
  //   const userData = {
  //     email: email,
  //     password: password,
  //   };

  //   loginUser(userData, history);
  // };

  return (
    <div>
      {user.authLoading?<div className="home__bounceloader">
        <BounceLoader size={150} color={"#2aa44f"} loading />
      </div> :  <div className="card auth-card input-field">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <button
          // onClick={() => postData()}
          // onClick={() => (location.href = "http://localhost:8000/auth/google")}
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
        >
          <a href="http://localhost:8000/auth/google">Login</a>
        </button>
      </div>
    }
      
     </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
