const expect = require('chai').expect;
const Role = require('../../app/models').Role;
const params = require('../testHelper.js').testRole;

describe('Role Model', () => {
  const role = Role.build(params);

  describe('Create Role', () => {
    it('should create an instance of \'role\' ', () => {
      expect(role).to.exist;
    });

    it('should create an instance with a title', () => {
      expect(role.title).to.equal(params.title);
    });
  });
});

