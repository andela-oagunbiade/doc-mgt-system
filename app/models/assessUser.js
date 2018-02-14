module.exports = (sequelize, DataTypes) => {
  const accessUser = sequelize.define('accessUser', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
};

