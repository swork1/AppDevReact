import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  Container,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import LinkedThumbnail from './LinkedThumbnail';
import './HomePage.css';

function HomePage() {
  const [userImages, setUserImages] = React.useState([]);
  const [popUpImageData, setPopUpImageData] = React.useState(undefined);

  let history = useHistory();

  useEffect(() => {
    //Authentication
    var token = window.localStorage.getItem('token');

    axios
      .get('api/status', { headers: { 'X-Auth': token } })
      .then((res) => {
        var username = res.data.uid;
        setImages(username);
      })
      .catch((error) => {
        if (
          window.confirm(
            'You are not allowed to access this page. Click "ok" or "cancel" to return to the login page.'
          )
        ) {
          history.push('/');
        } else {
          history.push('/');
        }
      });
  }, []);

  function setImages(username) {
    // load the image information from the database
    // Change for thumbnails?
    axios.get('/api/images').then((res) => {
      var data = res.data;

      const newUserImages = [];
      //build a card for each image
      for (var i = 0; i < data.length; i++) {
        //Gets username specific images
        if (data[i].owner === username) {
          newUserImages.push(data[i]);
        }
      }
      setUserImages(newUserImages);
      // imgInfo(data, username);
    });
  }

  return (
    <div>
      <Link to='/' className='btnLink'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            window.localStorage.removeItem('token');
          }}
        >
          Log Out
        </Button>
      </Link>
      <div className='uploadBtn'>
        <Link to='/upload' className='btnLink'>
          <Button variant='contained' color='primary'>
            Upload
          </Button>
        </Link>
      </div>
      <Container>
        <Card variant='elevation' id='pageTitle'>
          <CardContent>
            <Typography id='title' variant='h3'>
              Photo Gallery
            </Typography>
          </CardContent>
        </Card>
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='center'
        >
          {userImages.map((userImage) => (
            <LinkedThumbnail
              key={userImage.filename}
              isPopover={false}
              imageData={userImage}
              onThumbnailClick={(imageData) => setPopUpImageData(imageData)}
            />
          ))}
        </Grid>
        <Dialog
          open={popUpImageData}
          onClose={() => setPopUpImageData(undefined)}
          fullScreen={true}
          className='popUpDialog'
        >
          <DialogContent>
            <LinkedThumbnail
              isPopover={true}
              imageData={popUpImageData}
              onBack={() => setPopUpImageData(undefined)}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
export default HomePage;
