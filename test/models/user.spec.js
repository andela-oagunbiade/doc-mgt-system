const expect = require('chai').expect;
const user = require('../../app/models').User;

const sampleUser = {
  userName: 'oredavids',
  firstName: 'ore',
  lastName: 'davids',
  email: 'oredavids@gmail.com',
  password: '123456',
  role: 'admin'
};

describe('User Model', () => {
  const User = user.build(sampleUser);

  describe('How User Model Works', () => {
    it('should be able to create an instance of \'user\' for this test', () => {
      expect(User).not.to.be.null;
    });
    it('should create a user instance with all required fields', () => {
      expect(User.userName).to.equal(sampleUser.userName);
      expect(User.firstName).to.equal(sampleUser.firstName);
      expect(User.lastName).to.equal(sampleUser.lastName);
      expect(User.email).to.equal(sampleUser.email);
      expect(User.password).to.equal(sampleUser.password);
      expect(User.role).to.equal(sampleUser.role);
    });
  });
});
