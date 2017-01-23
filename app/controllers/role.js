const model = require('../models');

/**
 * Class RolesController
 * To handle routing logic for roles route
 */
class RolesController {

  /**
   * Method getRoles to obtain all roles
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
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
   * @return {Object} response Object
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
   * @return {Object} response Object
   */
  static getRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
          .send({ message: `Ǹo role with id: ${request.params.role}` });
        }
        return response.status(200)
          .send(role);
      });
  }

  /**
   * Method updateRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response object
   */
  static updateRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
          .send({ message: `Ǹo role with id: ${request.params.role}` });
        }

        role.update(request.body)
          .then((updatedRole) => {
            return response.status(202)
              .send(updatedRole);
          });
      });
  }

  /**
   * Method deleteRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response object
   */
  static deleteRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
          .send({ message: `Ǹo role with id: ${request.params.role}` });
        }

        role.destroy()
          .then(() => {
            return response.status(202)
              .send({ message: 'Succesfully deleted role' });
          });
      });
  }
}

module.exports = RolesController;
