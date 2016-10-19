![Build Status](https://travis-ci.org/xpepermint/vue-builder.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/contextable.svg)](https://badge.fury.io/js/contextable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/vue-builder.svg)](https://gemnasium.com/xpepermint/vue-builder)

# [vue](http://vuejs.org)-[builder](https://webpack.github.io)

> Server-side and client-side rendering for Vue.js.

<img src="logo.png" height="60" style="margin-bottom: 20px" />

This package provides tools for rendering [Vue.js](http://vuejs.org) applications server-side and client-side using the [Webpack](https://webpack.github.io) module bundler.

This is an open source package for [Vue.js](http://vuejs.org/). The source code is available on [GitHub](https://github.com/xpepermint/vue-builder) where you can also find our [issue tracker](https://github.com/xpepermint/vue-builder/issues).

## Related Projects

* [vue-webpack](https://github.com/xpepermint/vue-webpack): Webpack configuration object generator for Vue.js.
* [express-vue-builder](https://github.com/xpepermint/express-vue-builder): Vue.js server-side and client-side rendering middleware for Express.js.

## Install

Run the command below to install the package.

```
$ npm install --save-dev vue-builder babel-core babel-loader babel-preset-es2015 babel-preset-stage-2 css-loader extract-text-webpack-plugin@2.0.0-beta.4 file-loader postcss-cssnext vue vue-loader vue-server-renderer vuex webpack@2.1.0-beta.25 webpack-hot-middleware webpack-manifest-plugin
```

## Usage

Start by creating the Webpack configuration object. Here we use the [vue-webpack](https://github.com/xpepermint/vue-webpack) package to create one.

```js
import {build} from 'vue-webpack';

let config = build({
  env: process.env.NODE_ENV || 'development',
  mode: 'server',
  inputFilePath: './src/client/server-entry.js',
  outputPath: './dist'
});
```

Create a `builder` instance.

```js
import webpack from 'webpack';

let compiler = webpack(config);
```

Create a new builder instance and render the application.

```js
import {VueBuilder} from 'vue-builder';

let builder = new VueBuilder({compiler});

builder.renderToString((html) => {}); // rendered application code as string
```

## API

**VueBuilder(config)**

> Core class for building server-side and client-side bundles.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| config | Object | Yes | - | Webpack configuration object.

**VueRender({source})**

> Core class for server-side application rendering.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| source | String | Yes | - | Bundle source code.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
