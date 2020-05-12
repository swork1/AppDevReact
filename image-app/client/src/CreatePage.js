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
import './CreatePage.css';

function CreatePage() {
  const [error, setError] = React.useState(false);
  const [dup, setDup] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
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
      .post('/api/user', requestData)
      .then((res) => {
        if (res.data === true) {
          history.push('/');
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
      <Container id='createForm'>
        <Card className='formCard'>
          <Typography className='formHeader' variant='h3'>
            Create Account
          </Typography>
          <CardContent id='createFormBody'>
            <form id='form' onSubmit={create}>
              <PaddedTextField
                textFieldProps={{
                  variant: 'outlined',
                  label: 'Email',
                  type: 'email',
                  required: true,
                  onChange: (e) => setUsername(e.target.value),
                }}
              />
              <PaddedTextField
                textFieldProps={{
                  variant: 'outlined',
                  label: 'Password',
                  type: 'password',
                  required: true,
                  onChange: (e) => setPassword(e.target.value),
                }}
              />
              <PaddedTextField
                disableIsBlock
                textFieldProps={{
                  variant: 'outlined',
                  label: 'First Name',
                  required: true,
                  onChange: (e) => setFirstName(e.target.value),
                }}
              />
              <PaddedTextField
                disableIsBlock
                textFieldProps={{
                  variant: 'outlined',
                  label: 'Last Name',
                  required: true,
                  onChange: (e) => setLastName(e.target.value),
                }}
              />
              <input
                className='btn mt-3'
                type='submit'
                value='Create Account'
                id='createBtn'
              />
              <div>
                <label htmlFor='createBtn'>
                  <Button variant='contained' color='default'>
                    Create
                  </Button>
                </label>
              </div>
            </form>

            <Typography className='loginCreateAcc'>
              Already have an account?
              <Link to='/' className='btnLink'>
                <Button color='primary'>Login</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
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
      </Container>
    </div>
  );
}

export default CreatePage;
