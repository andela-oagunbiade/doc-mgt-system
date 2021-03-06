/* eslint no-console: "off" */

require('colors');
require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const homeRoute = require('./config/routes/index');
const docRoutes = require('./config/routes/document');
const userRoutes = require('./config/routes/user');
const roleRoutes = require('./config/routes/role');

const port = 8989;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', homeRoute);
app.use('/documents', docRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`.green);
});

module.exports = app;
