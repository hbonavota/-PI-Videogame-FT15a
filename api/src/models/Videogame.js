const { DataTypes } = require('sequelize');

// Export a function that defines the model
// Then, injects the connection to sequelize.

module.exports = (sequelize) => {
  // defines the "videogame" models
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    platforms: {
      type: DataTypes.STRING

    }

  },
    {
      timestamps: false
    });
};
