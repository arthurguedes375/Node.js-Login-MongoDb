// Mongoose
const mongoConfig = require('../../src/config/mongoConfig');
const mongoose = require('mongoose');
mongoose.connect(mongoConfig.connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })


// Models
const Login = require('../../src/models/login');


let user;

describe('Sign', () => {
    it('should return the database user created (Sign Up)', async () => {
        const createUser = await new Login({
            _id: mongoose.Types.ObjectId(),
            name: "Arthur Guedes",
            email: "arthurguedes375@gmail.com",
            password: "abc123",
            access_token: "3213213213213213213",
        }).save();
        user = createUser;
        expect(createUser.name).toBe('Arthur Guedes');
        expect(createUser.email).toBe('arthurguedes375@gmail.com');
        expect(createUser.password).toBe('abc123');
        expect(createUser.access_token).toBe('3213213213213213213');
    });

    it('should return the access_token with valid credentials (Sign In)', async () => {
        const makeSession = await Login.findOne({ email: user.email, password: user.password }).exec();
        expect(makeSession.access_token).toBe(user.access_token);
    })

});

describe('Account', () => {
    it('should delete an account from db', async () => {
        const deleteUser = await Login.remove({ _id: user._id }).exec();
        expect(deleteUser.deletedCount).toBe(1);
    });
});