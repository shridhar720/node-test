import mongoose from 'mongoose';

// creating Schema
const personSchema =new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    age:{
        type :Number,

    },
    work:{
        type:String,
        enum:['chef','waiter','manger'],
        required : true

    },
    mobile:{
        type:String,
        required : true

    },
    email:{
        type:String,
        required : true,
        // unique : true
    },
    address:{
        type:String,
        required : true,
    },
    salary:{
        type:Number,
        required : true,
    }

});

// create model

const Person = mongoose.model('person', personSchema);
// module.exports = Person;
export default Person;
