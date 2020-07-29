import Store from '../Store';

const URL = 'http://localhost:3000/api';

class WebAPIClass {
  constructor(resource) {
    this.resource = resource;
  }

  signin(payload) {
    const url = `${URL}/v1/signIn`;

    return request(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  storiesIndex(query = {}) {
    const url = `${URL}/v1/stories`;

    return request(url, {
      method: 'GET'
    });
  }

  storiesCreate(payload) {
    const url = `${URL}/v1/stories`;

    return request(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  storiesShow(id) {
    const url = `${URL}/v1/stories`;

    return request(url, {
      method: 'GET'
    });
  }
}

function request(url, options = {}) {
  // options.credentials = 'include';
  options.headers = {
    'Content-Type': 'application/json'
  };

  const activeUser = Store.getActiveUser();
  if (activeUser)
    options.headers.Authorization = `Bearer ${Store.getActiveUser().token}`;

  return fetch(url, options)
    .then(response => response.json())
    .catch(error => {
      console.log('ERROR DURING FETCH', url, options, error);
      return error;
    });
}

const WebAPI = new WebAPIClass();
export default WebAPI;
