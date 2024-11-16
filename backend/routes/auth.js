const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { getValue } = require('@testing-library/user-event/dist/utils');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = "RohanIs#1"

//Route 1:-create a user using: Post "/api/auth/createuser" no login required
router.post('/createuser', [
    
    body('name'),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let sucess=false;
    const errors = validationResult(req);
    //if there is bad request error occurs
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });;
    }
    //
    try {

       
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ sucess,error: "user with same email already exist" })
        }
        let salt = await bcrypt.genSalt(10)
        let securepass = await bcrypt.hash(req.body.password, salt)
        user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepass,
        })
        //     .then(user=> res.json (user)).catch
        //     (errors=>{console.log(errors)
        // res.json({errors :'please enter a unique eamil'})}
        // )
        const data = {
            user: {
                id: user.id

            }

        }
        const authtoken = jwt.sign(data, JWT_Secret)
        console.log(authtoken)
        // res.json(user)
        sucess=true
        res.json({ sucess,authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occur")

    }


})
// Route 2 :-login a user using: Post "/api/auth/login" no login required
router.post('/login', [
   

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can\'t be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    //if there is bad request error occurs
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });;
    }
    let sucess=false
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ sucess, errors: "please try to login with correct credentail" })
        }

        const passwordcompare = await bcrypt.compare(password, user.password)

        if (!passwordcompare) {
            return res.status(400).json({ sucess,errors: "enter a valid please try to login with correct credentail" })
        }
        const data = {
            user: {
                id: user.id

            }

        }
        const authtoken = jwt.sign(data, JWT_Secret)
        sucess=true
        console.log(authtoken)
        // res.json(user)
        res.json({ sucess,authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500) .send("some error occur")

    }
})

//Route 3:-get  a user detail using: Post "/api/auth/getuser"  login required
router.post('/getuser',fetchuser, async (req, res) => {
   
    

        try {

            userId=req.user.id
            const user=await User.findById(userId).select("-password")
            res.send(user)
            
        } catch (error) {
            console.error(error.message);
            res.status(500) .send("some error occur")
    
        }
    
})
module.exports = router