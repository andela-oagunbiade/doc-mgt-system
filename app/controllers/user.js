const jwt = require('jsonwebtoken');
const model = require('../models');

const secret = process.env.SECRET_TOKEN || 'secret';

// To create text-friendly user details
const formattedUser = (user) => {
  const userDetails = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    RoleId: user.RoleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return userDetails;
};

/**
 * Class UsersController
 * To handle routing logic for documents route
 */
class UsersController {

  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getUsers(request, response) {
    model.User.findAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'RoleId',
        'createdAt',
        'updatedAt'
      ]
    }).then((users) => {
      return response.status(202)
        .send(users);
    });
  }

  /**
   * Method createUser to create a user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static createUser(request, response) {
    model.User.findOne({ where: { email: request.body.email } })
      .then((foundUser) => {
        if (foundUser) return response.status(409)
            .send({ message: `Unable to create user. This mail:
              ${request.body.email} is already in use` });

        model.User.create(request.body)
          .then((newUser) => {
            const token = jwt.sign({
              UserId: newUser.id,
              RoleId: newUser.RoleId
            }, secret, { expiresIn: '2 days' });

            newUser = formattedUser(newUser);
            return response.status(201)
              .send({ newUser, token, expiresIn: '2 days' });
          })
          .catch((error) => {
            return response.status(400)
              .send(error.errors);
          });
      });
  }

  /**
   * Method getUser to get a single user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static getUser(request, response) {
    model.User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) return response.status(404)
          .send({ message: `Ǹo user with id: ${request.params.id}` });

        foundUser = formattedUser(foundUser);
        return response.send(foundUser);
      });
  }

  /**
   * Method updateUser
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static updateUser(request, response) {
    model.User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) return response.status(404)
          .send({ message: `Ǹo user with id: ${request.params.id}` });

        foundUser.update(request.body)
          .then((updatedUser) => {
            updatedUser = formattedUser(updatedUser);
            return response.status(202)
              .send(updatedUser);
          });
      });
  }

  /**
   * Method deleteUser to delete a single user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static deleteUser(request, response) {
    model.User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) return response.status(404)
          .send({ message: `Ǹo user with id: ${request.params.id}` });

        foundUser.destroy()
          .then(() => {
            return response.status(202)
              .send({ message: 'User succesfully deleted' });
          });
      });
  }

  /**
   * Method login
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static login(request, response) {
    model.User.findOne({ where: { email: request.body.email } })
      .then((foundUser) => {
        if (foundUser && foundUser.passwordMatch(request.body.password)) {
          const token = jwt.sign({
            UserId: foundUser.id,
            RoleId: foundUser.RoleId
          }, secret, { expiresIn: '2 days' });
          return response.status(200)
            .send({ token, expiresIn: '2 days' });
        }
        return response.status(401)
          .send({ message: 'Log in Failed' });
      });
  }

  /**
   * Method logout
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static logout(request, response) {
    return response.status(200)
      .send({ message: 'Successful logout' });
  }
}

module.exports = UsersController;
