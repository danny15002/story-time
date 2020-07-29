import CONSTANTS from '../Constants';
import dispatcher from '../Dispatcher';
import EventEmitter from 'events';

const resources = {};

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
}

const Store = new StoreClass();

dispatcher.register(payload => {
  const { action, data } = payload;
  console.log('STORE', action, data);

  switch (action) {
    case CONSTANTS.SIGN_IN:
      resources.activeUser = data;
      Store.emit(action);
      break;
    case CONSTANTS.CREATE_STORY:
      resources.activeStory = data;
      Store.emit(action);
      break;
  }
});

export default Store;
