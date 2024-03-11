
const UserModel = require("../model/UsersModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utility/SendEmail");
const OTPModel = require("../model/OTPModel");



// User Registration Function
exports.registration= async (req,res)=>{
    try{
        let reqBody = req.body;
        await UserModel.create(reqBody);
        res.json({
            status: 200,
            message: "Registration Successful"
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }

}


// User Login Function
exports.login = async (req, res) => {
    try {
        let reqBody = req.body;
        let user = await UserModel.findOne({ email: reqBody.email });

        if (user) {
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: reqBody.email
            };
            let token = jwt.sign(Payload, "secretKey");
            res.json({
                status: 200,
                message: "Login Successful",
                token: token
            });
        } else {
            res.json({
                status: 500,
                message: "User Not Found"
            });
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        });
    }
};


// User Profile Details
exports.profileDetails= (req,res)=>{

}


exports.profileUpdate= (req,res)=>{


}


exports.verifyEmail= (req,res)=>{


}


exports.verifyOTP= (req,res)=>{



}

exports.passwordReset= (req,res)=>{



}

