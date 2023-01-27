const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    fullname: {
        type: String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    profileImage : {
        type: String
    }
})

userSchema.statics.register = async function(email , password , username , fullname , profileImage) {

    //Input validation using Validator
    if(!email || !username  || !password || !fullname){
        throw Error('Please Fill in all Fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong Enough')
    }

    //Check if the user exists with the email
    const exist = await this.findOne({email})          

    if(exist){
        throw Error('Email already Exisits')
    }

    //Generating hash for the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    //Create the user
    const user = await this.create({username , fullname , email , password: hash , profileImage})

    return user
}

userSchema.statics.login = async function( emailOrUsername , password){
    //check if neccessary inputs are filled
    if(!password || !emailOrUsername){
        throw Error('All fields must be Filled')
    }

    //check if the input is an email or username
    let user = {}
    if(validator.isEmail(emailOrUsername)){
        user = await this.findOne({email : emailOrUsername})
    }else{
        user = await this.findOne({username : emailOrUsername})
    }

    if(!user){
        throw Error('Credentials are Invalid')
    }

    //check if the password matches
    const match  = await bcrypt.compare(password , user.password)

    //if credentials are incorrect
    if(!match){
        throw Error('Credentials are Invalid')
    }

    return user
}

module.exports = mongoose.model('User' , userSchema)