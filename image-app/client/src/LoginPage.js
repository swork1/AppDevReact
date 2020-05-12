import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import PaddedTextField from './PaddedTextField';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from '@material-ui/core';
import './LoginPage.css';

function LoginPage() {
  const [error, setError] = React.useState(false);
  const [badUorP, setBadUorP] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    var requestData = { username: username, password: password };
    axios
      .post('/api/auth', requestData)
      .then((res) => {
        if (res.data.token) {
          window.localStorage.setItem('token', res.data.token);
          history.push('/home');
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
      <Container id='loginForm'>
        <Card className='formCard' variant='elevation'>
          <Typography className='formHeader' variant='h3'>
            Login
          </Typography>
          <CardContent id='loginFormBody'>
            <form id='target' onSubmit={login}>
              <PaddedTextField
                textFieldProps={{
                  label: 'Email',
                  variant: 'outlined',
                  type: 'email',
                  required: true,
                  onChange: (e) => setUsername(e.target.value),
                }}
              />
              <PaddedTextField
                textFieldProps={{
                  label: 'Password',
                  variant: 'outlined',
                  type: 'password',
                  required: true,
                  onChange: (e) => setPassword(e.target.value),
                }}
              />
              <input
                className='btn mt-3'
                type='submit'
                value='Login'
                id='loginBtn'
              />
              <div>
                <label htmlFor='loginBtn'>
                  <Button variant='contained' color='default'>
                    Login
                  </Button>
                </label>
              </div>
            </form>
            <Typography className='loginCreateAcc'>
              Don't have an account?{' '}
              <Link to='/create' className='btnLink'>
                <Button color='primary'>Create an account</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
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
      </Container>
    </div>
  );
}

export default LoginPage;
