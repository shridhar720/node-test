import express from 'express'
import db from './db.js';
// import Person from './models/person.js'; // ✅
import personRoutes from './routes/personRoutes.js'; // ✅



// test push

const app = express();

// import Person from '.models/person.js';

// import bodyParsen from 'body-parsen'
// app.use(bodyParsen.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/' ,personRoutes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
