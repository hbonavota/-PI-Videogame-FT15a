const { DataTypes } = require('sequelize');

// Export a function that defines the model
// Then, injects the connection to sequelize.
module.exports = (sequelize) => {
  // defines the "genre" models
  sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
    {
      timestamps: false
    });
};
