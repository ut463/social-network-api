const { Schema, Types, model, get } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    });

    const User = model('user', userSchema);
    
model.exports = User;