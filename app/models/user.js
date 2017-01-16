const bcrypt = require('bcrypt-nodejs');

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
      type: DataTypes.STRING,
      validate: {}
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    RoleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'RoleId',
            allowNull: false
          }
        });

        User.hasMany(models.Document, { foreignKey: 'OwnerId' });
      }
    },

    instanceMethods: {
      passwordMatch(password) {
        return bcrypt.compareSync(password, this.password);
      },

      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate: (newUser) => {
        newUser.hashPassword();
      },
      beforeUpdate: (newUser) => {
        newUser.hashPassword();
      }
    }
  });
  return User;
};
