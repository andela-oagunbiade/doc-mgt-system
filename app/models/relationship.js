module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    description: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  });
};
