import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PaddedTextField from "./PaddedTextField";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import "./UploadPage.css";
import axios from "axios";

function UploadPage() {
  let history = useHistory();

  useEffect(() => {
    //Authentication
    var token = window.localStorage.getItem("token");

    axios
      .get("api/status", { headers: { "X-Auth": token } })
      .then((res) => {
        var username = res.data.uid;
        document.getElementById("username").value = username;
      })
      .catch((error) => {
        if (
          window.confirm(
            'You are not allowed to access this page. Click "ok" or "cancel" to return to the login page.'
          )
        ) {
          history.push("/");
        } else {
          history.push("/");
        }
      });
  }, []);

  return (
    <div>
      <Link to='/' className='btnLink'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            window.localStorage.removeItem("token");
          }}>
          Log Out
        </Button>
      </Link>

      <div id='homeBtnDiv'>
        <Link to='/home' className='btnLink'>
          <Button variant='contained' color='primary'>
            Home
          </Button>
        </Link>
      </div>
      <div className='container' id='uploadForm'>
        <Card id='uploadFormCard' variant='elevation'>
          <Typography id='uploadHeader' variant='h3' component='h1'>
            Upload Image
          </Typography>
          <CardContent>
            <Typography>
              <form
                action='/api/images'
                method='post'
                encType='multipart/form-data'>
                <input
                  className='form-control'
                  type='hidden'
                  name='username'
                  id='username'
                />
                <div className='fileButton'>
                  <Button>
                    <input
                      type='file'
                      accept='image/*'
                      name='photo'
                      required='required'
                      id='fileUpload'
                    />
                  </Button>
                </div>
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "photoName",
                    required: true,
                    label: "Photo Name",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "album",
                    required: true,
                    label: "Photo Album",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "description",
                    required: true,
                    label: "Description",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "camera",
                    label: "Camera Used",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "fstop",
                    label: "f-stop",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "sspeed",
                    label: "s-speed",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "iso",
                    label: "ISO",
                  }}
                />
                <PaddedTextField
                  disableIsBlock
                  textFieldProps={{
                    variant: "outlined",
                    name: "focal_length",
                    label: "Focal Length",
                  }}
                />
                <input
                  className='btn mt-3'
                  type='submit'
                  value='Upload'
                  id='uploadBtn'
                />
                <label htmlFor='uploadBtn'>
                  <Button variant='contained' color='default' component='span'>
                    Upload
                  </Button>
                </label>
              </form>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UploadPage;
