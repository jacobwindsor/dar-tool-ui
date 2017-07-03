import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import csv from '../../assets/csv.svg';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as CSVParse from 'csv-parse';
import Compounds from '../../data/compounds';
import Snackbar from 'material-ui/Snackbar';
import ErrorMessage from '../../components/ErrorMessage';
import './index.css';

class CreateCompoundSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      error: null,
      datasetName: '',
      email: '',
      successMessageShown: false,
    };
  }

  handleDatasetUpload = e => {
    const fileList = e.target.files;
    if (fileList.length > 1) {
      this.setState({
        error: new Error('You cannot upload multiple files'),
      });
      return;
    }

    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      CSVParse(csv,

        // Set to = 201 so can provide error if over 200
        { rtrim: true, skip_empty_lines: true, to: 201, columns: ['IUPAC', 'CAS'] },
        (err, compounds) => {
          if (err) {
            this.setState({
              error: new Error(
                'An error occured while parsing your file. Please check the formatting.'
              ),
            });
            return;
          }

          if (compounds.length < 1) {
            this.setState({
              error: new Error('There must be at least one row of data in the file.'),
            });
            return;
          }

          if (compounds.length > 200) {
            this.setState({
              error: new Error(
                'There cannot be more than 200 rows of data in the file. ' +
                'Please split the dataset up.'
              ),
            });
            return;
          }

          this.setState({
            dataset: compounds,
          });
        });
    };

    reader.readAsText(file);
  };

  handleSave = () => {
    const { dataset, email, datasetName } = this.state;
    Compounds.create({ email, name: datasetName, dataset })
      .then(res => {
        this.setState({
          dataset: null,
          email: '',
          datasetName: '',
          successMessageShown: true,
        });
      })
      .catch(err => this.setState({ error: err }));
  };

  renderUploader() {
    const { dataset } = this.state;
    if (dataset) return;

    return (
      <Paper className="form-wrapper">
        <input
          type="file"
          accept="text/csv"
          style={{ opacity: 0, position: 'absolute', left: '-100px' }}
          ref={input => this.inputElement = input}
          onChange={this.handleDatasetUpload}
        />
        <div className="header">
          <img src={csv} />
          <h1>Upload your dataset</h1>
          <p>Upload a ".csv" file with one compound per row,
            the first column containing the compound name,
            and the second column containing the CAS registry number.</p>
        </div>
        <div className="body">
          <RaisedButton
            label="Upload"
            secondary
            onTouchTap={() => this.inputElement.click() }/>
        </div>
      </Paper>
    );
  }

  onFieldChange = fieldName => e => this.setState({
    [fieldName]: e.target.value,
  });

  renderForm() {
    const { dataset } = this.state;
    if (!dataset) return;

    return (
      <Paper className="form-wrapper">
        <div className="body">
          <TextField
            fullWidth
            value={this.state.datasetName}
            onChange={this.onFieldChange('datasetName')}
            hintText="Darling Data"
            floatingLabelText="Dataset Name"
          />
          <TextField
            fullWidth
            value={this.state.email}
            onChange={this.onFieldChange('email')}
            hintText="data@star.trek"
            floatingLabelText="Your email"
          />
          <FlatButton
            label="Save"
            fullWidth
            onTouchTap={this.handleSave}
          />
        </div>
      </Paper>
    );
  }

  render() {
    const { successMessageShown, error } = this.state;

    if (error) return (
      <ErrorMessage
        errorMessage={error.message}
      />
    );

    return (
      <div className="create-compound-set">
        {this.renderUploader()}
        {this.renderForm()}
        <Snackbar
          open={successMessageShown}
          message="Your dataset is processing"
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ success: false })}
        />
      </div>
    );
  }
}

export default CreateCompoundSet;
