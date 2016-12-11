const expect = require('chai').expect;
const role = require('../../app/models').role;

const params = {
  title: 'admin'
};

describe('Role Model', () => {
  const Role = role.build(params);

  describe('Create Role', () => {
    it('should create an instance of \'role\' ', () => {
      expect(role).to.exist;
    });

    it('should create an instance with a title', () => {
      expect(Role.title).to.equal(params.title);
    });
  });
});

