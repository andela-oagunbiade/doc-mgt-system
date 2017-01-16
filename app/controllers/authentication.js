const jwt = require('jsonwebtoken');
const db = require('../models');

const secret = process.env.SECRET_TOKEN || 'secret';

const Auth = {
  verifyToken(request, response, next) {
    const token = request.headers.authorization ||
      request.headers['x-access-token'];
    if (!token)
      return response.status(401)
        .send({ message: 'Not Authorized' });

    jwt.verify(token, secret, (error, decoded) => {
      if (error)
        return response.status(401)
          .send({ message: 'Token Invalid' });

      request.decoded = decoded;
      next();
    });
  },

  adminAccess(request, response, next) {
    db.Role.findById(request.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin')
          next();
        else
          return response.status(403)
            .send({ message: 'You are not an Admin' });
      });
  }
};

module.exports = Auth;
