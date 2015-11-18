'use strict';
let Initializer = require('esrol-initializer');
let initializer = new Initializer();

let foo = {
  priority: 1,
  component: function() {
    console.log('foo component is resolved');        
  }
};

let promise = new Promise((resolve, reject) => {
  // some async stuff
  setTimeout(() => {    
    resolve();
  }, 500);
});

promise.then(() => {
  console.log('promisified component is resolved');
});

let promisifiedComponent = {
  priority: 2,
  component: function() {
    console.log('promisified component is instantiated');
    return promise;
  }
};

let bar = {
  priority: 3,
  component: function() {
    console.log('bar component is resolved');  
  }
};

let onResolvedComponents = function() {
  console.log('all components are resolved');
};

initializer.setCallback(onResolvedComponents);
initializer.registerComponent(promisifiedComponent);
initializer.registerComponent(foo);
initializer.registerComponent(bar);
initializer.instantiateComponents();
