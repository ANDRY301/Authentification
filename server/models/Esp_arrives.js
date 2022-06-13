

module.exports = (sequelize, DataTypes) => {
    const Esp_arrives = sequelize.define("Esp_arrives", {
        UserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_badget: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })

    return Esp_arrives
}