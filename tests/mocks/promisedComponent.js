'use strict';
module.exports = class PromisedComponent {
  constructor() {
    return {
      then: function(fn) {
        console.log ('2');
        fn();
      }
    };
  }
};
