import WebAPI from '../WebAPI';
import CONSTANTS from '../Constants';
import dispatcher from '../Dispatcher';

const Actions = {
  signIn(payload) {
    WebAPI.signin(payload)
      .then(json => {
        dispatcher.dispatch({
          action: CONSTANTS.SIGN_IN,
          data: json
        });
      })
      .catch(error => handleError(CONSTANTS.SIGN_IN, error));
  },

  createStory(payload) {
    WebAPI.storiesCreate(payload)
      .then(json => {
        dispatcher.dispatch({
          action: CONSTANTS.CREATE_STORY,
          data: json
        });
      })
      .catch(error => handleError(CONSTANTS.CREATE_STORY, error));
  },

  storiesIndex() {
    WebAPI.storiesIndex()
      .then(json => {
        dispatcher.dispatch({
          action: CONSTANTS.GET_STORIES,
          data: json
        });
      })
      .catch(error => handleError(CONSTANTS.GET_STORIES, error));
  },

  storiesShow(id) {
    WebAPI.storiesShow(id)
      .then(json => {
        dispatcher.dispatch({
          action: CONSTANTS.GET_STORY,
          data: json
        });
      })
      .catch(error => handleError(CONSTANTS.GET_STORY, error));
  },

  storiesUpdate(payload) {
    WebAPI.storiesUpdate(payload)
      .then(json => {
        dispatcher.dispatch({
          action: CONSTANTS.UPDATE_STORY,
          data: json
        });
      })
      .catch(error => handleError(CONSTANTS.UPDATE_STORY, error));
  }
};

const handleError = (action, error) => {
  console.log('ERROR HANDLER', action, error);

  dispatcher.dispatch({
    action: action + '_ERROR',
    error: error.error
  });
};

export default Actions;
