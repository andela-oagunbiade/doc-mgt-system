const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.send({ message: 'hello' });
  });

module.exports = router;
