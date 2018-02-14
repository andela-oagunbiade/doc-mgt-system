const model = require('../models');

/**
 * Class AssessUsersController
 * To handle routing logic for documents route
 */
class AssessUsersController {
  /**
   * Method createAssessUser to create a user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static createAssessUser(request, response) {
    model.AssessUser.findOne({ where: { email: request.body.email } })
      .then((foundUser) => {
        if (foundUser) {
          return response.status(409)
            .send({ message: `${request.body.email} is already in use.` });
        }
        model.AssessUser.create(request.body)
          .then((newUser) => {
            return response.status(201)
              .send({ newUser });
          })
          .catch((error) => {
            return response.status(400)
              .send(error.errors);
          });
      });
  }
}

module.exports = AssessUsersController;
