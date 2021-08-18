const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = require("./utils/config/index.js");

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

//function to test the connection between sequelize and the database
const testConectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('The Connection has been established successfully. ;)');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConectionDB();

// read all the files in the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// inject the connection (sequelize) to all models
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models are all imported models as properties
// To relate them we do a destructuring
const { Videogame, Genre } = sequelize.models;


// relations, where "genreInterm" is the middle table
Videogame.belongsToMany(Genre, { through: "genreInterm", timestamps: false });
Genre.belongsToMany(Videogame, { through: "genreInterm", timestamps: false });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
