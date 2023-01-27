const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth  = async (req,res,next) => {

    //Grab the token from headers
    const {authorization} = req.headers

    //check if the authorization token exists in header
    if(!authorization){
        return res.status(401).json({error : 'Authorization Token Required'})
    }

    //Split the header
    const token = authorization.split(' ')[1]

    try {
        //verify the token
        const {_id} = jwt.verify(token , process.env.SECRET)

        //store the user in req.user
        req.user = await User.findOne({_id})
        next()
    } catch (error) {
        res.status(401).json({error : 'Request is not Authorized'})
    }
}

module.exports = requireAuth