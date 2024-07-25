const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "qwertyuiopasdfghjklzxcvbm" ;

router.post("/createuser", [

    body('name').isLength({ min: 5 }),
    body('email', 'not in format').isEmail(),
    // password must be at least 8 chars long
    body('password', 'incorrect password').isLength({ min: 8 })],
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPaasword = await bcrypt.hash(req.body.password , salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPaasword,
                email: req.body.email,
                location: req.body.location
            })
            res.status(200).json({ message: "Successfully Created", success: true })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false })
        }
    })

router.post("/loginuser", [
    body('email', 'not in format').isEmail(),
    // password must be at least 8 chars long
    body('password', 'incorrect password').isLength({ min: 8 })], async (req, res, next) => {
         const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        let email = req.body.email
        try {
           
            let userdata = await User.findOne({ email });
            if (!userdata) {
                res.status(400).json({ message: "Try logging with correct credentials", success: false })
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userdata.password);
            if (!pwdCompare) {
                res.status(400).json({ message: "Try logging with correct credentials", success: false })
            }
            const data = {
                user:{
                    id:userdata.id
                }
            }
            const authToken = jwt.sign(data,jwtsecret)
            return res.status(200).json({ message: "Successfully Login", success: true,authToken:authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

module.exports = router;