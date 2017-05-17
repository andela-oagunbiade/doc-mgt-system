/* eslint-disable no-unused-expressions */

const app = require('../../testServer');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../app/models');
const helper = require('../testHelper');

const userParams = helper.testUser;
const roleParams = helper.testRole;

describe('User API', () => {
  let user;
  let token;

  before(() => {
    return model.Role.create(roleParams)
      .then((createdRole) => {
        userParams.RoleId = createdRole.id;
      });
  });

  afterEach(() => model.User.destroy({ where: {} }));

  after(() => model.sequelize.sync({ force: true }));

  describe('REQUESTS', () => {
    beforeEach((done) => {
      request.post('/users')
        .send(userParams)
        .end((error, response) => {
          user = response.body.newUser;
          token = response.body.token;
          done();
        });
    });

    it('should not create another user with same email', (done) => {
      request.post('/users')
        .send(userParams)
        .expect(409, done);
    });

    describe('GET: (/users) - GET USERS', () => {
      it('should not authorize a user without token', (done) => {
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
      it('should get all users when provided valid token & access', (done) => {
        request.get('/users')
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            // eslint-disable-next-line no-unused-expressions
            expect(Array.isArray(response.body)).to.be.true;
            expect(response.body.length).to.be.greaterThan(0);
            done();
          });
      });
    });

    describe('GET: (/users/:id) - GET A USER', () => {
      it('should not return a user id is invalid', (done) => {
        request.get('/users/9999')
          .set({ Authorization: token })
          .expect(404, done);
      });
      it('should return the user with supplied id', (done) => {
        request.get(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(user.email).to.equal(userParams.email);
            done();
          });
      });
    });

    describe('PUT: (/users/:id) - UPDATE', () => {
      it('should not perform update if supplied id is invalid', (done) => {
        request.get('/users/9999')
          .set({ Authorization: token })
          .expect(404, done);
      });
      it('should update a user if supplied id is valid', (done) => {
        const fieldsToUpdate = {
          firstName: 'sadio',
          lastName: 'mane'
        };

        request.put(`/users/${user.id}`)
          .set({ Authorization: token })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(fieldsToUpdate.firstName);
            done();
          });
      });
    });

    describe('DELETE: (/users/:id) - DELETE A USER', () => {
      it('should not perform a delete if supplied id is invalid', (done) => {
        request.get('/users/9999')
          .set({ Authorization: token })
          .expect(404, done);
      });
      it('should succesfully delete a user when provided valid id', (done) => {
        request.delete(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            model.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(0);
                done();
              });
          });
      });
    });

    describe('POST: (/users/login) - LOGIN', () => {
      it('should not login when supplied invalid email or password', (done) => {
        request.post('/users/login')
          .send({
            email: 'uy7yyyuy@gmail.com',
            password: '1ljljnjo6'
          })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should login when supplied valid email & password', (done) => {
        request.post('/users/login')
          .send(userParams)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            expect(response.body.expiresIn).to.exist;
            done();
          });
      });
    });

    describe('POST: (/users/logout) - LOGOUT', () => {
      it('should logout a user', (done) => {
        request.post('/users/logout')
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
  });
});
