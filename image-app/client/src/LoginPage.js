import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./LoginPage.css";

function LoginPage() {
  const [error, setError] = React.useState(false);
  const [badUorP, setBadUorP] = React.useState(false);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    function login(username, password) {
      var requestData = { username: username, password: password };
      axios
        .post("/api/auth", requestData)
        .then((res) => {
          if (res.data.token) {
            // Store token in local storage
            window.localStorage.setItem("token", res.data.token);
            window.location.href = "http://localhost:3000/#/home";
          } else {
            setError(true);
            setShow(true);
          }
        })
        .catch((error) => {
          setBadUorP(true);
          setShow(true);
        });
    }

    $("#target").submit(function (e) {
      login($("#username").val(), $("#password").val());
      e.preventDefault();
    });
  }, []);

  return (
    <div>
      <div className='container' id='loginForm'>
        <div className='card border-success mt-5' id='loginFormCard'>
          <h1 id='loginHeader' className='card-header'>
            Login
          </h1>
          <div className='card-body' id='loginFormBody'>
            <div className='form-group'>
              <form id='target'>
                <input
                  className='form-control'
                  type='email'
                  name='username'
                  id='username'
                  placeholder='Email'
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
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
          <p>
            <Alert variant='danger' onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap!</Alert.Heading>
              <p>
                Looks like there was a server error. Try logging in after a
                couple minutes
              </p>
            </Alert>
          </p>
        ) : (
          <p hidden> no errors </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
