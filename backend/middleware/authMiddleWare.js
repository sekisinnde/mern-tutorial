const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           // get token from header 
           token = req.headers.authorization.split(' ')[1]
         
           // verify le token
           const decoded = jwt.verify(token,`${process.env.JWT_SECRET_KEY}`)

           //Get user from the token
           //req.user = await User.findById(decoded.id).select('-password')
           req.user = await User.findOne(decoded.name).select('-password')
           next()
        } catch (error) {
            console.log(error)
            res.status(401)  // not authorised
            throw new Error('Not authorised')  
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Non not token Non accss athorized!')
    }

})
module.exports = {protect}