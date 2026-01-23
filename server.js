import express from 'express'
import db from './db.js';
import Person from './models/person.js'; // ✅
import personRoutes from './routes/personRoutes.js'; // ✅
import 'dotenv/config'
// console.log(process.env)

const app = express();

// import Person from '.models/person.js';

// import bodyParsen from 'body-parsen'
// app.use(bodyParsen.json());

const logTime = (req,res,next)=>{
  console.log(`middleware for logging tims [${new Date().toLocaleString()}]`);
  next();
}

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(async (user_name,password,done) =>{
  try{
    const userExist = await Person.findOne({username:user_name})
    console.log('username and password :',user_name,password);

    if(!userExist){
      done(null,false,{message:'user not found'});
    }
    console.log(userExist);
    const isPwdMatch =(await userExist.comparePassword(password));
    
    if(isPwdMatch){
      done(null,userExist,{message:'user logged in'});
    }else{
      done(null,false,{message:'user credentials wrong'});
    }
  }catch(e){
    console.log(e);
  }
}));

app.use(passport.initialize());

// const isAUTH = (req,res,next) => {
//   if(req.isAUTH()){
//     return next()
//     console.log('loggedin');
//   }
//     res.status(401).json({ message: 'Unauthorized' });
// }
app.use(logTime);

app.use(passport.authenticate('local',{session:false}));   // login like middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',passport.authenticate('local',{session:false}), (req, res) => {
  res.send('Hello World')
})


app.use('/' ,personRoutes)
// app.use('/' ,passport.authenticate('local',{session:false}),personRoutes)

const port = process.env.PORT
app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})
