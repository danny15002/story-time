# Story Time!
To start up app for the first time use the following commands:
```
$ npm install
$ npm run start
```
The app will run on port 8080

## Assumptions

The API automatically sets  estimated hours and cost to 0 so I assumed this was a bug or unfinished code. The new story form still expects all fields to be inputted.

The API does not provide a method to update stories so Admins only edit cached stories in memory. To prevent overcomplicating the story retrieval logic, reloading the `/stories/:id` path will redirect an admin to `/stories` so the stories can be reloaded from the server.

Once stories are in memory, if logged in as admin, they are never retrieved again. It is assumed this would not happen in a production application since the data would refreshed when an update is knowingly made.

I did realize that I could have loaded all of the stories to a store from the initial app load and then relied on that instead of the API for future data retrieval, but I wanted to stick as closely as possible to how I would lay out an application with a fully functional API which means I would be calling for fresh data on every page load unless I had knowledge of how reliable a cache could be. 
