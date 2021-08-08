const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // I define the models genre
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
