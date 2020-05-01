import React from "react";
import $ from "jquery";
import "./UploadPage.css";

function UploadPage() {
  $(function () {
    function displayStatus() {
      // Get the token from localStorage
      var token = window.localStorage.getItem("token");

      $.ajax({
        url: "api/status",
        type: "GET",
        headers: { "X-Auth": token },
      })
        .done(function (data) {
          //set username to user logged in
          var username = data.uid;
          //update username
          updateUsername(username);
        })
        .fail(function (jqXHR) {
          //gives user alert that they will be redirected.
          if (
            window.confirm(
              'You are not allowed to access this page. Click "ok" or "cancel" to return to the login page.'
            )
          ) {
            window.location.href = "/login.html";
          }
          window.location.href = "/login.html";
          $("#errorMsg").html(jqXHR.responseJSON.error);
        });
    }

    displayStatus();

    function updateUsername(user) {
      //set username value to user
      $("#username").val(user);
    }
  });
  return (
    <div>
      <div>
        <a href='home.html' className='btn btn-info btn-lg' id='homeBtn'>
          <span className='glyphicon glyphicon-log-out'></span> Home
        </a>
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
