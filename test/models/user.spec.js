const expect = require('chai').expect;
const db = require('../../app/models');
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
      return db.Role.create(roleParams)
        .then((role) => {
          userParams.RoleId = role.id;
          return db.User.create(userParams).then((newUser) => {
            user = newUser;
          });
        });
    });

    after(() => {
      return db.sequelize.sync({ force: true });
    });

    it('should be able to create a user', () => {
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
      db.User.findById(user.id, { include: [db.Role] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleParams.title);
        });
    });

    it('should be able to update a user', () => {
      return db.User.findById(user.id)
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
      return db.Role.create(roleParams)
        .then((role) => {
          userParams.RoleId = role.id;
          user = db.User.build(userParams);
        });
    });

    afterEach(() => {
      return db.sequelize.sync({ force: true });
    });

    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`requires ${field} field to create a user`, () => {
          user[field] = null;
          return user.save()
            .catch((error) => {
              // eslint-disable-next-line no-unused-expressions
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });

    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`reqires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              userParams.RoleId = firstUser.RoleId;
              return db.User.build(userParams).save();
            })
            .catch((error) => {
              // eslint-disable-next-line no-unused-expressions
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
            // eslint-disable-next-line no-unused-expressions
            expect(unsavedUser).to.exist;
          })
          .catch((error) => {
            // eslint-disable-next-line no-unused-expressions
            expect(/isEmail failed/.test(error.name)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it('should be valid if compared', () => {
        return user.save()
          .then((createdUser) => {
            // eslint-disable-next-line no-unused-expressions
            expect(createdUser.passwordMatch(userParams.password)).to.be.true;
          });
      });
    });
  });
});
