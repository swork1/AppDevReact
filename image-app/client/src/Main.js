import React from "react";
import { Route, HashRouter } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import CreatePage from "./CreatePage";
import UploadPage from "./UploadPage";

function Main() {
  return (
    <HashRouter>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
      />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />

      <div>
        <div className='content'>
          <Route path='/home' component={HomePage} />
          <Route path='/upload' component={UploadPage} />
          <Route path='/create' component={CreatePage} />
          <Route exact path='/' component={LoginPage} />
        </div>
      </div>
    </HashRouter>
  );
}

export default Main;
