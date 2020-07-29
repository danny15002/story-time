import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core/';

import withAuth from '../ProtectedWrapper';
import HeaderComponent from '../HeaderComponent';
import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

import './style.css';

const headers = [
  'ID',
  'Summary',
  'Description',
  'Type',
  'Complexity',
  'Estimated time for completion',
  'Cost'
];
const keys = [
  'id',
  'summary',
  'description',
  'type',
  'complexity',
  'estimatedHrs',
  'cost'
];

class StoriesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      filteredStories: [],
      activeSort: '',
      sortDirection: 'asc',
      filter: 'none'
    };

    this.onGetStories = () => this._onGetStories();
    this.handleSort = key => this._handleSort(key);
    this.filter = key => this._filter(key);
    this.goToStory = event => this._goToStory(event);
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.GET_STORIES, this.onGetStories);
    const isAdmin = Store.getActiveUser().role === 'Admin';
    const stories = Store.getStories();

    // need to prevent stories from reloading to maintian in memory admin changes
    if (isAdmin && stories && !this.state.stories.length)
      return this.setState({ stories: stories, filteredStories: stories });

    this.getStories();
  }

  componentWillUnmount() {
    Store.removeEventListener(CONSTANTS.GET_STORIES, this.onGetStories);
  }

  getStories() {
    Actions.storiesIndex();
  }

  _onGetStories() {
    this.setState({
      stories: Store.getStories(),
      filteredStories: Store.getStories(),
      filter: 'none'
    });
  }

  _handleSort(sortKey) {
    const newState = {
      activeSort: sortKey
    };

    if (sortKey === this.state.activeSort)
      newState.sortDirection = this.state.sortDirection === 'asc'
        ? 'desc'
        : 'asc';
    else
      newState.sortDirection = 'asc';

    if (newState.sortDirection === 'asc')
      newState.stories = this.sortStories(sortKey, 1);
    if (newState.sortDirection === 'desc')
      newState.stories = this.sortStories(sortKey, -1);

    this.setState(newState);
  }

  sortStories(sortKey, direction) {
    return this.state.stories.sort((a, b) => {
      if (a[sortKey] > b[sortKey])
        return direction;
      if (a[sortKey] < b[sortKey])
        return -1 * direction;
      return 0;
    });
  }

  _filter(event) {
    const filter = event.target.value;
    const newState = { filteredStories: this.state.stories, filter: filter };

    if (filter === 'none')
      return this.setState(newState);

    newState.filteredStories =
      this.state.stories.filter(s => s.type === filter);

    this.setState(newState);
  }

  _goToStory(event) {
    const isAdmin = Store.getActiveUser().role === 'Admin';
    const storyId = Number(event.target.dataset.storyId);

    if (isAdmin && storyId)
      this.props.history.push(`/stories/${storyId}`);
  }

  getClass(story) {
    const isAdmin = Store.getActiveUser().role === 'Admin';

    if (isAdmin && story.status === 'accepted')
      return 'accepted';
    if (isAdmin && story.status === 'rejected')
      return 'rejected';
    if (isAdmin)
      return 'admin';

    return '';
  }

  render() {
    return (
      <div className="stories-component">
        <HeaderComponent />
        <div className="filters">
          <InputLabel>Type Filter</InputLabel>
          <Select
            value={this.state.filter}
            onChange={this.filter}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="enhancement">Enhancement</MenuItem>
            <MenuItem value="bugfix">Bugfix</MenuItem>
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="qa">QA</MenuItem>
          </Select>
        </div>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {
                  headers.map((header, idx) =>
                    <TableCell key={idx}>
                      {
                        header === 'ID' || header === 'Complexity'
                          ?
                          <TableSortLabel
                            active={this.state.activeSort === header}
                            direction={this.state.sortDirection}
                            onClick={() => this.handleSort(keys[idx])}
                          >
                            {header}
                          </TableSortLabel>
                          :
                          <span>{header}</span>
                      }
                    </TableCell>
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody onClick={this.goToStory}>
              {
                this.state.filteredStories.map((story, idx) =>
                  <TableRow
                    key={idx}
                    data-story-id={story.id}
                    className={this.getClass(story)}
                  >
                    {
                      keys.map((key, idx) => (
                        <TableCell key={idx} data-story-id={story.id}>
                          {story[key]}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

StoriesComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withAuth(StoriesComponent);
