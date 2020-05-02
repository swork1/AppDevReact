import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import $ from "jquery";
import "./HomePage.css";
import axios from "axios";

function HomePage() {
  let history = useHistory();

  useEffect(() => {
    function authenticate() {
      var token = window.localStorage.getItem("token");

      axios
        .get("api/status", { headers: { "X-Auth": token } })
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
            history.push("/");
          } else {
            history.push("/");
          }
        });
    }

    authenticate();

    $("#logoutBtn").click(function () {
      window.localStorage.removeItem("token");
    });
  });

  function setImages(username) {
    // load the image information from the database
    // Change for thumbnails?
    $.get("/api/images", (data) => {
      let html = "";
      let col0html = "";
      let col1html = "";
      let col2html = "";
      let k = 0;
      var imgData = data;
      let imgNum = 0;
      //build a card for each image
      for (var i = 0; i < data.length; i++) {
        //Gets username specific images
        if (data[i].owner === username) {
          //get filename before extension
          var filename = data[i].filename.split(".").slice(0, -1).join(".");
          //get extension
          var filename_ext = data[i].filename.split(".").pop();
          //combine filename and extension with _thumb in between to get thumbnail of image.
          filename = filename + "_thumb" + "." + filename_ext;

          //Sets html with thumbnail of image and image name under.
          html +=
            '<div class="thumbnail" data-imgNum = "' +
            imgNum +
            '">\n' +
            '<a href="javascript:;" class="imgText">' +
            '<img style="width:100%" src="images/' +
            data[i].path +
            "/" +
            filename +
            '"> \n' +
            '<div class="caption">' +
            "<p>" +
            data[i].photo_name +
            "</p>" +
            "</div>" +
            "</a> \n" +
            "</div>" +
            "</div>";

          //Below is an algorithm to display my pictures in bootstrap grid system correctly
          //Puts pictures in their respective spots, column 1, column2, or column3
          if (k === 3) {
            k = 0;
          }
          //Puts in column 1
          if (k === 0) {
            col0html += html;
            $("#0col").html(col0html);
            html = "";
            k = k + 1;
            imgNum = imgNum + 1;
          }
          //Puts in column 2
          else if (k === 1) {
            col1html += html;
            $("#1col").html(col1html);
            html = "";
            k = k + 1;
            imgNum = imgNum + 1;
          }
          //Puts in column 3
          else if (k === 2) {
            col2html += html;
            $("#2col").html(col2html);
            html = "";
            k = k + 1;
            imgNum = imgNum + 1;
          }
        }
      }
      imgInfo(imgData, username);
    });
  }

  function imgInfo(imgData, username) {
    //Highlights nav items
    var i = 0;
    var thumb = $(".thumbnail");
    for (i = 0; i < thumb.length; i++) {
      if (thumb[i] != null) {
        thumb[i].addEventListener("click", function () {
          imgData = imgData.filter((a) => a.owner === username);
          var html =
            '<div class = "container">' +
            '<div class="card border-success mt-5">' +
            '<div class="card-body">' +
            '<a href="home.html" class="btn btn-info btn-lg" id ="imgBackBtn"> <span class="glyphicon glyphicon-log-out"></span> Go Back To Photo Gallery </a>' +
            '<img style="width:100%" src="images/' +
            imgData[this.dataset.imgnum].path +
            "/" +
            imgData[this.dataset.imgnum].filename +
            '"> \n' +
            "<div>" +
            "<p><strong>Photo Name: </strong> " +
            imgData[this.dataset.imgnum].photo_name +
            "</p>" +
            "<p><strong>Album: </strong> " +
            imgData[this.dataset.imgnum].album +
            "</p>" +
            "<p><strong>Upload Date: </strong> " +
            imgData[this.dataset.imgnum].upload_date +
            "</p>" +
            "<p><strong>Description: </strong> " +
            imgData[this.dataset.imgnum].description +
            "</p>" +
            "<p><strong>Camera: </strong> " +
            imgData[this.dataset.imgnum].camera +
            "</p>" +
            "<p><strong>F-Stop: </strong> " +
            imgData[this.dataset.imgnum].fstop +
            "</p>" +
            "<p><strong>S-Speed: </strong> " +
            imgData[this.dataset.imgnum].sspeed +
            "</p>" +
            "<p><strong>Iso: </strong> " +
            imgData[this.dataset.imgnum].iso +
            "</p>" +
            "<p><strong>Focal Length: </strong> " +
            imgData[this.dataset.imgnum].focal_length +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
          $("#imageArea").html(html);
        });
      }
    }
  }

  return (
    <div>
      <div>
        <Link to='/' className='btn btn-info btn-lg' id='logoutBtn'>
          <span className='glyphicon glyphicon-log-out'></span> Log out
        </Link>
      </div>

      <Link to='/upload' className='btn btn-info btn-lg' id='uploadBtn'>
        {" "}
        <span className='glyphicon glyphicon-log-out'></span> Upload
      </Link>

      <div className='container'>
        <div className='card border-success mt-5' id='pageTitle'>
          <h1 className='card-header' id='title'>
            Photo Gallery
          </h1>
        </div>
        <hr className='mt-2 mb-5' />
        <div className='row' id='imageArea'>
          <div className='col-md-4' id='0col'></div>

          <div className='col-md-4' id='1col'></div>

          <div className='col-md-4' id='2col'></div>
        </div>
      </div>

      <div className='container'></div>
    </div>
  );
}

export default HomePage;
