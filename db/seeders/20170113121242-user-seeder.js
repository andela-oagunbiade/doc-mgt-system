module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        userName: 'neji',
        firstName: 'neji',
        lastName: 'hyuga',
        email: 'nejihyuga@gmail.com',
        password: '123456',
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        userName: 'oredavids',
        firstName: 'ore',
        lastName: 'davids',
        email: 'oredavids@gmail.com',
        password: '123456',
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        userName: 'femi',
        firstName: 'femi',
        lastName: 'dotexe',
        email: 'femidotexe@gmail.com',
        password: '123456',
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      id: [1, 2]
    });
  }
};
