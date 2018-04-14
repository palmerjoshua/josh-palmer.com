# josh-palmer.com
This is the code behind my website, [josh-palmer.com](https://josh-palmer.com). 

### Prior to Building
* Save your resume as a PDF, rename it `resume.pdf`, and put it in the `/assets` folder. Its full path should be `/assets/resume.pdf`.
* Some required files are not checked into Git, but I provided example files to act as templates.
Each example file has its own set of instructions for how to use it. It should be as easy as renaming the file and 
pasting your own data in it (if necessary).

### Requirements
* Node.js
* ReactJS
* [create-react-app](https://www.npmjs.com/package/create-react-app)
* See package.json for the other npm dependencies.

### Building
#### npm scripts
create-react-app should come with all the instructions for building, but here are the basics:

* `npm run-script prebuild` to base64 encode your resume.pdf and copy it into a Javascript file for your website to use.
* `npm start` to start the dev server. The website will load in the default browser and get updated automatically as you make changes.
* `npm run-script build` to build the production code. Final output gets saved to the `build` directory.

#### custom scripts
I added some Powershell scripts to make building the project a little simpler:

* `/scripts/build-dev.ps1` runs the `prebuild` script and starts the dev server.
* `/scripts/build-prod.ps1 [-serve]` runs the `prebuild` script and generates production ready code. 
    * Build production version without starting server: `/scripts/build-prod.ps1`
    * Build production version, and start the server: `/scripts/build-prod.ps1 -serve`
