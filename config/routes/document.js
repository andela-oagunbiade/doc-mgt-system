const router = require('express').Router();

const documentsController = require('../../app/controllers/document');
const auth = require('../../app/middlewares/authentication');


router.route('/')
  .all(auth.verifyToken)
  .get(documentsController.getDocuments)
  .post(documentsController.createDocument);

router.route('/:id')
  .all(auth.verifyToken)
  .get(documentsController.getDocument)
  .put(documentsController.updateDocument)
  .delete(documentsController.deleteDocument);

router.route('/search')
  .post(auth.verifyToken, documentsController.search);

module.exports = router;
