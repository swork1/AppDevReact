import React from "react";
import { Route, HashRouter } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import CreatePage from "./CreatePage";
import UploadPage from "./UploadPage";

function Main() {
  return (
    <HashRouter>
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
