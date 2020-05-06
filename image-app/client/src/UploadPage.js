import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PaddedTextField from "./PaddedTextField";
import Button from "@material-ui/core/Button";
import "./UploadPage.css";
import axios from "axios";

function UploadPage() {
  let history = useHistory();

  useEffect(() => {
    //Function that authenticates user by checking if token is valid
    function authenticate() {
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
    }

    authenticate();
  });

  return (
    <div>
      <div id='logoutBtnDiv'>
        <Link to='/' className='btn btn-info btn-lg' id='logoutBtn'>
          <span className='glyphicon glyphicon-log-out'></span> Log out
        </Link>
      </div>

      <div id='homeBtnDiv'>
        <Link to='/home' className='btn btn-info btn-lg' id='homeBtn'>
          <span className='glyphicon glyphicon-log-out'></span> Home
        </Link>
      </div>
      <div className='container' id='uploadForm'>
        <div className='card border-success mt-5' id='uploadFormCard'>
          <h1 className='card-header' id='uploadHeader'>
            Upload Image
          </h1>
          <div className='card-body' id='uploadFormBody'>
            <div className='form-group'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
