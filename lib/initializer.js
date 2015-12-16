/**
 * @author Ivaylo Ivanov
 * @public
 * @class Initializer
 * @description An Initializer Class used for adding and initializing
 * components. Priority must exist between them.
 * @requires esrol-errors
 * @requires debug
 */
'use strict';
let Errors = require('esrol-errors');
let debug = require('debug')('Initializer');

module.exports = class Initializer {

  /**
  * @private
  * @method constructor
  * @description Runs _runProcedure private method
  * @see {@link _runProcedure}
  */
  constructor() {
    this._runProcedure();
  }

  /**
  * @public
  * @method setCallback
  * @description Set a callback which will be called when all components are
  * resolved.
  * @param {function} fn - the callback function that needs to be executed
  * when all components are resolved
  * @throws {error} error - if parameter is not a function
  * @returns {boolean} true - on success
  */
  setCallback(fn) {
    if (typeof fn !== 'function') {
      this._Errors.error(`${typeof fn} given`, 2);
    }
    this._callbackOnAllResolved = fn;
    return true;
  }

  /**
  * @public
  * @method registerComponent
  * @description Register a new component object. Re-sort (re-prioritize)
  * components with the new one.
  * @param {object} component - holds two properties - { priority: 1,
  * component: function() {} }
  * @throws {error} error - if component object isn't as expected
  * @returns {boolean} true - on success
  */
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

  /**
  * @public
  * @method instantiateComponents
  * @description Instantiate all components.
  */
  instantiateComponents() {
    let length = this._components.length;
    for (let index = 0; index < length; index++) {
      this._instantiateComponent(this._components[index].component);
    }
  }

  /**
  * @private
  * @method _instantiateComponent
  * @description Initialize current component.
  * @param {object} component - holds two properties - { priority: 1,
  * component: function() {} }
  */
  _instantiateComponent(component) {
    debug('Initializing component: %s', component.name);
    this._resolveComponent(new component());
  }

  /**
  * @private
  * @method _resolveComponent
  * @description Resolve component if it's not a promise, otherwise
  * resolve it as a promise.
  * @param {mixin} returnedValueFromComponent
  */
  _resolveComponent(returnedValueFromComponent) {
    if (this._isComponentPromisified(returnedValueFromComponent)) {
      return this._resolvePromisifiedComponent(returnedValueFromComponent);
    }
    this._onResolvedComponent();
  }

  /**
  * @private
  * @method _isComponentPromisified
  * @description Cheks if there is a promise to fulfill.
  * @param {mixin} returnedValueFromComponent
  * @returns {boolean} true or false - true if it is a promise, false
  * if it isn't
  */
  _isComponentPromisified(returnedValueFromComponent) {
    if (returnedValueFromComponent
      && typeof returnedValueFromComponent.then === 'function') {
      return true;
    }
    return false;
  }

  /**
  * @private
  * @method _resolvePromisifiedComponent
  * @description Resolve the returned promise from the component.
  * @param {object} promise - promise
  */
  _resolvePromisifiedComponent(promise) {
    promise.then(() => {
      this._onResolvedComponent();
    });
  }

  /**
  * @private
  * @method _onResolvedComponent
  * @description Called when a component is resolved.
  * Checks if all components have been resolved and if so, go to _onAllResolved.
  */
  _onResolvedComponent() {
    this._resolvedComponents++;
    if (this._resolvedComponents === this._components.length) {
      this._onAllResolved();
    }
  }

  /**
  * @private
  * @method _onAllResolved
  * @description Check if there is a callback and if so, call it.
  */
  _onAllResolved() {
    if (this._callbackOnAllResolved) {
      this._callbackOnAllResolved();
    }
  }

  /**
  * @private
  * @method _runProcedure
  * @description Run methods.
  */
  _runProcedure() {
    this._initializeProperties();
    this._factory();
    this._registerErrors();
  }

  /**
  * @private
  * @method _factory
  * @description Initialize the Errors class
  */
  _factory() {
    this._Errors = new Errors();
  }

  /**
  * @private
  * @method _initializeProperties
  * @description Initializes the properties of the class.
  */
  _initializeProperties() {
    this._resolvedComponents = 0;
    this._Errors = {};
    this._components = [];
    this._callbackOnAllResolved = null;
  }

  /**
  * @private
  * @method _sortComponents
  * @description Sort the components by priority.
  */
  _sortComponents() {
    this._components.sort((a, b) => {
      return b.priority < a.priority;
    });
  }

  /**
  * @private
  * @method _registerErrors
  * @description Register errors in the errors class.
  */
  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      'registerComponent expects object as param, holding 2 properties:'
      + ' 1) priority: {integer} - this will determine the order of execution'
      + ' (lower win)'
      + ' 2) component: {fn} - the component function that needs to be executed'
      + ' Note: the component function will be instantiated with "new" as class',
      1
    );
    this._Errors.registerErrorWithNumber(
      'setCallback expects callback {function} as param,'
      + ' which will be called,'
      + ' when all components are instantiated and resolved',
      2
    );
  }

};
