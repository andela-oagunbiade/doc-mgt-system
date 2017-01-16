const server = require('../../server.js');
const request = require('supertest')(server);


describe('Index Route', () => {
  it('should correctly load the index route', (done) => {
    request.get('/').expect(200, done);
  });
});
