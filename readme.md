[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

# esrol-initializer
An Initializer Class used for adding and initializing components. Priority must exist between them.

*Part of [Esrol](https://github.com/esrol/esrol)*

## Installation

```sh
$ npm install --save esrol-initializer
```

## Usage

```js
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

```

## Methods
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
<a name="setCallback"></a>
## setCallback(fn) ⇒ <code>boolean</code>
Set a callback which will be called when all components are
resolved.

**Returns**: <code>boolean</code> - true - on success
**Throws**:

- <code>error</code> error - if parameter is not a function


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


| Param | Type | Description |
| --- | --- | --- |
| component | <code>object</code> | holds two properties - { priority: 1, component: function() {} } |

<a name="instantiateComponents"></a>
## instantiateComponents()
Instantiate all components.

## Contriubtion

Any contribution will be highly appreciated. Just make sure that:

1. Your code works.  
2. You have 100% successful tests coverage.  
3. You have comments in your code.  
4. Follows eslint config. Exceptions are possible where that make sense.  


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
[travis-image]: https://travis-ci.org/esrol/esrol-initializer.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-initializer
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-initializer/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-initializer