require('dotenv').config()
const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcrypt');
const {Users}    = require('../models');
const nodemailer = require('nodemailer') ;
const validator  = require('validator');

const {validateToken} = require('../midleware/authvalidation');
const jwt             = require('jsonwebtoken');

const {sign}          = require('jsonwebtoken');


/*/VERIFICATION TOKEN PARTIE CLIENT/*/
router.get('/auth',validateToken,async (req,res)=>{
  res.json(req.user)
})

/*/INSCRIPTION UTILISATEUR/*/
router.post('/inscription', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });
  if (username === "" || email === "" || password === "") {
    res.send({ message: "Compléter tous les champs" })
  } else if (!validator.isEmail(email)) {
    res.send({ message: 'Adresse incorrecte' });
  } else {
    try {
      if (user) {
        res.send({ message: "Adresse déjà enregistrée" })
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          Users.create({
            username: username,
            email: email,
            password: hash
          })
        })
        res.json("Inscription terminée")
      }
    } catch (error) {
      res.json({message:"inscription non valide"})
    }
  }
})

/*/  CONNECTION  /*/
router.post('/connection', async (req,res)=>{
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) { res.status(200).json({ message: "Utilsateur inconnu" }) }
    else {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) { res.status(200).json({ message: "Mot de passe incorrect" }) } else {
          const accessToken = sign({
            username: user.username,
            id: user.id
          }, process.env.CLE_TOKEN)
          
          res.json({ token: accessToken, username: username, id: user.id });
        }})}
  } catch (error) {
    console.log(error)
  }
})

/*/  MOT DE PASSE OUBLIER /*/
router.post('/mot_de_passe_oublier',async(req,res,next)=>{
  const { email } = req.body;
  const user_email    = await Users.findOne({ where: { email } });
  if(!validator.isEmail(email)){
    res.send({ message: 'Adresse incorrecte' });
   }else if (!user_email){
     res.send({ message: 'Adresse invalide' });
   }
   
   else{
    try {
      const user    = await Users.findOne({ where: { email } }); 
      const secret  = process.env.CLE_TOKEN + user.password ;
      const payload = {
            email : user.email,
            id    : user.id
        }
  
        const token = jwt.sign(payload,secret,{expiresIn:"15m"})
        const link2 = `${req.protocol}://localhost:3000/change_password/${user.id}/${token}/`
        /*/ ENVOIE VERS LE MAIL /*/
        const transporter = nodemailer.createTransport({
          host : process.env.HOST_MAIL,
          port:  process.env.PORT_MAIL,
          auth     : {
              user :process.env.USER_EMAIL,
              pass :process.env.PASSE_EMAIL
          }
      })
      
      const mailOptions = {
        from     : process.env.USER_EMAIL,
        to       : `${email}`,
        subject  : process.env.MESSAGE,
        text     : `${link2}`,
      }
      transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log('misy erreur ')
        }else{
          console.log('mail lasa nadeha')
        }
      })
      res.send("Consulter votre email")
    } catch (error) {
        res.send({message : error})
    }
   }
})

/*/ CHANGER LE MOT PASSE /*/
router.post("/changer_mot_de_passe/:id/:token", async (req, res) => {
  const { password, password2 } = req.body;
  const { token, id } = req.params;
  const user = await Users.findOne({ where: { id } });

  try {
    if (password === password2) {

      const secret = process.env.CLE_TOKEN + user.password
      const salt = await bcrypt.genSaltSync(10, 'a');
      const hash = bcrypt.hashSync(password, salt)
      const decoded = jwt.verify(token, secret, { expiresIn: '15m' });
      await Users.update({ password: hash }, { where: { id: decoded.id } })
      res.send('valide')
    } else {
      res.send({ message: 'Les deux mots ne sont pas identiques' })
    }
  } catch (error) {
    res.send({ message: "Ce lien n'est plus valide" })
  }
})



module.exports = router