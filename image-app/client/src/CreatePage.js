import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./CreatePage.css";

function CreatePage() {
  const [error, setError] = React.useState(false);
  const [dup, setDup] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  let history = useHistory();

  const create = (e) => {
    e.preventDefault();
    var requestData = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    axios
      .post("/api/user", requestData)
      .then((res) => {
        if (res.data === true) {
          history.push("/");
        } else {
          setError(true);
          setShow(true);
        }
      })
      .catch((error) => {
        setDup(true);
        setShow(true);
      });
  };

  return (
    <div>
      <div className='container' id='createForm'>
        <div className='card border-success mt-5' id='createFormCard'>
          <h1 id='createHeader' className='card-header'>
            Create Account
          </h1>
          <div className='card-body' id='createFormBody'>
            <div className='form-group'>
              <form id='form' onSubmit={create}>
                <input
                  className='form-control'
                  type='email'
                  id='username'
                  placeholder='Enter Valid Email Address'
                  required='required'
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className='form-control'
                  type='password'
                  id='password'
                  placeholder='Enter Password'
                  required='required'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className='form-control'
                  type='text'
                  id='firstName'
                  placeholder='Enter First Name'
                  required='required'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className='form-control'
                  type='text'
                  id='lastName'
                  placeholder='Enter Last Name'
                  required='required'
                  onChange={(e) => setLastName(e.target.value)}
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
