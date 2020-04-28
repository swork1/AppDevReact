import React from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import LoginPage from "./LoginPage";
import CreatePage from "./CreatePage";

function Main() {
  return (
    <HashRouter>
      <div>
        <ul className="header">
          <li>
            <NavLink exact to="/">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route path="/home" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/create" component={CreatePage} />
          <Route exact path="/" component={LoginPage} />
        </div>
      </div>
    </HashRouter>
  );
}

export default Main;
