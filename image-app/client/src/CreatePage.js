import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Alert } from "react-bootstrap";
import "./CreatePage.css";

function CreatePage() {
  const [error, setError] = React.useState(false);
  const [dup, setDup] = React.useState(false);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    function create(username, password, firstName, lastName) {
      var requestData = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };
      console.log(requestData);
      $.post("/api/user", requestData, function (data) {
        if (data === true) {
          window.location.href = "http://localhost:3000/#/login";
        } else {
          setError(true);
          setShow(true);
        }
      }).fail(function () {
        setDup(true);
        setShow(true);
      });
    }

    $("#form").submit(function (e) {
      e.preventDefault();
      create(
        $("#username").val(),
        $("#password").val(),
        $("#firstName").val(),
        $("#lastName").val()
      );
    });
  }, []);

  return (
    <div>
      <div className='container' id='createForm'>
        <div className='card border-success mt-5' id='createFormCard'>
          <h1 id='createHeader' className='card-header'>
            Create Account
          </h1>
          <div className='card-body' id='createFormBody'>
            <div className='form-group'>
              <form id='form'>
                <input
                  className='form-control'
                  type='email'
                  name='username'
                  id='username'
                  placeholder='Enter Valid Email Address'
                  required='required'
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter Password'
                  required='required'
                />
                <input
                  className='form-control'
                  type='text'
                  name='firstName'
                  id='firstName'
                  placeholder='Enter First Name'
                  required='required'
                />
                <input
                  className='form-control'
                  type='text'
                  name='lastName'
                  id='lastName'
                  placeholder='Enter Last Name'
                  required='required'
                />
                <input
                  className='btn mt-3'
                  type='submit'
                  value='Create Account'
                  id='createBtn'
                />
              </form>

              <h3 className='card-header' id='haveAcc'>
                Already have an account? <Link to='/'> Login </Link>{" "}
              </h3>
            </div>
          </div>
        </div>
        {error === true && show === true ? (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh Snap!</Alert.Heading>
            <p>There was an internal server error. Try again soon.</p>
          </Alert>
        ) : dup === true && show === true ? (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oops! Email Taken</Alert.Heading>
            <p>
              Looks like this email is already taken. Try again with a different
              email.
            </p>
          </Alert>
        ) : (
          <p hidden> no errors </p>
        )}
      </div>
    </div>
  );
}

export default CreatePage;
