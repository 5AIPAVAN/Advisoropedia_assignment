const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const rateLimit = require('express-rate-limit');

// Define rate limiting options for login route
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, please try again later.',
});

router.post('/createuser', [
    body('name', 'ENTER A VALID NAME').isLength({ min: 3 }),
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password', 'ENTER A VALID PASSWORD').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // **** TRY-CATCH - must and shoulf for good error handling ***
    try {
        // Check whether user with entered email already exists 
        let check_username = await User.findOne({ name: req.body.name });
        if (check_username) {
            return res.status(400).json({ success, error: "Username already exists...please choose another username" })
        }
        // Check whether user with entered email already exists 
        let check_user = await User.findOne({ email: req.body.email });
        if (check_user) {
            return res.status(400).json({ success, error: "email already exists .. please try to Login" })
        }



        // if no errors (and when no user exists with given email as checked above)

        //generating salt for hashing
        const salt = await bcrypt.genSaltSync(10);
        //hashing user password and adding salt
        const encoded_password = await bcrypt.hashSync(req.body.password, salt);
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encoded_password
        })

        // USING JWT 
        const JWT_SECRET_KEY = "$@IPAVAN";
        const DATA = {
            user: {
                id: user.id
            }
        }
        const jwt_data = await jwt.sign(DATA, JWT_SECRET_KEY);
        console.log(jwt_data);
        success = true;
        res.json({ success, result: "ADDED TO DATABASE SUCCESSFULLY", hashedpassword: encoded_password, jwttoken: jwt_data })

    } catch (error) {

        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");
    }
})



router.post('/login', loginLimiter, [
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password', 'ENTER A VALID PASSWORD(min length: 5 )').isLength({ min: 5 })
], async (req, res) => {



    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        let success = false;
        // destructuring req.body to abstract email,password from it
        const { email, password } = req.body;

        // checking whether entered email is registered or not
        let found_user = await User.findOne({ email });

        // if no user is found with entered email
        if (!found_user) {
            return res.status(400).json({ success, error: "USER DOES'NT EXIST" })
        }


        const passwordCompare = await bcrypt.compare(password, found_user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "PASSWORD IS NOT CORRECT" })
        }


        const DATA = {
            found_user: {
                id: found_user.id
            }
        }
        const JWT_SECRET_KEY = "$@IPAVAN";
        const jwt_data = await jwt.sign(DATA, JWT_SECRET_KEY);
        success = true;

        res.json({ success, result: "LOGIN SUCCESSFULL(user found)", jwttoken: jwt_data })




    } catch (error) {

        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");

    }



})





router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("ingetuser : " + req.user.id)
        const userr = await User.findById(userId).select("-password");
        console.log(userr);
        res.json(userr);
    } catch (error) {
        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");
    }
})


router.post('/resetpassword', fetchuser, [
    body('currentPassword', 'ENTER YOUR CURRENT PASSWORD').notEmpty(),
    body('newPassword', 'ENTER A VALID NEW PASSWORD (min length: 5)').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Check if the current password matches
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, error: "USER DOESN'T EXIST" });
        }

        const passwordCompare = await bcrypt.compare(currentPassword, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "CURRENT PASSWORD IS NOT CORRECT" });
        }

        // Update the password with the new one
        const salt = await bcrypt.genSaltSync(10);
        const newEncodedPassword = await bcrypt.hashSync(newPassword, salt);

        user.password = newEncodedPassword;
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error("SOME ERROR OCCURRED (try-catch):", error.message);
        res.status(500).send("SOME ERROR OCCURRED (try-catch)");
    }
});

module.exports = router;