import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./LoginPage.css";

function LoginPage() {
  const [error, setError] = React.useState(false);
  const [badUorP, setBadUorP] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    var requestData = { username: username, password: password };
    axios
      .post("/api/auth", requestData)
      .then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("token", res.data.token);
          history.push("/home");
        } else {
          setBadUorP(true);
          setShow(true);
        }
      })
      .catch((error) => {
        setError(true);
        setShow(true);
      });
  };

  return (
    <div>
      <div className='container' id='loginForm'>
        <div className='card border-success mt-5' id='loginFormCard'>
          <h1 id='loginHeader' className='card-header'>
            Login
          </h1>
          <div className='card-body' id='loginFormBody'>
            <div className='form-group'>
              <form id='target' onSubmit={login}>
                <input
                  className='form-control'
                  type='email'
                  id='username'
                  placeholder='Email'
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className='form-control'
                  type='password'
                  id='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className='btn mt-3'
                  type='submit'
                  value='Login'
                  id='loginBtn'
                />
              </form>

              <h3 className='card-header' id='noAcc'>
                Don't have an account?{" "}
                <Link to='/create'> Create an account </Link>{" "}
              </h3>
            </div>
          </div>
        </div>
        {badUorP === true && show === true ? (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oops! Wrong Username or Password</Alert.Heading>
            <p>
              Looks like you entered the incorrect username or password. Try
              again.
            </p>
          </Alert>
        ) : error === true && show === true ? (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap!</Alert.Heading>
            <p>
              Looks like there was a server error. Try logging in after a couple
              minutes
            </p>
          </Alert>
        ) : (
          <p hidden> no errors </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
