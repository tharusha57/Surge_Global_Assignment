const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const axios = require('axios');

//require('dotenv').config()

//create a Token function
const createToken = ({ _id }) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//validate Human
const validateHuman = async (token) => {
    const secret = process.env.GOOGLE_SECRET
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)

    const data = await response.data
    return data.success
}

//create login authentication
const loginUser = async (req, res) => {
    const { emailOrUsername, password, token } = req.body

    const human = await validateHuman(token)

    if (!human) {
        return res.status(400).json({ error: 'Human verification failed' })
    } else {
        try {
            //log the user using statics function
            const user = await User.login(emailOrUsername, password)

            //create a token affter user logged in
            const token = createToken(user._id)

            const email = user.email
            const username = user.username
            const fullname = user.fullname
            const _id = user._id

            return res.status(200).json({ email, username, fullname, token, _id })

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

//create register function
const registerUser = async (req, res) => {
    const { username, email, password, fullname, token , profileImage } = req.body

    const human = await validateHuman(token)

    if (!human) {
        return res.status(400).json({ error: 'Human verification failed' })
    } else {
        try {
            //create a new user
            const user = await User.register(email, password, username, fullname , profileImage)
            const _id = user._id
            //create a token after user has registerd
            const token = createToken(user._id)

            return res.status(200).json({ email, token, username, fullname, _id , profileImage})
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
   }
}

module.exports = { loginUser, registerUser }