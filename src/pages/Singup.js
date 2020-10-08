import React from "react";

function Singup() {
  return (
    <div>
      <div className="card auth-card input-field">
        <input
          type="text"
          placeholder="email"
          //   value={name}
          //   onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          //   value={password}
          //   onChange={(e) => setPasword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          //   onClick={() => PostData()}
        >
          SignUP
        </button>
      </div>
    </div>
  );
}

export default Singup;
