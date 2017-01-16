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

  /**
   * Method getRole to obtain the role for a specific user
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response message
   */
  static getRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) return response.status(404)
          .send({ message: `Ǹo role with id: ${request.params.role}` });

        return response.status(200)
          .send(role);
      });
  }
}

module.exports = RolesController;
