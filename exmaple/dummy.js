'use strict';
const Initializer = require('esrol-initializer');
const initializer = new Initializer();

const foo = {
  priority: 1,
  component: function() {
    console.log('foo component is resolved');
  }
};

const promise = new Promise((resolve, reject) => {
  // some async stuff
  setTimeout(() => {
    resolve();
  }, 500);
});

promise.then(() => {
  console.log('promisified component is resolved');
});

const promisifiedComponent = {
  priority: 2,
  component: function() {
    console.log('promisified component is instantiated');
    return promise;
  }
};

const bar = {
  priority: 3,
  component: function() {
    console.log('bar component is resolved');
  }
};

const onResolvedComponents = function() {
  console.log('all components are resolved');
};

initializer.setCallback(onResolvedComponents);
initializer.registerComponent(promisifiedComponent);
initializer.registerComponent(foo);
initializer.registerComponent(bar);
initializer.instantiateComponents();
