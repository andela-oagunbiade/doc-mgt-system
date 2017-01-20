const router = require('express').Router();

const documentsController = require('../../app/controllers/document');
const auth = require('../../app/controllers/authentication');


router.route('/')
  .all(auth.verifyToken)
  .get(documentsController.getDocuments)
  .post(documentsController.createDocument);

router.route('/:id')
  .all(auth.verifyToken)
  .get(documentsController.getDocument)
  .put(documentsController.updateDocument)
  .delete(documentsController.deleteDocument);

module.exports = router;
