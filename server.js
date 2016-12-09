const express = require('express');
const parser = require('body-parser');
const routes = require('./config/routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
