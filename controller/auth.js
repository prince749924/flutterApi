const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//register funtion
const registerUser = asyncHandler( 
    async(req, res) => { 
    const { username, email, password} = req.body; 
    const userExits = await User.findOne({ username }); 
    if (userExits) { 
        res.status(400) 
        throw new Error("User already exits"); 
    } 
    const user = await User.create({ username, email, password}); 
    if (user) { 
        res.status(201).json({
             _id: user._id, 
             name: user.username,
             email: user.email,
             batch: user.batch,
             course: user.course,
             isAdmin: user.isAdmin, }) 
    } else { res.status(400) 
        throw new Error("error occured")
     }
     }
      );
const authUser = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: "User not found" });
        if (user == null) {
            let err = new Error(`User ${req.body.username} not been found `)
            res.status(404)
            return next(err)
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Wrong password or Email" });
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, {
            expiresIn: "1h"
        });
        const details = {
            id: user.id,
            name: user.username,
            otherDetails: user.otherDetails,
            isAdmin: user.isAdmin,
            token
        };
        res.cookie("access_token", token, { httpOnly: true });
        res.status(200).json({ details });
        } catch (error) {
        next(error);
    }
};
module.exports = { registerUser, authUser }