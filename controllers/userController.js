const { Thoughts, User } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getUserbyId(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }); 
            if (!userData) {
                return res.status(404).json({ message: 'No User found with this id!' });
                
            };
    
            
            res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
        const user = await User.create(req.body);
        res.json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
    
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
    
        await User.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: "User and associated thoughts deleted!" });
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
    
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
    
        res.json(user);
        } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    
    };