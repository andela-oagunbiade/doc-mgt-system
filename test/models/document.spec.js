/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const model = require('../../app/models');
const params = require('../testHelper.js');

const documentParams = params.testDocument;
const userParams = params.testUser;

const requiredFields = ['title', 'content', 'OwnerId', 'access'];

describe('Document Model', () => {
  describe('How Document Model Works', () => {
    let document;
    let owner;

    before((done) => {
      model.Role.create(params.testRole)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          owner = createdUser;
          documentParams.OwnerId = owner.id;
          done();
        });
    });

    beforeEach(() => {
      document = model.Document.build(documentParams);
    });

    afterEach(() => model.Document.destroy({ where: {} }));

    after(() => model.sequelize.sync({ force: true }));

    it('should be able to create a document', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument).to.exist;
          expect(typeof createdDocument).to.equal('object');
          done();
        });
    });
    it('should create a document with title and content', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.title).to.equal(documentParams.title);
          expect(createdDocument.content).to.equal(documentParams.content);
          done();
        });
    });
    it('should create a document with correct OwnerId', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.OwnerId).to.equal(owner.id);
          done();
        });
    });
    it('should create a document with publish date', (done) => {
      document.save()
      .then((createdDocument) => {
        expect(createdDocument.createdAt).to.exist;
        done();
      });
    });
    it('should create a document with access set to public', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.access).to.equal('public');
          done();
        });
    });

    describe('Document Model Validations', () => {
      describe('Required Fields Validation', () => {
        requiredFields.forEach((field) => {
          it(`requires a ${field} field to create a document`, () => {
            document[field] = null;
            return document.save()
              .catch((error) => {
                expect(/notNull Violation/.test(error.message)).to.be.true;
              });
          });
        });
      });
    });
  });
});
