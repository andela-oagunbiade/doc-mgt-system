const model = require('../models');

const accessCategories = {
  public: 'public',
  private: 'private',
  role: 'role'
};

/**
 * Class DocumentsController
 * To handle routing logic for documents route
 */
class DocumentsController {

  /**
   * Method createDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static createDocument(request, response) {
    model.Document.create(request.body)
      .then((newDocument) => {
        return response.status(201)
          .send(newDocument);
      })
      .catch((error) => {
        return response.status(500)
          .send(error.errors);
      });
  }

  /**
   * Method getDocuments to obtain all documents
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocuments(request, response) {
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { OwnerId: request.decoded.UserId }
        ]
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    model.Document.findAll(query)
      .then((documents) => {
        return response.status(200)
          .send(documents);
      });
  }

  /**
   * Method getDocument to obtain a document
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
          .send({
            message: `No document found with id: ${request.params.id}`
          });
        }
        if (foundDocument.access === accessCategories.public) {
          return response.status(200)
            .send(foundDocument);
        }
        if ((foundDocument.access === accessCategories.private) &&
          (foundDocument.OwnerId === request.decoded.UserId)) {
          return response.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === accessCategories.role) {
          return model.User.findById(foundDocument.OwnerId)
            .then((documentOwner) => {
              if (documentOwner.RoleId === request.decoded.RoleId) {
                return response.status(200)
                  .send(foundDocument);
              }
              return response.status(403)
                .send({
                  message: 'You are not permitted to access this document'
                });
            });
        }
        return response.status(403)
          .send({
            message: 'You are not permitted to access this document'
          });
      });
  }

  /**
   * Method getUserDocuments to obtain all documents for a specific user
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getUserDocuments(request, response) {
    model.Document.findAll({ where: { OwnerId: request.params.id } })
      .then((foundDocuments) => {
        if (!foundDocuments) {
          return response.status(404)
            .send({ message: `No document found for user with id:\
              ${request.params.id}` });
        }
        return response.status(200)
          .send(foundDocuments);
      });
  }

  /**
   * Method updateDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static updateDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        }
        if (foundDocument.OwnerId === request.decoded.UserId) {
          foundDocument.update(request.body)
            .then((updatedDocument) => {
              return response.status(200)
                .send(updatedDocument);
            });
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }

  /**
   * Method deleteDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static deleteDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        }
        if (foundDocument.OwnerId === request.decoded.UserId) {
          foundDocument.destroy()
            .then(() => {
              return response.status(200)
                .send({ message: 'Document successfully deleted' });
            });
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }

  /**
   * Get all documents that belongs to a user
   * Route: GET: /search?query={}&published={}&role=1
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @returns {Object} response object
   */
  static search(request, response) {
    const queryString = request.query.query;
    const role = Math.abs(request.query.role, 10);
    const publishedDate = request.query.publishedDate;
    const order = publishedDate && /^ASC$/i.test(publishedDate)
            ? publishedDate : 'DESC';

    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { OwnerId: request.decoded.UserId }
        ] }],
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', order]]
    };

    if (queryString) {
      query.where.$and.push({ $or: [
        { title: { $like: `%${queryString}%` } },
        { content: { $like: `%${queryString}%` } }
      ] });
    }

    if (role) {
      query.include = [{
        model: model.User,
        as: 'Owner',
        attributes: [],
        include: [{
          model: model.Role,
          attributes: [],
          where: { id: role }
        }]
      }];
    }

    model.Document.findAll(query)
      .then((documents) => {
        response.send(documents);
      });
  }
}

module.exports = DocumentsController;
