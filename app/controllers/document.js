const model = require('../models');

class DocumentsController {

  /**
   * Method createDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} documents Object
   */
  static createDocument(request, response) {
    model.Document.create(request.body)
      .then((newDocument) => {
        return response.status(201)
          .send(newDocument);
      })
      .catch((error) => {
        return response.status(400)
          .send(error.errors);
      });
  }

  /**
   * Method getDocuments to obtain all documents
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} documents Object
   */
  static getDocuments(request, response) {
    const query = {
      limit: request.query.limit || null,
      offset: request.query.offset || null
    };

    model.Document.findAll(query)
      .then((documents) => {
        return response.status(200)
          .send(documents);
      });
  }
}

module.exports = DocumentsController;
