'use strict';
let Errors = require('xena-errors');
let Logger = require('xena-logger');

module.exports = class Initializer {
  
  constructor() {
    this._runProcedure();
  }

  registerComponent(component) {
    this._components.push(component)
  }

  instantiateComponents() {
    let length = this._components.length;
    for (let index = 0; index < length; index++) {
      this._instantiateComponent(this._components[index]);
    }
  }

  _instantiateComponent(component) {
    this._Logger.debug('Initializing component: %s', component.name);
  }

  _runProcedure() {
    this._initializeProperties();
    this._factory(); 
    this._registerErrors();   
  }

  _factory() {
    this._Errors = new Errors();
    this._Logger = new Logger('initializer');
  }

  _initializeProperties() {
    this._Errors = {};
    this._Logger = {};
    this._components = [];
  }

  _registerErrors() {
    
  }

};
