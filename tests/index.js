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
    inputFilePath: `${__dirname}/assets/app/client-entry.js`,
    outputFileName: 'bundle',
    outputPath: `${__dirname}/../dist/client`,
    publicPath: '/assets/',
  });

  let builder = new VueBuilder(config);
  await builder.build();

  t.is(fs.existsSync(`${__dirname}/../dist/client/images/logo.png`), true);
  t.is(fs.existsSync(`${__dirname}/../dist/client/bundle.js`), true);
  t.is(fs.existsSync(`${__dirname}/../dist/client/bundle.css`), true);
  t.is(fs.existsSync(`${__dirname}/../dist/client/bundle.json`), true);
});

test('VueBuilder.prototype.compile', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: `${__dirname}/assets/app/server-entry.js`,
    outputFileName: 'bundle',
    outputPath: `${__dirname}/../dist/server`
  });
  let builder = new VueBuilder(config);
  let source = await builder.compile();

  t.is(source.indexOf('module.exports=f'), 0);
});

test('VueRender.prototype.renderToStream', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: `${__dirname}/assets/app/server-entry.js`,
    outputFileName: 'bundle',
    outputPath: `${__dirname}/../dist/server`
  });
  let builder = new VueBuilder(config);
  let source = await builder.compile();
  let render = new VueRender(source);
  let stream = render.renderToStream();

  t.is(!!stream.pipe, true);
});

test('VueRender.prototype.renderToString', async (t) => {
  let config = build({
    env: 'production',
    mode: 'server',
    manifest: true,
    inputFilePath: `${__dirname}/assets/app/server-entry.js`,
    outputFileName: 'bundle',
    outputPath: `${__dirname}/../dist/server`
  });
  let builder = new VueBuilder(config);
  let source = await builder.compile();
  let render = new VueRender(source);
  let html = await render.renderToString();

  t.is(typeof html, 'string');
  t.is(html.indexOf('<div id="app" server-rendered="true">'), 0);
});
