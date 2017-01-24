const router = require('express').Router();

const rolesController = require('../../app/controllers/role');
const auth = require('../../app/controllers/authentication');

router.route('/')
  .all(auth.verifyToken, auth.adminAccess)
  .get(rolesController.getRoles)
  .post(rolesController.createRole);

router.route('/:id')
  .all(auth.verifyToken, auth.adminAccess)
  .get(rolesController.getRole)
  .put(rolesController.updateRole)
  .delete(rolesController.deleteRole);

module.exports = router;
