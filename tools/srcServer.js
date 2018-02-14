/* eslint-disable no-console */

import 'colors';
import express from 'express';
import parser from 'body-parser';
import webpack from 'webpack';
import open from 'open';
import dotenv from 'dotenv';
import path from 'path';
import config from '../webpack.config';
import homeRoute from '../config/routes/index';
import docRoutes from '../config/routes/document';
import userRoutes from '../config/routes/user';
import roleRoutes from '../config/routes/role';
import assessUserRoutes from '../config/routes/assessUser';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
const apiRoute = '/api/v1';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(apiRoute, homeRoute);
app.use(`${apiRoute}/documents`, docRoutes);
app.use(`${apiRoute}/users`, userRoutes);
app.use(`${apiRoute}/roles`, roleRoutes);
app.use(`${apiRoute}/assessUsers`, assessUserRoutes);

// This returns an error page for undefined api routes
app.use(apiRoute, (request, response) => {
  return response
    .status(404)
    .send({
      error: 'Requested route does not exist.'
    });
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});


app.listen(port, (err) => {
  if (err) {
    console.log(`${err}`.red);
  } else {
    console.log(`Serving Client app on Port ${port}`.green);
    setTimeout(() => open(`http://localhost:${port}`), 1000);
  }
});
