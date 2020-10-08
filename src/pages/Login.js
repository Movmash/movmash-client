import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";

function Login({ user, loginUser }) {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  //   useEffect(() => {
  //     const user = localStorage.getItem("user");
  //     if (user) {
  //       getUserData(user, history);
  //       //   history.push("/");
  //     }
  //   });

  const postData = () => {
    const userData = {
      email: email,
      password: password,
    };

    loginUser(userData, history);
  };

  return (
    <div>
      <div className="card auth-card input-field">
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
          onClick={() => postData()}
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
        >
          Login
        </button>
      </div>
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
