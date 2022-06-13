const express        = require("express") ;
const cors           = require('cors')
const app            = express();
const db             = require('./models')

app.use(cors());
app.use(express.json());


const PostUser = require('./route/Users')
app.use('/users',PostUser) ;

const Badget_inc = require('./route/Liste_personnels')
app.use('/badgets',Badget_inc) ;

app.use(cors())
app.use(express.json())


db.sequelize.sync({alert:true}).then( (req,res)=>{
    app.listen(3001,()=>{
        console.log("jereo jereo") ;
      })
})


/*/utilsation verification token/*/

