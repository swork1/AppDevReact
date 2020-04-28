import React from "react";
import { Link } from "react-router-dom";
import "./CreatePage.css";

function CreatePage() {
  return (
    <div>
      <div className="container" id="createForm">
        <div className="card border-success mt-5" id="createFormCard">
          <h1 id="createHeader" className="card-header">
            Create Account
          </h1>
          <div className="card-body" id="createFormBody">
            <div className="form-group">
              <form action="/api/user" method="post" id="form">
                <input
                  className="form-control"
                  type="email"
                  name="username"
                  id="username"
                  placeholder="Enter Valid Email Address"
                  required="required"
                />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required="required"
                />
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  required="required"
                />
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required="required"
                />
                <input
                  className="btn mt-3"
                  type="submit"
                  value="Create Account"
                  id="createBtn"
                />
              </form>

              <h3 className="card-header" id="haveAcc">
                Already have an account? <Link to="/"> Login </Link>{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
