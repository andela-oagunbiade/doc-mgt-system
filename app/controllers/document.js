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
   * Method getDocument to obtain a document for a specific user
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} documents Object
   */
  static getUserDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        return response.status(200)
          .send(document);
      });
  }

  /**
   * Method getUserDocument to obtain all documents for a specific user
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} documents Object
   */
  static getUserDocuments(request, response) {
    model.Document.findAll({ where: { OwnerId: request.params.id } })
      .then((documents) => {
        if (!documents) return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        return response.status(200)
          .send(documents);
      });
  }

  /**
   * Method updateDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} documents Object
   */
  static updateDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });

        document.update(request.body)
          .then((updatedDocument) => {
            return response.status(202)
              .send(updatedDocument);
          });
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
      .then((document) => {
        if (!document) return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });

        document.destroy()
          .then(() => {
            return response.status(202)
              .send({ message: 'Document succesfully deleted' });
          });
      });
  }

}

module.exports = DocumentsController;
