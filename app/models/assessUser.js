module.exports = (sequelize, DataTypes) => {
  const AssessUser = sequelize.define('AssessUser', {
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
    },
    relationship: {
      defaultValue: 'co-worker',
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['co-worker', 'friend']]
      }
    }
  });
  return AssessUser;
};

