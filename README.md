# MQTT WebClient

This is a Web Client for communicating with MQTT brokers.

You can try it in **[Codesandbox](https://githubbox.com/rangyal/mqtt-webclient)**.

## Installation

Before you can start, build, and test the application, you need to install the necessary packages. To do this, navigate to the project directory in your terminal and run the following command:

    yarn install

## Start

To start the application, run the following command:

    yarn start

This will start the development server and you can access the application in your browser at http://localhost:3000/.

## Build

To build the application for production, run the following command:

    yarn build

This will create a production-ready version of the application in the `build` directory.

## Test

To run the test suite for the application, run the following command:

    yarn test --watchAll=false

## Docker

To serve the application build in Docker, run the following commands:

    docker build -t mqtt-webclient .
    docker run -p 3000:3000 mqtt-webclient

This will build a docker image and start a container that serves the production build. You can access it in your browser at http://localhost:3000/.
