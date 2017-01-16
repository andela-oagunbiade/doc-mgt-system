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
    RoleId: user.RoleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return userDetails;
};

/**
 *
 */
class UsersController {

  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Response} response object
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
   * @returns {Response} - response object
   */
  static createUser(request, response) {
    model.User.findOne({ where: { email: request.body.email } })
      .then((existingUser) => {
        if (existingUser) return response.status(409)
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
}

module.exports = UsersController;
