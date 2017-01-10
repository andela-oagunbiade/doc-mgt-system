const expect = require('chai').expect;
const User = require('../../app/models').User;
const params = require('../testHelper.js').testUser;

describe('User Model', () => {
  const user = User.build(params);

  describe('How User Model Works', () => {
    it('should be able to create an instance of \'user\' for this test', () => {
      expect(user).not.to.be.null;
    });
    it('should create a user instance with all required fields', () => {
      expect(user.userName).to.equal(params.userName);
      expect(user.firstName).to.equal(params.firstName);
      expect(user.lastName).to.equal(params.lastName);
      expect(user.email).to.equal(params.email);
      expect(user.password).to.equal(params.password);
      expect(user.role).to.equal(params.role);
    });
  });
});
