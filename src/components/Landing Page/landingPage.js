import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
  });
render() {
    return (
    )
}

  
  export default connect(mapStateToProps)(LandingPage);
