const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: {
          args: [5, 30],
          msg: "El nombre debe contener entre 5 y 30 caracteres"
        }
      }
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {timestamps: false});
};
