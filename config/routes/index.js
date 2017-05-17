const router = require('express').Router();
const path = require('path');

router.route('/')
  .get((request, response) => {
    return response
      .status(200)
      .sendFile(path.join(__dirname, '../../src/index.html'));
  });

module.exports = router;
