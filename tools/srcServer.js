import 'colors';
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';
import dotenv from 'dotenv';
dotenv.config();

/* eslint-disable no-console */
const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(`${err}`.red);
  } else {
    console.log(`Serving Client app on Port ${port}`.green);
    setTimeout(() => open(`http://localhost:${port}`), 1000);
  }
});