module.exports = (sequelize, DataTypes) => {
    const Liste_personnels = sequelize.define("Liste_personnels", {
        numero_badget: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },

        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
    },
      {
        timestamps: false,
      }
    
    )

    return Liste_personnels
}