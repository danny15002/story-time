import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputLabel,
  TextField
} from '@material-ui/core/';

import withAuth from '../ProtectedWrapper';
import Header from '../Header';
import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

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
        cost: ''
      }
    };

    this.onGetStory = () => this._onGetStory()
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.GET_STORY, this.onGetStory);
    this.getStory();
  }

  componentWillUnmount() {
    Store.removeEventListener(CONSTANTS.GET_STORY, this.onGetStory);
  }

  getStory() {
    const id = this.props.match.params.id;
    Actions.storiesShow(id);
  }

  _onGetStory() {
    this.setState({ story: Store.getActiveStory() });
  }

  accept(accepted) {
    const story = this.state.story;
    story.status = accepted ? 'accepted' : 'rejected';
    Actions.storiesUpdate(story);
  }

  render() {
    const activeUser = Store.getActiveUser();

    if (!activeUser.role === 'Admin')
      return (
        <div>
          <Header />
          <h1>Forbidden</h1>
        </div>
      );

    const story = this.state.story;

    return (
      <div>
        <div>
          <InputLabel>Summary</InputLabel>
          <TextField
            value={story.summary}
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <TextField
            value={story.description}
          />
        </div>
        <div>
          <InputLabel>Type</InputLabel>
          <TextField
            value={story.type}
          />
        </div>
        <div>
          <InputLabel>Complexity</InputLabel>
          <TextField
            value={story.complexity}
          />
        </div>
        <div>
          <InputLabel>Estimated time for completion</InputLabel>
          <TextField
            value={story.estimatedHrs}
          />
        </div>
        <div>
          <InputLabel>Cost</InputLabel>
          <TextField
            value={story.cost}
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
  match: PropTypes.object.isRequired
};

export default withAuth(StoryComponent);
