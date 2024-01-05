import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import UserHeader from "../Header/UserHeader.jsx";
import UserFooter from "../Footer/UserFooter.jsx";
import "./UserProfile.scss";

function UserProfile() {
  useEffect(() => {}, []);

  const history = useHistory();

  return (
    <Fragment>
      <UserHeader />
      <h1>UserProfile</h1>
      <UserFooter />
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
