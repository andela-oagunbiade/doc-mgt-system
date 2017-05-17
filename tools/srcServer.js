/* eslint-disable no-console */

import 'colors';
import express from 'express';
import parser from 'body-parser';
import webpack from 'webpack';
import open from 'open';
import dotenv from 'dotenv';
import config from '../webpack.config';
import homeRoute from '../config/routes/index';
import docRoutes from '../config/routes/document';
import userRoutes from '../config/routes/user';
import roleRoutes from '../config/routes/role';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', homeRoute);
app.use('/documents', docRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// This returns an error page for undefined routes
app.use((request, response) => {
  return response
    .status(404)
    .send({
      error: 'Requested route does not exist yet. Check back later.'
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(`${err}`.red);
  } else {
    console.log(`Serving Client app on Port ${port}`.green);
    setTimeout(() => open(`http://localhost:${port}`), 1000);
  }
});