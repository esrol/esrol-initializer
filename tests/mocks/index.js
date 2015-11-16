'use strict';
let firstComponent = require ('./firstComponent');
let lastComponent = require ('./lastComponent');
let promisedComponent = require ('./promisedComponent');
let onAllResolved = require ('./onAllResolved');
module.exports = {
  onAllResolved: onAllResolved,
  firstComponent: {
    priority: 1,
    component: firstComponent
  },
  lastComponent: {
    priority: 3,
    component: lastComponent
  },
  promisedComponent: {
    priority: 2,
    component: promisedComponent
  }
};
