module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contents: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    OwnerId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    TypeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return document;
};
