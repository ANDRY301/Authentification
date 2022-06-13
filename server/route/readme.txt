     /*/
    const dema =  teka.map((cara)=>cara.numero_badget)
    
    Esp_arrives.hasMany  (Liste_personnels, {foreignKey: 'numero_badget',})
    Liste_personnels.belongsTo(Esp_arrives, {foreignKey: 'numero_badget'})
    
     const teta = await Liste_personnels.findAll({ where:{UserId:id,numero_badget:[dema]}, attributes: ['numero_badget','nom','prenom','telephone']})
     /*/
    

    - lien pour  l intersection javascript
    /*/ https://www.codegrepper.com/code-examples/javascript/javascript+intersection+of+two+arrays+of+objects /*/