import React, { Component } from 'react';
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
import Header from '../Header';
import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

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
      filter: ''
    };

    this.onGetStories = () => this._onGetStories();
    this.handleSort = key => this._handleSort(key);
    this.filter = key => this._filter(key);
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.GET_STORIES, this.onGetStories);
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
      filter: ''
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

    if (!filter)
      return this.setState(newState);

    newState.filteredStories =
      this.state.stories.filter(s => s.type === filter);

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Header />
        <div>Stories</div>
        <div>
          <InputLabel>Type Filter</InputLabel>
          <Select
            value={this.state.filter}
            onChange={this.filter}
          >
            <MenuItem value="">None</MenuItem>
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
            <TableBody>
              {
                this.state.filteredStories.map((story, idx) =>
                  <TableRow key={idx}>
                    {
                      keys.map((key, idx) => {
                        if (key !== 'id')
                          return (
                            <TableCell key={idx}>
                              {story[key]}
                            </TableCell>
                          );
                        return (
                          <TableCell key={idx}>
                            <Link to={ `/stories/${story.id}` }>
                              {story[key]}
                            </Link>
                          </TableCell>
                        );
                      })
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

export default withAuth(StoriesComponent);
