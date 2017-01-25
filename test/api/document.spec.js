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
const regularUserParams2 = helper.testUser3;
const publicDocumentParams = helper.testDocument;
const privateDocumentParams = helper.testDocument2;
const documentParams = helper.testDocument3;
const documentsCollection = helper.documentsCollection();

const compareDate = (dateA, dateB) =>
  new Date(dateA).getTime() <= new Date(dateB).getTime();

describe('DOCUMENT API', () => {
  let adminRole, regularRole, adminUser, privateUser, privateUser2, publicToken,
    privateToken, privateToken2, publicDocument, privateDocument, roleDocument;

  before((done) => {
    model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
      returning: true })
      .then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.RoleId = adminRole.id;
        // Two users here are assigned same RoleId to demonstrate role access
        regularUserParams.RoleId = regularRole.id;
        regularUserParams2.RoleId = regularRole.id;

        request.post('/users')
          .send(adminUserParams)
          .end((error, response) => {
            adminUser = response.body.newUser;
            publicToken = response.body.token;

            request.post('/users')
              .send(regularUserParams)
              .end((err, res) => {
                privateUser = res.body.newUser;
                privateToken = res.body.token;

                request.post('/users')
                  .send(regularUserParams2)
                  .end((err, res) => {
                    privateUser2 = res.body.newUser;
                    privateToken2 = res.body.token;
                    done();
                  });
              });
          });
      });
  });

  after(() => model.sequelize.sync({ force: true }));

  it('should correctly create test roles & user', () => {
    expect(adminRole.title).to.equal(adminRoleParams.title);
    expect(regularRole.title).to.equal(regularRoleParams.title);
    expect(adminUser.email).to.equal(adminUserParams.email);
    expect(privateUser.email).to.equal(regularUserParams.email);
    expect(adminUser.id).to.equal(1);
    expect(privateUser.id).to.equal(2);
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

    afterEach(() => model.Document.destroy({ where: {} }));

    describe('POST: (/documents) - CREATE A DOCUMENT', () => {
      it('should create a document for a validated user', (done) => {
        documentParams.OwnerId = adminUser.id;
        request.post('/documents')
          .set({ Authorization: publicToken })
          .send(documentParams)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(documentParams.title);
            expect(response.body.content)
              .to.equal(documentParams.content);
            done();
          });
      });
      it('should not create a document without all required fields',
        (done) => {
          const invalidDocument = { title: 'I have no content' };
          request.post('/documents')
            .set({ Authorization: publicToken })
            .send(invalidDocument)
            .expect(500, done);
        });
    });

    describe('Requests for Documents', () => {
      describe('GET: (/documents) - GET ALL DOCUMENTS', () => {
        it('should not return documents if no token is provided', (done) => {
          request.get('/documents')
            .expect(401, done);
        });
        it('should not return documents if invalid token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: 'ADRYDUIGUtrtrr6e' })
              .expect(401, done);
          });
        it('should return all documents when valid token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: publicToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(Array.isArray(response.body)).to.be.true;
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0].title)
                  .to.equal(publicDocumentParams.title);
                done();
              });
          });
      });

      describe('GET: (/documents/:id) - GET A DOCUMENT', () => {
        it('should not return a document if invalid id is provided',
          (done) => {
            request.get('/documents/789')
              .set({ Authorization: publicToken })
              .expect(404, done);
          });
        it('should return the document when a valid id is provided',
          (done) => {
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
        it('should correctly edit document if valid id is provided',
          (done) => {
            const fieldToUpdate = { content: 'replace previous document' };
            request.put(`/documents/${publicDocument.id}`)
              .set({ Authorization: publicToken })
              .send(fieldToUpdate)
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.content).to.equal(fieldToUpdate.content);
                done();
              });
          });
      });

      describe('DELETE: (/documents/:id) - DELETE A DOCUMENT', () => {
        it('should not perform delete if an invalid id is provided',
          (done) => {
            request.delete('/documents/789')
              .set({ Authorization: publicToken })
              .expect(404, done);
          });
        it('should not perform delete if User is not document Owner',
          (done) => {
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
              expect(response.status).to.equal(200);
              expect(response.body.message)

                .to.equal('Document successfully deleted');

              model.Document.count()
                .then((documentCount) => {
                  expect(documentCount).to.equal(0);
                  done();
                });
            });
        });
      });
    });

    describe('Requests for Documents with Access set to Private', () => {
      describe('GET: (/documents/:id - GET A DOCUMENT)', () => {
        beforeEach((done) => {
          privateDocumentParams.OwnerId = privateUser.id;

          model.Document.create(privateDocumentParams)
            .then((createdDocument) => {
              privateDocument = createdDocument;
              done();
            });
        });
        it('should NOT return document when user is not the owner', (done) => {
          request.get(`/documents/${privateDocument.id}`)
            .set({ Authorization: publicToken })
            .expect(403, done);
        });
        it('should NOT return document even when user has same role as owner',
          (done) => {
            request.get(`/documents/${privateDocument.id}`)
              .set({ Authorization: privateToken2 })
              .expect(403, done);
          });
        it('should ONLY return the document when the user is the owner',
          (done) => {
            request.get(`/documents/${privateDocument.id}`)
              .set({ Authorization: privateToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.title)
                  .to.equal(privateDocumentParams.title);
                expect(response.body.content)
                  .to.equal(privateDocumentParams.content);
                done();
              });
          });
      });
    });

    describe('Requests for Documents with Access set to Role', () => {
      describe('GET: (/documents/:id - GET A DOCUMENT)', () => {
        beforeEach((done) => {
          documentParams.OwnerId = privateUser2.id;
          documentParams.access = 'role';

          model.Document.create(documentParams)
            .then((createdDocument) => {
              roleDocument = createdDocument;
              done();
            });
        });

        it('should ONLY return when user has same role as owner', (done) => {
          request.get(`/documents/${roleDocument.id}`)
            .set({ Authorization: privateToken })
            .end((errors, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(documentParams.title);
              expect(response.body.content).to.equal(documentParams.content);
              done();
            });
        });
      });
    });
  });

  describe('Requests to get multiple Documents', () => {
    before(() => model.Document.bulkCreate(documentsCollection));

    describe('Document Pagination', () => {
      it('allows use of query params "limit" to limit the result', (done) => {
        request.get('/documents?limit=7')
          .set({ Authorization: publicToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(7);
            done();
          });
      });
      it('allows use of query params "offset" to create a range', (done) => {
        request.get('/documents?offset=7')
          .set({ Authorization: publicToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(9);
            done();
          });
      });
      it('returns the documents in order of their published dates', (done) => {
        request.get('/documents?limit=7')
          .set({ Authorization: publicToken })
          .end((error, response) => {
            const documents = response.body;

            let flag = false;
            for (let index = 0; index < documents.length - 1; index += 1) {
              flag = compareDate(documents[index].createdAt,
                documents[index + 1].createdAt);
              if (!flag) break;
            }
            expect(flag).to.be.true;
            done();
          });
      });
      it('does NOT return documents if the limit is not valid', (done) => {
        request.get('/documents?limit=-1')
          .set({ Authorization: publicToken })
          .expect(400, done);
      });
      it('does NOT return documents if the offset is not valid', (done) => {
        request.get('/documents?offset=-2')
          .set({ Authorization: publicToken })
          .expect(400, done);
      });
    });

    describe('Document Search', () => {
      it('performs a search and returns the correct document', (done) => {
        const query = documentsCollection[10].content.substr(5, 13);
        const matcher = new RegExp(query);

        request.post(`/documents/search?query=${query}`)
          .set({ Authorization: publicToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(matcher.test(response.body[0].content)).to.be.true;
            done();
          });
      });

      it('allows use of query params "limit" to determine the result number',
        (done) => {
          request.post('/documents/search?limit=4')
            .set({ Authorization: publicToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.length).to.equal(4);
              done();
            });
        });
      it('allows use of query params "offset" to create a range', (done) => {
        request.post('/documents/search?offset=7')
          .set({ Authorization: publicToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(9);
            done();
          });
      });
      it('allows use of query params "role" to get documents by role',
        (done) => {
          request.post('/documents/search?role=1')
            .set({ Authorization: publicToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              const query = {
                where: { id: response.body[0].id },
                include: [{
                  model: model.User,
                  as: 'Owner'
                }]
              };

              model.Document.findAll(query)
                .then((foundDocuments) => {
                  expect(foundDocuments[0].Owner.RoleId).to.equal(1);
                  done();
                });
            });
        });

      it('allows use of query params "publishedDate" to determine the order',
        (done) => {
          request.post('/documents?publishedDate=ASC')
            .set({ Authorization: publicToken })
            .end((error, response) => {
              const foundDocuments = response.body;
              let flag = true;

              for (let index = 0; index < foundDocuments.length - 1;
                index += 1) {
                flag = compareDate(foundDocuments[index].createdAt,
                  foundDocuments[index + 1].createdAt);
                if (!flag) break;
              }
              expect(flag).to.be.false;
              done();
            });
        });
      it('does NOT return documents if the limit is not valid', (done) => {
        request.post('/documents/search?limit=-1')
          .set({ Authorization: publicToken })
          .expect(400, done);
      });
      it('does NOT return documents if the offset is not valid', (done) => {
        request.post('/documents/search?offset=-2')
          .set({ Authorization: publicToken })
          .expect(400, done);
      });
    });
  });
});
