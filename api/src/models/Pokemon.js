const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  const pokemonModel = sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      pokemonId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    },
    {
      timestamps: false,
    }
  );
};