const router = require('express').Router();

const rolesController = require('../../app/controllers/role');
const auth = require('../../app/controllers/authentication');

router.route('/')
  .get(auth.verifyToken, rolesController.getRoles)
  .post(auth.verifyToken, auth.adminAccess, rolesController.createRole);

router.route('/:id')
  .get(auth.verifyToken, auth.adminAccess, rolesController.getRole)
  .put(auth.verifyToken, auth.adminAccess, rolesController.updateRole)
  .delete(auth.verifyToken, auth.adminAccess, rolesController.deleteRole);

module.exports = router;
