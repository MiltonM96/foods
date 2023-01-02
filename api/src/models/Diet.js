const { Sequelize, DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            // type: DataTypes.UUID,
            // defaultValue: Sequelize.UUIDV4,

            type: DataTypes.INTEGER,
            autoIncrement: true,

            // type: DataTypes.STRING,

            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,

        }
    },{
        timestamps: false
    })
}