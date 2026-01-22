import express from 'express';
import Person from './../models/person.js'; // ✅

const router = express.Router();

router.post('/data', async (req, res) => {
  try{
      const data = req.form-data
      const newPerson = new Person(data);
      const savedData = await newPerson.save();
      console.log('data saved');
      res.status(201).json(savedData);
  }catch(e){
      res.status(500).json(e);
  }
})

router.get('/getData', async (req, res) => {
  try{
  const data = await Person.find();
  res.status(200).json(data);
  }catch(e){
      res.status(500).json(e);
  }
})
router.get('/person/:wtype', async (req,res) => {
  try{

    console.log(req.params.wtype);
    
    const wrktyp = req.params.wtype ;
    const personData = await Person.find({work: wrktyp});
    if(personData.length > 0){
        res.status(200).json(personData);
    }else{
        res.status(404).json('data not found');
    }
  }catch(e){
    res.status(500).json(e);
  }
});

router.put('/updtaePersonDetail/:personId', async (req,res) => {
    try{
        const id = req.params.personId;
        const updatedPersonData =req.body;
        console.log(id,updatedPersonData);
        const personData = await Person.findByIdAndUpdate(id,updatedPersonData,{
            new : true,
            runValidators:true,
        });
        console.log(personData);

        if(!personData){
            res.status(404).json('data not found');
        }
        res.status(200).json(personData);

    }catch(e){
        res.status(500).json(e);
    }
});


export default router;