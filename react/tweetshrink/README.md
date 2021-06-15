---
name: Tweetshrink
topics: react, proptypes, testing, regular-expressions, decomposition
---

# Tweetshrink

This example is a React application that reduces the size of a small post -- like you
would write on Twitter -- by transforming the text. It has two versions,
[monolithic](monolithic/) and [decomposed](decomposed/).

The monolithic version uses one React component for the entire application. In
general, it is not a good idea to write applications this way, but it is easy
to do if you do not know how to decompose applications.

The decomposed version breaks the application into several components, each with
[React PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) for
typechecking.

Regular expressions are used to transform the text in this application. The
decomposed version has tests for the text transforms.

This application was created using [Create React App](https://github.com/facebookincubator/create-react-app)
and uses scripts from that project.

## Getting started

Make sure you have Node and NPM installed on your system.

Change directories into `monolithic/` or `decomposed/` to get to the application
version you want to show.

To install dependencies, run `npm install`.

To start the application, run `npm start`.

To run the tests, run `npm test`.

## Contributors

* Clinton Dreisbach
