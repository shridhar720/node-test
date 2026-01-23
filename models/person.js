import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    },
    username:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required:true
    }


});

    personSchema.pre('save',async function (next) {
        const person = this;
        try{
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(person.password, salt);

            person.password = hashedPassword;
            next();      
        }catch(e){
            next(e);
        }
    })

    personSchema.methods.comparePassword =async function (userPass) {
        const isMatch = await bcrypt.compare(userPass,this.password);
        return isMatch;
    }

// create model

const Person = mongoose.model('person', personSchema);
// module.exports = Person;
export default Person;
