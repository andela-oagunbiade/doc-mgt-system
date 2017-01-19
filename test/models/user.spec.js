/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const model = require('../../app/models');
const helper = require('../testHelper');

const userParams = helper.testUser;
const roleParams = helper.testRole;

const requiredFields = ['userName', 'firstName', 'lastName', 'email',
  'password', 'RoleId'];
const uniqueFields = ['userName', 'email'];

describe('User Model', () => {
  describe('How User Model Works', () => {
    let user;
    before(() => {
      return model.Role.create(roleParams)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams).then((createdUser) => {
            user = createdUser;
          });
        });
    });

    after(() => {
      return model.sequelize.sync({ force: true });
    });

    it('should be able to create a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });
    it('should create a user with username, first & last name', () => {
      expect(user.userName).to.equal(userParams.userName);
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });
    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(userParams.email);
    });
    it('should create a user with hashed password', () => {
      expect(user.password).to.not.equal(userParams.password);
    });
    it('should create a user with a defined Role', () => {
      model.User.findById(user.id, { include: [model.Role] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleParams.title);
        });
    });

    it('should be able to update a user', () => {
      return model.User.findById(user.id)
        .then((foundUser) => {
          return foundUser.update({ userName: 'mogims' });
        })
        .then((updatedUser) => {
          expect(updatedUser.userName).to.equal('mogims');
        });
    });
  });

  describe('How User model does Validation', () => {
    let user;
    beforeEach(() => {
      return model.Role.create(roleParams)
        .then((role) => {
          userParams.RoleId = role.id;
          user = model.User.build(userParams);
        });
    });

    afterEach(() => {
      return model.sequelize.sync({ force: true });
    });

    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`requires ${field} field to create a user`, () => {
          user[field] = null;
          return user.save()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });

    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`requires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              userParams.RoleId = firstUser.RoleId;
              // attempt to create another user with same parameters
              return model.User.build(userParams).save();
            })
            .catch((error) => {
              expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            });
        });
      });
    });

    describe('Mail Validation', () => {
      it('requires user mail to be authentic', () => {
        user.email = 'oredavids yahoo';
        return user.save()
          .then((unsavedUser) => {
            expect(unsavedUser).to.exist;
          })
          .catch((error) => {
            expect(/isEmail failed/.test(error.name)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it('should be valid if compared', () => {
        return user.save()
          .then((createdUser) => {
            expect(createdUser.passwordMatch(userParams.password)).to.be.true;
          });
      });
    });
  });
});
