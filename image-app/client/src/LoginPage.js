import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import $ from "jquery";
import { Alert } from "react-bootstrap";

function LoginPage() {
  // Javascript file auth.js
  // Uses Ajax to login user. Saves token to local storage then gets token to authorize user.
  // Created 2/20/20
  // Author : Seth Workman

  const [error, setError] = React.useState(false);
  const [badUorP, setBadUorP] = React.useState(false);
  const [show, setShow] = React.useState(false);

  $(function () {
    function login(username, password) {
      var requestData = { username: username, password: password };
      $.post("/api/auth", requestData, function (data) {
        if (data.token) {
          // Store token in local storage
          window.localStorage.setItem("token", data.token);
          window.location.href = "http://localhost:3000/#/home";
        } else {
          setError(true);
          setShow(true);
          console.log("error");
        }
      }).fail(function () {
        setBadUorP(true);
        setShow(true);
      });
    }

    $("#target").submit(function (e) {
      login($("#username").val(), $("#password").val());
      e.preventDefault();
    });
  });

  return (
    <div>
      <div className="container" id="loginForm">
        <div className="card border-success mt-5" id="loginFormCard">
          <h1 id="header" className="card-header">
            Login
          </h1>
          <div className="card-body">
            <div className="form-group">
              <form id="target">
                <input
                  className="form-control"
                  type="email"
                  name="username"
                  id="username"
                  placeholder="Email"
                />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />

                <input
                  className="btn mt-3"
                  type="submit"
                  value="Login"
                  id="loginBtn"
                />
              </form>

              <h3 className="card-header" id="noAcc">
                Don't have an account?{" "}
                <Link to="/Contact"> Create an account </Link>{" "}
              </h3>
            </div>
          </div>
        </div>
        {badUorP === true && show === true ? (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oops! Wrong Username or Password</Alert.Heading>
            <p>
              Looks like you entered the incorrect username or password. Try
              again.
            </p>
          </Alert>
        ) : error === true && show === true ? (
          <p>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
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
