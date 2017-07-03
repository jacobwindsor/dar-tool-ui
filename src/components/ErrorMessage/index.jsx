import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import alert from '../../assets/alert.svg';
import './index.css';

const ErrorMessage = ({ errorMessage }) => (
  <Paper className="error-message">
    <img src={alert} alt="Alert" />
    <h1>Oops!</h1>
    <h4>{errorMessage}</h4>
  </Paper>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
