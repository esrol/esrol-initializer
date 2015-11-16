'use strict';
let Errors = require('xena-errors');
let debug = require('debug')('Initializer');

module.exports = class Initializer {
  
  constructor() {
    this._runProcedure();
  }

  setCallback(fn) {
    if (typeof fn !== 'function') {
      this._Errors.error(`${typeof fn} given`, 2);
    }
    this._callbackOnAllResolved = fn;
    return true;
  }

  registerComponent(component) {
    if (!component) {
      this._Errors.error(`${typeof component} given`, 1);
    }
    if (!Number.isInteger(component.priority)) {
      this._Errors.error(`${typeof component.priority} given for priority`, 1);
    }  
    if (typeof component.component !== 'function') {
      this._Errors.error(`${typeof component.component} given for component`, 1);
    }  
    this._components.push(component);
    this._sortComponents();
    return true;
  }

  instantiateComponents() {
    let length = this._components.length;
    for (let index = 0; index < length; index++) {
      this._instantiateComponent(this._components[index].component);
    }
  }

  _instantiateComponent(component) {
    debug('Initializing component: %s', component.name);
    this._resolveComponent(new component());
  }

  _resolveComponent(component) {
    if (this._isComponentPromisified(component)) {
      return this._resolvePromisifiedComponent(component);
    }
    return this._onResolvedComponent();
  }

  _isComponentPromisified(component) {
    if (component && typeof component.then === 'function') {
      return true;
    } 
    return false;
  }

  _resolvePromisifiedComponent(component) {
    component.then(() => {
      this._onResolvedComponent();
    });
  }

  _onResolvedComponent() {
    this._resolvedComponents++;
    if (this._resolvedComponents === this._components.length) {
      this._onAllResolved();
    }
  }

  _onAllResolved() {
    if (this._callbackOnAllResolved) {
      this._callbackOnAllResolved();
    }
  }

  _runProcedure() {
    this._initializeProperties();
    this._factory(); 
    this._registerErrors();   
  }

  _factory() {
    this._Errors = new Errors();
  }

  _initializeProperties() {
    this._resolvedComponents = 0;
    this._Errors = {};
    this._components = [];
    this._callbackOnAllResolved = null;
  }

  _sortComponents() {
    this._components.sort((a, b) => {
      return b.priority < a.priority;
    });
  }

  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      1,
      'registerComponent expects object as param, holding 2 properties:'
      + ' 1) priority: {integer} - this will determine the order of execution'
      + ' (lower win)'
      + ' 2) component: {fn} - the component function that needs to be executed'
      + ' Note: the component function will be instantiated with "new" as class'
    );
    this._Errors.registerErrorWithNumber(
      2,
      'setCallback expects callback {function} as param,'
      + ' which will be called,' 
      + ' when all components are instantiated and resolved'
    );
  }

};
