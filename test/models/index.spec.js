const expect = require('chai').expect;
const models = require('../../app/models');

describe('Created Models', () => {
  it('should have User Model Created', () => {
    expect(models.user).to.exist;
    expect(models.role).to.exist;
  });
});
