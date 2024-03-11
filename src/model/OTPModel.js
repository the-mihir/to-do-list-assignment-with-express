const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    otp: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true, versionKey: false });


const OTPModel = mongoose.model("otp", otpSchema);
module.exports = OTPModel