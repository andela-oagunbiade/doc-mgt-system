module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
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
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Document;
};
