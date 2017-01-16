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

    before(() => {
      return model.Role.create(params.testRole)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          owner = createdUser;
          documentParams.OwnerId = owner.id;
          return model.Document.create(documentParams);
        })
        .then((createdDocument) => {
          document = createdDocument;
        });
    });
    after(() => {
      return model.sequelize.sync({ force: true });
    });

    it('should be able to create a document', () => {
      expect(document).to.exist;
      expect(typeof document).to.equal('object');
    });
    it('should create a document with title and content', () => {
      expect(document.title).to.equal(documentParams.title);
      expect(document.content).to.equal(documentParams.content);
    });
    it('should create a document with correct OwnerId', () => {
      expect(document.OwnerId).to.equal(owner.id);
    });
    it('should create a document with access set to public', () => {
      expect(document.access).to.equal('public');
    });
  });

  describe('Document Model Validations', () => {
    let document;

    beforeEach(() => {
      return model.Role.create(params.testRole)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          documentParams.OwnerId = createdUser.id;
          document = model.Document.build(documentParams);
        });
    });
    afterEach(() => {
      return model.sequelize.sync({ force: true });
    });

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
