# Frequently Asked Questions

A knowledge-base system about video games where users can post and answer questions.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Getting started
### Prerequisites

You need to have [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed in your machine

### Installing

First things first, here's how to clone the repository:

```
$ git clone https://github.coventry.ac.uk/5001CEM-1920SEPJAN/reisborw.git
```

After cloning the repository, run the following command in order to install all of the project's dependencies:

```
$ npm install
```

After that, make sure you create a `.env` file. This will be where you set your environment variables, such as the port you want the project to run.

For now, all you need to get the project working are two variables, `DB_NAME` and `SERVER_PORT`. For example:

```
SERVER_PORT=8080
DB_NAME=faq.db
```

Once these steps are taken, you're ready to run the program. Both of the following commands are acceptable:

```
$ node index.js
```

or

```
npm run start
```

## Running the tests

In this project you can run some different tests. These are:

### Unit tests

These tests will make sure every function in the project are working and throwing the appropriate errors when wrong data is provided. In order to achieve that, simply run:

```
$ npm run test
```

If you would like to see how long each individual test takes to run, simply run:

```
$ npm run test-verbose
```

### Acceptance tests

We also provide acceptance tests. These tests serve as a tool to make sure everything is also working in terms of UI. The following command will run these tests:

```
$ npm run cucumber
```

## JSDocs

We provide an easy way of creating and seeing documentation. By running the following command a new folder, `docs` will be generated. In that folder, you will be able to see all the available documentation for the project:

```
$ npm run jsdoc
```

## Built With

* [Koa](https://koajs.com/) - The web framework used) 

## Authors

* [**Avelino Tomas**](https://github.coventry.ac.uk/tomasa)
* [**Ben Townsend**](https://github.coventry.ac.uk/townse41)
* [**Kieran Dhir**](https://github.coventry.ac.uk/dhirk)
* [**Mihai Ene**](https://github.coventry.ac.uk/enem2)
* [**Olalekan Busari**](https://github.coventry.ac.uk/busario2)
* [**Wallef Borges**](https://github.coventry.ac.uk/reisborw)