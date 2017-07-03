import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const Error = ({ errorMessage }) => (
  <Paper>
    <h1>Oops!</h1>
    <h4>{errorMessage}</h4>
  </Paper>
);

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
