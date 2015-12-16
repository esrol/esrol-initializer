[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# esrol-initializer
An Initializer Class used for adding and initializing components. Priority must exist between them.


## Installation

```sh
$ npm install --save esrol-initializer
```

## Usage

```js
'use strict';
let Initializer = require('../lib/initializer');
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
```

## Classes
<dl>
<dt><a href="#Initializer">Initializer</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#setCallback">setCallback(fn)</a> ⇒ <code>boolean</code></dt>
<dd><p>Set a callback which will be called when all components are
resolved.</p>
</dd>
<dt><a href="#registerComponent">registerComponent(component)</a> ⇒ <code>boolean</code></dt>
<dd><p>Register a new component object. Re-sort (re-prioritize)
components with the new one.</p>
</dd>
<dt><a href="#instantiateComponents">instantiateComponents()</a></dt>
<dd><p>Instantiate all components.</p>
</dd>
</dl>
<a name="Initializer"></a>
## Initializer
**Kind**: global class  
**Access:** public  
**Author:** Ivaylo Ivanov  
<a name="new_Initializer_new"></a>
### new Initializer()
An Initializer Class used for adding and initializing
components. Priority must exist between them.

<a name="setCallback"></a>
## setCallback(fn) ⇒ <code>boolean</code>
Set a callback which will be called when all components are
resolved.

**Returns**: <code>boolean</code> - true - on success  
**Throws**:

- <code>error</code> error - if parameter is not a function

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the callback function that needs to be executed when all components are resolved |

<a name="registerComponent"></a>
## registerComponent(component) ⇒ <code>boolean</code>
Register a new component object. Re-sort (re-prioritize)
components with the new one.

**Returns**: <code>boolean</code> - true - on success  
**Throws**:

- <code>error</code> error - if component object isn't as expected

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>object</code> | holds two properties - { priority: 1, component: function() {} } |

<a name="instantiateComponents"></a>
## instantiateComponents()
Instantiate all components.

**Access:** public  

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](https://github.com/esrol/esrol-initializer/blob/master/LICENSE)


[npm-image]: https://badge.fury.io/js/esrol-initializer.svg
[npm-url]: https://npmjs.org/package/esrol-initializer
[travis-image]: https://travis-ci.org/ivaylopivanov/esrol-initializer.svg?branch=master
[travis-url]: https://travis-ci.org/ivaylopivanov/esrol-initializer
[daviddm-image]: https://david-dm.org/ivaylopivanov/esrol-initializer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ivaylopivanov/esrol-initializer
[coveralls-image]: https://coveralls.io/repos/ivaylopivanov/esrol-initializer/badge.svg
[coveralls-url]: https://coveralls.io/r/ivaylopivanov/esrol-initializer