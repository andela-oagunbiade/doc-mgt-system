const app = require('../../testServer');
const request = require('supertest')(app);


describe('Index Route', () => {
  it('should correctly load the index route', (done) => {
    request.get('/').expect(200, done);
  });
});
