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

  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getAssessUsers(request, response) {
    model.AssessUser.findAll({
      attributes: [
        'id',
        'name',
        'phoneNumber',
        'email',
        'relationship',
        'createdAt',
        'updatedAt'
      ]
    }).then((users) => {
      if (users.length === 0) {
        return response.status(404).send({ message: 'No user found.' });
      }
      return response.status(200)
        .send(users);
    });
  }
}

module.exports = AssessUsersController;
