module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: {
            name: 'RoleId',
            allowNull: false
          }
        });
      }
    }
  });
  return Role;
};
