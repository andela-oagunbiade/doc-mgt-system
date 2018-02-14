module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Relationship', [
      {
        id: 1,
        name: 'co-worker',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        name: 'friend',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Relationship',
      { title: ['co-worker', 'friend'] }
    );
  }
};
