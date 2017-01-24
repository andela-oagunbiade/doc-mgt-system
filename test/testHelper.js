const faker = require('faker');


module.exports = {
  testRole: {
    title: 'admin'
  },

  testRole2: {
    title: 'regular'
  },

  testUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testUser2: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testUser3: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testDocument: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph()
  },

  testDocument2: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },

  testDocument3: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph()
  },

  documentsCollection() {
    const documentsParams = [];

    for (let i = 0; i <= 15; i += 1) {
      documentsParams.push({
        title: faker.finance.accountName(),
        content: faker.lorem.paragraph(),
        OwnerId: 1
      });
    }

    return documentsParams;
  }
};
