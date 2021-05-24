import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
// import { BounceLoader } from "react-spinners";
import "./stylesheets/Login.css"
// import coverPoster from "../images/login_cover_pic_1.jpg";
// import coverPoster from "../images/login_cover_pic_2.jpg";
// import coverPoster from "../images/login_cover_pic_3.jpg";
// import coverPoster from "../images/login_cover_pic_4.jpg";
import coverPoster from "../images/login_cover_pic_5.jpg";
// import coverPoster from "../images/login_cover_pic_6.jpg";
// import coverPoster from "../images/login_cover_pic_7.jpg";
import MovmashLogo from "../images/Movmash_logo.png";
function Login({ user, loginUser }) {
  const history = useHistory();

    useEffect(() => {
      document.body.style.overflowY="hidden";
      if (user.authenticated) {
        history.push("/");
      }
    }, [user.authenticated, history]);

  return (
    <div>
      {/* {user.authLoading ? (
        <div className="home__bounceloader">
          <BounceLoader size={150} color={"#2aa44f"} loading />
        </div>
      ) : ( */}
        <div className="login">
          <div className="login__left">
            <img src={coverPoster} alt={coverPoster} />
            <div className="login_left__content">
              {/* <img src={MovmashLogo} alt="logo" /> */}
              <div className="login__left__content__nav">
                {/* <h2>MOVMASH</h2> */}
                {/* <img src={MovmashLogo} alt="logo" /> */}
              </div>
              <div className="login-box">
                <img src={MovmashLogo} alt="logo" />
                <h2>Log in to your account</h2>
                <a
                  href="http://localhost:8000/auth/facebook"
                  className="social-button"
                  id="facebook-connect"
                >
                  <span>Login with Facebook</span>
                </a>
                <a
                  href="http://localhost:8000/auth/google"
                  className="social-button"
                  id="google-connect"
                >
                  <span>Login with Google</span>
                </a>
              </div>
            </div>
          </div>
          <div className="login__right">
            <img src={coverPoster} alt="login_pic" />
          </div>
        </div>
      {/* )} */}
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
