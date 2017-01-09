const expect = require('chai').expect;
const models = require('../../app/models');

describe('Created Models', () => {
  it('should have User Model Created', () => {
    expect(models.User).to.exist;
  });
  it('should have Role Model Created', () => {
    expect(models.Role).to.exist;
  });
  it('should have Document Model Created', () => {
    expect(models.Document).to.exist;
  });
});
