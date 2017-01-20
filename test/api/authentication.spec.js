const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../app/models');
const helper = require('../testHelper');

const userParams = helper.testUser;
const roleParams = helper.testRole;

describe('User Authentication', () => {
  let token;
  beforeEach((done) => {
    model.Role.create(roleParams)
      .then((createdRole) => {
        userParams.RoleId = createdRole.id;
        return model.User.create(userParams);
      })
      .then(() => {
        request.post('/users/login')
          .send(userParams)
          .end((error, response) => {
            token = response.body.token;
            done();
          });
      });
  });
  afterEach(() => {
    return model.sequelize.sync({ force: true });
  });

  it('should not authorize a user without a token', (done) => {
    request.get('/users')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });
  it('should not authorize a user who supplies invalid token', (done) => {
    request.get('/users')
      .set({ Authorization: 'trinity' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });
  it('should correctly return all users with valid token and access', (done) => {
    request.get('/users')
      .set({ Authorization: token })
      .end((error, response) => {
        expect(response.status).to.equal(202);
        // eslint-disable-next-line no-unused-expressions
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[0].userName).to.equal(userParams.userName);
        done();
      });
  });
});
