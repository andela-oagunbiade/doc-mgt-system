const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'hello' });
});

// router.get('/about', (req, res) => {
//   res.status(200).json({ hello: 'This is our work'});
// });

module.exports = router;