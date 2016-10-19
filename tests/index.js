const test = require('ava');
const webpack = require('webpack');
const fs = require('fs');
const {build} = require('vue-webpack');
const {VueBuilder, VueRender} = require('../src');

test('VueBuilder.prototype.build', async (t) => {
  let config = build({
    env: 'development',
    mode: 'client',
    manifest: true,
    inputFilePath: './assets/app/client-entry.js',
    outputFileName: 'bundle',
    outputPath: '../dist/client',
    publicPath: '/assets/',
  });
  let builder = new VueBuilder(config);
  await builder.build();

  t.is(fs.existsSync('../dist/client/images/logo.png'), true);
  t.is(fs.existsSync('../dist/client/bundle.js'), true);
  t.is(fs.existsSync('../dist/client/bundle.css'), true);
  t.is(fs.existsSync('../dist/client/bundle.js.map'), true);
  t.is(fs.existsSync('../dist/client/bundle.css.map'), true);
});

test('VueBuilder.prototype.render()', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: './assets/app/server-entry.js',
    outputFileName: 'bundle',
    outputPath: '../dist/server'
  });
  let builder = new VueBuilder(config);
  let source = await builder.render();

  t.is(source.indexOf('module.exports=f'), 0);
});

test('VueRender.prototype.renderToStream()', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: './assets/app/server-entry.js',
    outputFileName: 'bundle',
    outputPath: '../dist/server'
  });
  let builder = new VueBuilder(config);
  let source = await builder.render();
  let render = new VueRender({source});
  let stream = render.renderToStream();

  t.is(!!stream.pipe, true);
});

test('VueRender.prototype.renderToString()', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: './assets/app/server-entry.js',
    outputFileName: 'bundle',
    outputPath: '../dist/server'
  });
  let builder = new VueBuilder(config);
  let source = await builder.render();
  let render = new VueRender({source});
  let html = await render.renderToString();

  t.is(typeof html, 'string');
  t.is(html.indexOf('<div id="app" server-rendered="true">'), 0);
});
