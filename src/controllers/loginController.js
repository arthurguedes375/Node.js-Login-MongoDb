const mongoose = require('mongoose');
const Login = require('../models/login');


// Config
const bcryptConfig = require('../config/bcryptConfig');


// Cryptography
const crypto = require('crypto');
const bcrypt = require('bcrypt');


const loginController = {

    signup: async (req, res) => {
        try {
            const { name, email, password: passwordBody } = req.body;
            if (!name || !email || !passwordBody) return res.status(400).json({ message: "Missing Data" });


            const loginExists = await Login.findOne({ email }).exec();
            if (loginExists) return res.status(401).json({ message: "User already Exists" });


            const access_token = crypto.randomBytes(40).toString("hex");

            const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);

            const login = new Login({
                _id: mongoose.Types.ObjectId(),
                name,
                email,
                password,
                access_token
            });

            await login.save();

            return res.status(201).json(login)
        } catch (error) {
            return res.status(500).json({ error })
        }
    },

    signin: async (req, res) => {
        try {

            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ message: "Missing Data" });

            const login = await Login.findOne({ email }, '+password').exec();

            if (!login) return res.status(401).json({ message: "Email or Password is Wrong" });

            const isPasswordValid = await bcrypt.compare(password, login.password);
            if (!isPasswordValid) return res.status(401).json({ message: "Email or Password is Wrong" });

            return res.status(200).json({ access_token: login.access_token });

        } catch (error) {
            return res.status(500).json({ error });
        }
    },

};

module.exports = loginController;