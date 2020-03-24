# HackApp Client

This is a React frontend application for managing hackathons.
It allows a hackathon manager to create a webpage with details about the hackathon,
which is listed on the app's dashboard. It also allows the manager to set up registration
questions. Regular users can log in to the website and sign up for hackathons by filling
out the registration forms.

## Running the Application

### Quick Start

If all you want to do is start running the application, go to [Hackapp](https://github.com/evscott/hackapp).

### For Frontend Development

If you want to be able to work on the frontend and iteratively test (i.e., you do not want to
restart a docker container for every commit), perform the following:

1. Pull down the backend using `git clone https://github.com/evscott/hackapp-api.git`.
2. `cd` into the backend directory and run `docker-compose up --build` to run the server on
`http://localhost:8080`. You should be able to go to `http://localhost:8080/api` in your
browser and see the API calls used by the application.
3. Pull down this frontend repository using `git clone https://github.com/evscott/hackapp-client.git`.
4. `cd` into the frontend directory and run `npm start`, which starts the app in development
mode.
5. Go to `http://localhost:9090` to use the app! The page will reload if you make edits. SInce
it will run in development mode, the console has all the Redux state changes.

## Documentation from `create-react-app`

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
