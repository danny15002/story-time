import CONSTANTS from '../Constants';
import dispatcher from '../Dispatcher';
import EventEmitter from 'events';

const resources = {};
try {
  resources.activeUser = JSON.parse(localStorage.getItem('user'));
} catch (e) {
  // do nothing
}

class StoreClass extends EventEmitter {
  constructor() {
    super();
  }

  addEventListener(action, callback) {
    this.on(action, callback);
  }

  removeEventListener(action, callback) {
    this.removeListener(action, callback);
  }

  getActiveUser() {
    return resources.activeUser;
  }

  getActiveStory() {
    return resources.activeStory;
  }

  getStories() {
    return resources.stories;
  }

  clearResources() {
    delete resources.activeUser;
    delete resources.activeStory;
    delete resources.stories;
  }

  getCachedStory(id) {
    let idx = 0;
    while (idx < resources.stories.length && resources.stories[idx].id != id)
      idx++;

    return resources.stories[idx];
  }
}

const Store = new StoreClass();

dispatcher.register(payload => {
  const { action, data } = payload;

  switch (action) {
    case CONSTANTS.SIGN_IN:
      resources.activeUser = data;
      localStorage.setItem('user', JSON.stringify(data));
      Store.emit(action);
      break;
    case CONSTANTS.CREATE_STORY:
      resources.activeStory = data;
      Store.emit(action);
      break;
    case CONSTANTS.GET_STORY:
      resources.activeStory = data;
      Store.emit(action);
      break;
    case CONSTANTS.UPDATE_STORY:
      emulateUpdate(data);
      Store.emit(action);
      break;
    case CONSTANTS.GET_STORIES: {
      const activeUser = resources.activeUser;

      if (activeUser.role === 'Admin')
        resources.stories = data;
      else
        resources.stories = data.filter(s => s.createdBy === activeUser.id);

      Store.emit(action);
    }
  }
});

function emulateUpdate(story) {
  let idx = 0;
  while (resources.stories[idx].id != story.id)
    idx++;

  resources.stories[idx] = story;
}

export default Store;
