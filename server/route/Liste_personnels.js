const express         = require('express');
const router          = express.Router();
const {validateToken} = require('../midleware/authvalidation')
const {Esp_arrives,Liste_personnels} = require('../models')


/*/ INSCRIPTION POUR LE NOUVEAU  /*/
router.post("/inscription_badget/:id", validateToken, async (req, res) => {
  const post = req.body;
  post.UserId = req.user.id;
  await Liste_personnels.create(post).then((result) => {
    res.status(200).json("Inscription réussi")
  }).catch((err) => {
    return res.status(400).json({ message: "erreur d inscription" })
  })
});

/*/ LISTE TOTAL DE BADGET /*/
router.get("/liste_employer_badget/:id", async (req, res) => {
  const id = req.params.id;
  await Liste_personnels.findAll({ where: { UserId: id } }).then((liste_total) => {
    res.status(200).json(liste_total)
  }).catch((err) => {
    res.status(400).json({ message: "erreur intersecption liste" })
  })
})

/*/ POUR LE ESP32 ENTRANT /*/
router.post("/post_insertion", validateToken, async (req, res) => {
  const post = req.body;
  const verification_liste = await Liste_personnels.findOne({ where: { UserId: post.UserId, numero_badget: post.numero_badget } })
  if (verification_liste) {
    await Esp_arrives.create(post).then( (res)=>{
      res.status(200).json("reception base de donné")
    }).catch( (err)=>{
      res.status(400).json({message:"erreur insertion"})
    });
  } else {
    res.status(400).json({ message: " utilisateur n'est inscrit sur cet badget "})
  }
});


/*/ LISTE DES PRESENT/*/

router.get("/liste_present/:id", async (req, res) => {
  const id = req.params.id;
  const liste_arrive = await Esp_arrives.findAll({ where: { UserId: id } })
  const liste_total = await Liste_personnels.findAll({ where: { UserId: id } })

  if (liste_arrive && liste_total) {
    const intersection_2_liste_absent = liste_total.filter(item1 => liste_arrive.some(item2 => item1.numero_badget === item2.numero_badget))
    res.status(200).json(intersection_2_liste_absent)
  } else {
    res.status(400).json({ message: "probleme d interseption un des deux table" })
  }
})

/*/ LISTE QUE LE DATE/*/
router.get("/liste_date_present/:id", async (req, res) => {
  const id = req.params.id;
  const liste_arrive = await Esp_arrives.findAll({ where: { UserId: id } })
  const liste_total = await Liste_personnels.findAll({ where: { UserId: id } })

  if (liste_arrive && liste_total) {
    const intersection_2_liste_absent = liste_arrive.filter(item1 => liste_total.some(item2 => item1.numero_badget === item2.numero_badget))
    res.status(200).json(intersection_2_liste_absent)
  } else {
    res.status(400).json({ message: "probleme d interseption un des deux table" })
  }
})


/*/ LISTE DES ABSENT/*/
router.get("/liste_absent/:id", async (req, res) => {
  const id = req.params.id;
  const liste_arrive = await Esp_arrives.findAll({ where: { UserId: id } })
  const liste_total = await Liste_personnels.findAll({ where: { UserId: id } })
  if (liste_arrive && liste_total) {
    const intersection_2_liste_absent = liste_total.filter(item1 => !liste_arrive.some(item2 => item1.numero_badget === item2.numero_badget))
    res.status(200).json(intersection_2_liste_absent)
  } else {
    res.status(400).json({ message: "probleme d interseption un des deux table" })
  }
})

/*/ SUPRESSION DANS LE PARTIE LISTE /*/
router.delete("/del_liste/:four_id", validateToken, async (req, res) => {
  const four_id = req.params.four_id
  await Liste_personnels.destroy({ where: { id: four_id } }).then((delet) => {
    res.status(200).json("supression réussi")
  }).catch((err) => {
    res.status(400).json({ message: "supression pas  validé" })
  })
})

module.exports = router
