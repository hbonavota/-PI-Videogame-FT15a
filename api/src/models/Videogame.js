const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // I define the model with name "videogame"
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
    background_image: {
      type: DataTypes.STRING,
      validate: {
          isUrl: true
      }
    },
    released:{
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.STRING,
    },
    parent_plaforms: {
      type: DataTypes.STRING,
      
    }

  },
  {
    timestamps: false
  });
};
