# umi-plugin-runtime-routes
Modify routes generated by umi at runtime.

## Install

```bash
yarn add umi-plugin-runtime-routes -D
```

## Usage

### 1. Define a routes `Modifier` function

Routes Modifier is a function used for modifying routes at runtime, its parameter is `routes` which is generated by umi, and return value should be the modified`routes`. 

You could define `Modifier` by yourself, also this plugin provides some built-in `helper` functions to help you to create Modifier easier.

For example, pick the `envHelper` from the built-in helper functions to create our sample Modifier:

```javascript
// routesModifer.js
import { helpers } from 'umi-plugin-runtime-routes';

const envHelper = helpers.envHelper;

export default function(routes) {
  // Maybe in your case, you are not using "window.currentEnv" at runtime, this is just a sample
  const modifiedRoutes = envHelper(routes, window.currentEnv);
  
  return modifiedRoutes;
}
```

### 2. Add extra information in `routes` option in `.umirc.js`

The added info will be passed at runtime to help you creating Modifer to modify `routes`, there is no limitation about how to add these info. In the example, the `envHelper` is picked, so let's add some environment info in `routes`:

```javascript
// .umirc.js

export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/user', redirect: '/user/login', env: ['foo', 'bar'] },
        { path: '/user/login', redirect: './user/login', env: ['bar'] },
      ],
    },
  ],
};
```

### 3. Configure plugin in `.umirc.js`

Configure this plugin in `.umirc.js`, make sure this plugin is configured before any others plugin which depends on routes, like [umi-plugin-mickey](https://github.com/mickeyjsx/umi-plugin-mickey).

```javascript
// .umirc.js
import routesModifer from './routesModifier';

export default {
  routes: [/* ... */];
  plugins: ['umi-plugin-runtime-routes', { modifier: routesModifier }],
};
```

## Options

#### options.modifier

`options.modifier ` could be a path string to the `Modifier` module or a `Modifier` function.

#### Modifer

A function used for modifying routes at runtime, like this:

```javascript
function routesModifier(routes) {
  const modifiedRoutes = // ... modify routes
  return modifiedRoutes;
}
```

To help you create Modifier function easier, this plugin provides some built-in helper functions, see it at below.

## Modifying helpers

All of the built-in helpers is exported at `helpers` variable.

### helpers.envHelper

Modify routes by the application running environment.

1\. Create modifier function

```javascript
import { helpers } from 'umi-plugin-runtime-routes';

function routesModifier(routes) {
  const modifiedRoutes = helpers.envHelper(routes, 'foo'); // 'foo' is current env
  return modifiedRoutes;
}
```

2\. Define routes:

```javascript
// .umirc.js

export default {
  routes: [
    { /* ... */, env: ['foo', 'bar'] } // add 'env' array at each route
  ]
};
```
