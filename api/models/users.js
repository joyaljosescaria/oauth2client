const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    refreshToken: { type: String },
    state: { type: String},
    codeVerifier: { type: String},
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("User", UserSchema);