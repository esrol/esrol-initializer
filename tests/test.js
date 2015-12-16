'use strict';
let expect = require('chai').expect;
let Initializer = require('../index.js');
let initializer = new Initializer();
let mocks = require ('./mocks/index');
require('mocha-sinon');

describe('Initializer Success...', () => {

  describe('When registerComponent', () => {
    it('Should return true on success', () => {
      expect(initializer.registerComponent(mocks.lastComponent))
      .to.be.true;
      expect(initializer.registerComponent(mocks.promisedComponent))
      .to.be.true;
      expect(initializer.registerComponent(mocks.firstComponent))
      .to.be.true;
    });
  });

  describe('When set a callback fn', () => {
    it('Should return true', () => {
      expect(initializer.setCallback(mocks.onAllResolved)).to.be.true;
    });
  });

  describe('When instantiateComponents is called, must output 1, 2, 3', () => {
    beforeEach(function() { this.sinon.stub(console, 'log'); });
    it('Should output "1", "2", "3" and "callback called"', () => {
      initializer.instantiateComponents();
      expect( console.log.calledWith('1') ).to.be.true;
      expect( console.log.calledWith('2') ).to.be.true;
      expect( console.log.calledWith('3') ).to.be.true;
      expect( console.log.calledWith('callback called') ).to.be.true;
    });
  });

});

describe('Initializer without callback', () => {
  let init = new Initializer();
  init.registerComponent(mocks.lastComponent);
  beforeEach(function() { this.sinon.stub(console, 'log'); });
  it('Should console.log from "lastComponent"', () => {
      init.instantiateComponents();
      expect( console.log.calledWith('3') ).to.be.true;
  });
});



describe('Initializer Fail...', () => {

  let should = 'Throw an error';

  describe('When registerComponent with no argument', () => {
    it(should, () => {
      expect(() => {
        initializer.registerComponent();
      }).to.throw(Error);
    });
  });

  describe('When registerComponent with non object as argument', () => {
    it(should, () => {
      expect(() => {
        initializer.registerComponent(() => {});
      }).to.throw(Error);
    });
  });

  describe('When registerComponent without priority property', () => {
    it(should, () => {
      expect(() => {
        initializer.registerComponent({component: () => {}});
      }).to.throw(Error);
    });
  });

  describe('When registerComponent without component property', () => {
    it(should, () => {
      expect(() => {
        initializer.registerComponent({priority: () => {}});
      }).to.throw(Error);
    });
  });

  describe('When registerComponent with non fn as component property', () => {
    it(should, () => {
      expect(() => {
        initializer.registerComponent({priority: 2, component: 'string'});
      }).to.throw(Error);
    });
  });

  describe('When setCallback is called with non function as argument', () => {
    it(should, () => {
      expect(() => { initializer.setCallback({}); }).to.throw(Error);
    });
  });

});