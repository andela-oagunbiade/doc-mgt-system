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

}

module.exports = RolesController;
