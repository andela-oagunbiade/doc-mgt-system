const model = require('../models');

class RolesController {

  /**
   * Method getRoles to obtain all roles
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} roles Object
   */
  static getRoles(request, response) {
    model.Role.findAll()
      .then((roles) => {
        return response.status(200)
          .send(roles);
      });
  }

  /**
   * Method createRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} roles Object
   */
  static createRole(request, response) {
    model.Role.create(request.body)
      .then((newRole) => {
        return response.status(201)
          .send(newRole);
      })
      .catch((error) => {
        return response.status(400)
          .send(error.errors);
      });
  }
}

module.exports = RolesController;
