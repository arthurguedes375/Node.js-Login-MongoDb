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

};

module.exports = loginController;