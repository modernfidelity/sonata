Sonata JS
=========

A simple web framework for object oriented javascript (ES6/ES7)

[![Build Status](https://travis-ci.org/modernfidelity/sonata.svg?branch=master)](https://travis-ci.org/modernfidelity/sonata)

## Installation

```
$ npm install -g sonata 
```
    
## Usage

Once installed the CLI tool will be available. 

This provides the following : 

```
$ sonata --help
```


```
$ sonata startproject [NAME]
```

Creates a project folder within the current directory


```
$ sonata startmodule [NAME]
```

Generates a JS module stub when called from within a project folder. 


## Project Structure

The Sonata CLI tool generators a project with the following files structure for you: 

```
$ sonata startproject myWebApp 
```

This will output : 


 - Created : myWebApp
 - Created : myWebApp/package.json
 - Created : myWebApp/app.js
 - Created : myWebApp/views
 - Created : myWebApp/models
 - Created : myWebApp/controllers
 - Created : myWebApp/builds
 - Created : myWebApp/routes
 - Created : myWebApp/routes/index.js

## In Progress

The following are currently being worked on : 

- Example files for the folders i.e. a default controller.js
- Traceur compiles of ES6 classes for project final builds
- improving folder stucture / layout


 
 


