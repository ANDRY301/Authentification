const { verify } = require("jsonwebtoken");
const {Users}      = require('../models')
require('dotenv').config()

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Utilisateur inconnu" });

  try {
    const validToken = verify(accessToken,  process.env.CLE_TOKEN);
    /*/ 1-rajout/*/
    req.user = validToken

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};


module.exports = { validateToken };