const { User, Thoughts } = require("../models");

module.exports ={
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getThoughtbyId(req,res) {
        try{
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
                
            };
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughts._id } },
                { new: true }
            );
            
            if (!userData) {
                return res.status(404).json({ message: 'Thought created, but found no user with that ID!' })
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
                
            };
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!thoughtData) {
                return res.status(404).json({ message: 'No Thought found with this id!' });
                
            };

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtsId },
                { $pull: { thoughts: req.params.thoughtsId } },
                { new: true }
            );

            if (!userData) {
                return res.status(404).json({ message: 'Thought has been deleted but no user with this id exists!' })
            };

            res.status(200).json({ message: 'Thought has been successfully deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


}