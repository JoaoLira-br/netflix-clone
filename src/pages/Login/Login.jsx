import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signUp } from "../../firebase";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user_auth = async (event) => {
    event.preventDefault();

    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signUp(name, email, password);
    }
  };

  const handleSignState = () => {
    if (signState === "Sign In") {
      setSignState("Sign Up");
    } else {
      setSignState("Sign In");
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix? <span onClick={handleSignState}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={handleSignState}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
