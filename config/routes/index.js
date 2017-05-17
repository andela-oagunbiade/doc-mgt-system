const router = require('express').Router();

router.route('/')
  .get((request, response) => {
    return response
      .status(200)
      .send({ message: 'Welcome to Document Management System API.' });
  });

module.exports = router;
