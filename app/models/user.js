module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });

        User.hasMany(models.Document, { foreignKey: 'OwnerId' });
      }
    }
  });
  return User;
};
