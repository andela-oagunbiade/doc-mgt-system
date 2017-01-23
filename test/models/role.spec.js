/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Role = require('../../app/models').Role;
const roleParams = require('../testHelper').testRole;


describe('Role Model', () => {
  describe('Create Role', () => {
    let role;
    before((done) => {
      Role.create(roleParams)
        .then((createdRole) => {
          role = createdRole;
          done();
        });
    });
    after(() => Role.sequelize.sync({ force: true }));

    it('should be able to create a role', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('should be able to create a role that has a title', () => {
      expect(role.title).to.equal(roleParams.title);
    });
  });

  describe('Role Model Validations', () => {
    after(() => Role.sequelize.sync({ force: true }));

    describe('Title Field Validation', () => {
      it('requires title field to create a role', (done) => {
        Role.create()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });

      it('ensures a role can only be created once(unique)', (done) => {
        Role.create(roleParams)
          .then(() => {
            // attempt to create a second role with same title
            Role.create(roleParams)
              .catch((error) => {
                expect(/UniqueConstraintError/.test(error.name)).to.be.true;
                done();
              });
          });
      });
    });
  });
});
