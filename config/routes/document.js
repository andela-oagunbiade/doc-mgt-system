const router = require('express').Router();

const documentsController = require('../../app/controllers/document');
const auth = require('../../app/controllers/authentication');


router.route('/')
  .get(auth.verifyToken, documentsController.getDocuments)
  .post(auth.verifyToken, documentsController.createDocument);

router.route('/:id')
  .get(auth.verifyToken, documentsController.getDocument)
  .put(auth.verifyToken, documentsController.updateDocument)
  .delete(auth.verifyToken, documentsController.deleteDocument);

module.exports = router;
