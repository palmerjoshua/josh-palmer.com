### Overview
This is a ReactJS app. The result of building this project is a single page, static web application. To build
the backend API, read [the server readme](../server/README.md).

### Configuration
* config.js should have the correct URLs for the REST API. See the example file for details.

### CRA Scripts
create-react-app should come with all the instructions for building, but here are the basics:

* `npm run-script prebuild` to base64 encode your resume.pdf and copy it into a Javascript file for your website to use.
* `npm start` to start the dev server. The website will load in the default browser and get updated automatically as you make changes.
* `npm run-script build` to build the production code. Final output gets saved to the `build` directory.

### Custom Scripts
I added some Bash scripts to make building the project a little simpler:

* `/scripts/build-dev.sh` runs the `prebuild` script and starts the dev server.
* `/scripts/build-prod.sh [serve]` runs the `prebuild` script and generates production ready code. 
    * Build production version without starting server: `/scripts/build-prod.sh`
    * Build production version, and start the server: `/scripts/build-prod.sh serve`
