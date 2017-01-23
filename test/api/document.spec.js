/* eslint-disable no-unused-expressions */

const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../app/models');
const helper = require('../testHelper');

const adminRoleParams = helper.testRole;
const regularRoleParams = helper.testRole2;
const adminUserParams = helper.testUser;
const regularUserParams = helper.testUser2;
const publicDocumentParams = helper.testDocument;
const privateDocumentParams = helper.testDocument2;
const publicDocumentParams2 = helper.testDocument3;

describe('DOCUMENT API', () => {
  let adminRole, regularRole, adminUser, publicToken, publicDocument, privateUser,
    privateToken, privateDocument;

  before((done) => {
    model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
      returning: true })
      .then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.RoleId = adminRole.id;
        regularUserParams.RoleId = regularRole.id;

        request.post('/users')
          .send(adminUserParams)
          .end((error, response) => {
            adminUser = response.body.newUser;
            publicToken = response.body.token;
          });
        request.post('/users')
          .send(regularUserParams)
          .end((error, response) => {
            privateUser = response.body.newUser;
            privateToken = response.body.token;
            done();
          });
      });
  });

  after(() => {
    return model.sequelize.sync({ force: true });
  });

  it('should correctly create test roles & user', () => {
    expect(adminRole.title).to.equal(adminRoleParams.title);
    expect(regularRole.title).to.equal(regularRoleParams.title);
    expect(adminUser).to.exist;
    expect(adminUser.email).to.equal(adminUserParams.email);
  });

  describe('REQUESTS', () => {
    beforeEach((done) => {
      publicDocumentParams.OwnerId = adminUser.id;
      model.Document.create(publicDocumentParams)
        .then((createdPublicDocument) => {
          publicDocument = createdPublicDocument;
          done();
        });
    });

    afterEach(() => {
      return model.Document.destroy({ where: {} });
    });

    describe('POST: (/documents) - CREATE A DOCUMENT', () => {
      it('should create a document for a validated user', (done) => {
        publicDocumentParams2.OwnerId = adminUser.id;
        request.post('/documents')
          .set({ Authorization: publicToken })
          .send(publicDocumentParams2)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(publicDocumentParams2.title);
            expect(response.body.content)
              .to.equal(publicDocumentParams2.content);
            done();
          });
      });
      it('should not create a document without all required fields', (done) => {
        const invalidDocument = { title: 'I have no content' };
        request.post('/documents')
          .set({ Authorization: publicToken })
          .send(invalidDocument)
          .expect(500, done);
      });
    });

    describe('Requests for Public Documents', () => {
      describe('GET: (/documents) - GET ALL DOCUMENTS', () => {
        it('should not return documents if no token is provided', (done) => {
          request.get('/documents')
            .expect(401, done);
        });
        it('should not return documents if invalid token is provided', (done) => {
          request.get('/documents')
            .set({ Authorization: 'ADRYDUIGUtrtrr6e' })
            .expect(401, done);
        });
        it('should return all documents when valid token is provided', (done) => {
          request.get('/documents')
            .set({ Authorization: publicToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(Array.isArray(response.body)).to.be.true;
              expect(response.body.length).to.be.greaterThan(0);
              expect(response.body[0].title).to.equal(publicDocumentParams.title);
              done();
            });
        });
      });

      describe('GET: (/documents/:id) - GET A DOCUCUMENT', () => {
        it('should not return a document if invalid id is provided', (done) => {
          request.get('/documents/789')
            .set({ Authorization: publicToken })
            .expect(404, done);
        });
        it('should return the document when a valid id is provided', (done) => {
          request.get(`/documents/${publicDocument.id}`)
            .set({ Authorization: publicToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(publicDocument.title);
              expect(response.body.content).to.equal(publicDocument.content);
              done();
            });
        });
      });

      describe('PUT: (/documents/:id) - EDIT A DOCUMENT', () => {
        it('should not perform edit if invalid id is provided', (done) => {
          const fieldToUpdate = { content: 'replace previous document' };
          request.put('/documents/789')
            .set({ Authorization: publicToken })
            .send(fieldToUpdate)
            .expect(404, done);
        });
        it('should not perform edit if User is not document Owner', (done) => {
          const fieldToUpdate = { content: 'replace previous document' };
          request.put(`/documents/${publicDocument.id}`)
            .set({ Authorization: privateToken })
            .send(fieldToUpdate)
            .expect(403, done);
        });
        it('should correctly edit document if valid id is provided', (done) => {
          const fieldToUpdate = { content: 'replace previous document' };
          request.put(`/documents/${publicDocument.id}`)
            .set({ Authorization: publicToken })
            .send(fieldToUpdate)
            .end((error, response) => {
              expect(response.status).to.equal(202);
              expect(response.body.content).to.equal(fieldToUpdate.content);
              done();
            });
        });
      });

      describe('DELETE: (/documents/:id) - DELETE A DOCUMENT', () => {
        it('should not perform delete if an invalid id is provided', (done) => {
          request.delete('/documents/789')
            .set({ Authorization: publicToken })
            .expect(404, done);
        });
        it('should not perform delete if User is not document Owner', (done) => {
          const fieldToUpdate = { content: 'replace previous document' };
          request.delete(`/documents/${publicDocument.id}`)
            .set({ Authorization: privateToken })
            .send(fieldToUpdate)
            .expect(403, done);
        });
        it('should succesfully delete when provided a valid Id', (done) => {
          request.delete(`/documents/${publicDocument.id}`)
            .set({ Authorization: publicToken })
            .end((error, response) => {
              expect(response.status).to.equal(202);
              expect(response.body.message)
                .to.equal('Document succesfully deleted');

              model.Document.count()
                .then((documentCount) => {
                  expect(documentCount).to.equal(0);
                  done();
                });
            });
        });
      });
    });

    describe('Requests for Private Documents', () => {
      it('should have private user created', (done) => {
        expect(privateUser.firstName).to.equal('femi');
        expect(privateUser.id).to.equal(2);
        done();
      });

      describe('GET: (/documents/:id - GET A DOCUMENT)', () => {
        beforeEach((done) => {
          privateDocumentParams.OwnerId = privateUser.id;

          model.Document.create(privateDocumentParams)
            .then((createdDocument) => {
              privateDocument = createdDocument;
              done();
            });
        });
        it('should not return document when user is not the owner', (done) => {
          request.get(`/documents/${privateDocument.id}`)
            .set({ Authorization: publicToken })
            .expect(403, done);
        });
        it('should return the document when the user is the owner', (done) => {
          request.get(`/documents/${privateDocument.id}`)
            .set({ Authorization: privateToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(privateDocumentParams.title);
              expect(response.body.content).to.equal(privateDocumentParams.content);
              done();
            });
        });
      });
    });
  });
});
