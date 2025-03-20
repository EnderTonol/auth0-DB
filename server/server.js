const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userAccoutSchema = {
    username: String,
    _uid: String,
    email: String,
    firstSignUpDate: String,
    todos: Array,
};

const userAccount = new mongoose.model("user_accouts", userAccoutSchema);

app.post('/sign-in', async (req, res) => {
    try {
        const { username, email, firstSignUpDate, _uid } = req.body;

        // Check if user already exists
        const existingUser = await userAccount.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }else{
        const newUser = new userAccount({
            username,
            email,
            firstSignUpDate,
            _uid,
        });

        await newUser.save();
        res.json({ message: 'Sign-up successful' });
    }
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/todos/:username', async (req, res) => {
    try {
        const user = await userAccount.findOne({ _uid: req.params.username });
        console.log("12",user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); // Use the correct port
});