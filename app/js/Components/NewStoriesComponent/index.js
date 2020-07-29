import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

import withAuth from '../ProtectedWrapper';
import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

class NewStoriesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: '',
      description: '',
      type: '',
      complexity: '',
      estimatedTime: '',
      cost: ''
    };

    this.createStory = () => this._createStory();
    this.onSummaryChange = this._onChange('summary');
    this.onDescriptionChange = this._onChange('description');
    this.onTypeChange = this._onChange('type');
    this.onComplexityChange = this._onChange('complexity');
    this.onEstimatedTime = this._onChange('estimatedTime');
    this.onCostChange = this._onChange('cost');
    this.onCreateStory = () => this._onCreateStory();
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.CREATE_STORY, this.onCreateStory);
  }

  _onCreateStory() {
    return this.props.history.push('/stories');
  }

  _onChange(name) {
    return event => this.setState({ [name]: event.target.value });
  }

  isDataValid() {
    return Object.keys(this.state)
      .every(key => this.state[key] === 0 || this.state[key]);
  }

  _createStory() {
    Actions.createStory(this.state);
  }

  render() {
    return (
      <div className="login-component">
        <p>All fields are required.</p>
        <div>
          <InputLabel>Summary</InputLabel>
          <TextField
            onChange={this.onSummaryChange}
            value={this.state.summary}
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <TextField
            onChange={this.onDescriptionChange}
            value={this.state.description}
          />
        </div>
        <div>
          <InputLabel>Type</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.onTypeChange}
          >
            <MenuItem value="enhancement">Enhancement</MenuItem>
            <MenuItem value="bugfix">Bugfix</MenuItem>
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="qa">QA</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel>Complexity</InputLabel>
          <Select
            value={this.state.complexity}
            onChange={this.onComplexityChange}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel>Estimated Time</InputLabel>
          <TextField
            type="number"
            onChange={this.onEstimatedTime}
            value={this.state.estimatedTime}
          />
        </div>
        <div>
          <InputLabel>Cost</InputLabel>
          <Input
            onChange={this.onCostChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            value={this.state.cost}
          />
        </div>
        <Button
          color="primary"
          disabled={!this.isDataValid()}
          onClick={this.createStory}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    );
  }
}

NewStoriesComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withAuth(NewStoriesComponent);
