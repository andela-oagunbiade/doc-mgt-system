const router = require('express').Router();

const usersController = require('../../app/controllers/user');
const documentsController = require('../../app/controllers/document');
const auth = require('../../app/middlewares/authentication');

router.route('/')
  .get(auth.verifyToken, auth.adminAccess, usersController.getUsers)
  .post(usersController.createUser);

router.route('/:id')
  .get(auth.verifyToken, usersController.getUser)
  .put(auth.verifyToken, usersController.updateUser)
  .delete(auth.verifyToken, usersController.deleteUser);

router.route('/:id/documents')
  .get(auth.verifyToken, documentsController.getUserDocuments);

router.route('/login')
  .post(usersController.login);

router.route('/logout')
  .post(usersController.logout);

module.exports = router;
