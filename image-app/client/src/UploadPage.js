import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
      <div>
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
                <input
                  className='form-control-file'
                  type='file'
                  accept='image/*'
                  name='photo'
                  id='file'
                  required='required'
                />
                <input
                  className='form-control'
                  type='text'
                  name='photoName'
                  id='photoName'
                  required='required'
                  placeholder='Photo Name'
                />
                <input
                  className='form-control'
                  type='text'
                  name='album'
                  id='album'
                  required='required'
                  placeholder='Photo Album'
                />
                <input
                  className='form-control'
                  type='text'
                  name='description'
                  id='description'
                  required='required'
                  placeholder='Description for Photo'
                />
                <input
                  className='form-control'
                  type='text'
                  name='camera'
                  id='camera'
                  placeholder='Camera Used'
                />
                <input
                  className='form-control'
                  type='text'
                  name='fstop'
                  id='fstop'
                  placeholder='f-stop'
                />
                <input
                  className='form-control'
                  type='text'
                  name='sspeed'
                  id='sspeed'
                  placeholder='s-speed'
                />
                <input
                  className='form-control'
                  type='text'
                  name='iso'
                  id='iso'
                  placeholder='ISO'
                />
                <input
                  className='form-control'
                  type='text'
                  name='focal_length'
                  id='focal_length'
                  placeholder='Focal Length'
                />

                <input
                  className='btn mt-3'
                  type='submit'
                  value='Upload'
                  id='uploadBtn'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
