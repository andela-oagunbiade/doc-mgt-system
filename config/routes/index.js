const router = require('express').Router();

router.route('/')
  .get((request, response) => {
    return response
      .status(200)
      .send({ message: 'Document Management System' });
  });

module.exports = router;
