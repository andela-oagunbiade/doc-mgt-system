const expect = require('chai').expect;
const role = require('../../app/models').Role;

const params = {
  title: 'admin'
};

describe('Role Model', () => {
  const Role = role.build(params);

  describe('Create Role', () => {
    it('should create an instance of \'role\' ', () => {
      expect(Role).to.exist;
    });

    it('should create an instance with a title', () => {
      expect(Role.title).to.equal(params.title);
    });
  });
});

