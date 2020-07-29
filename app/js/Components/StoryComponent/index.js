import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputLabel,
  TextField
} from '@material-ui/core/';
import { Redirect } from 'react-router-dom';

import withAuth from '../ProtectedWrapper';
import HeaderComponent from '../HeaderComponent';
import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

import './style.css';

class StoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: {
        summary: '',
        description: '',
        type: '',
        complexity: '',
        estimatedHrs: '',
        cost: '',
        status: ''
      }
    };

    this.onGetStory = () => this._onGetStory();
    this.onUpdateStory = () => this._onUpdateStory();
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.GET_STORY, this.onGetStory);
    Store.addEventListener(CONSTANTS.UPDATE_STORY, this.onUpdateStory);
    this.getStory();
  }

  componentWillUnmount() {
    Store.removeEventListener(CONSTANTS.GET_STORY, this.onGetStory);
    Store.removeEventListener(CONSTANTS.UPDATE_STORY, this.onUpdateStory);
  }

  getStory() {
    const id = this.props.match.params.id;
    Actions.storiesShow(id);
  }

  _onGetStory() {
    this.setState({ story: Store.getActiveStory() });
  }

  _onUpdateStory() {
    this.props.history.push('/stories');
  }

  accept(accepted) {
    const story = this.state.story;
    story.status = accepted ? 'accepted' : 'rejected';
    Actions.storiesUpdate(story);
  }

  render() {
    const activeUser = Store.getActiveUser();

    if (activeUser.role !== 'Admin')
      return (
        <div>
          <HeaderComponent />
          <h1>Forbidden</h1>
        </div>
      );

    // updating won't work if stories aren't loaded, redirect to stories page
    if (!Store.getStories())
      return (<Redirect to={{ pathname: '/stories' }} />);

    const story = this.state.story;
    const status = (Store.getCachedStory(story.id) || {}).status;

    return (
      <div className="story-component">
        <HeaderComponent />
        <div className="story-field">
          <InputLabel>Summary</InputLabel>
          <TextField
            value={story.summary}
          />
        </div>
        <div className="story-field">
          <InputLabel>Description</InputLabel>
          <TextField
            value={story.description}
          />
        </div>
        <div className="story-field">
          <InputLabel>Type</InputLabel>
          <TextField
            value={story.type}
          />
        </div>
        <div className="story-field">
          <InputLabel>Complexity</InputLabel>
          <TextField
            value={story.complexity}
          />
        </div>
        <div className="story-field">
          <InputLabel>Estimated time for completion</InputLabel>
          <TextField
            value={story.estimatedHrs}
          />
        </div>
        <div className="story-field">
          <InputLabel>Cost</InputLabel>
          <TextField
            value={story.cost}
          />
        </div>
        <div className="story-field">
          <InputLabel>Status</InputLabel>
          <TextField
            value={status}
          />
        </div>
        <div>
          <Button
            color="primary"
            onClick={() => this.accept(true)}
            variant="contained"
          >
            Accept
          </Button>
          <Button
            color="secondary"
            onClick={() => this.accept(false)}
            variant="contained"
          >
            Reject
          </Button>
        </div>
      </div>
    );
  }
}

StoryComponent.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withAuth(StoryComponent);
