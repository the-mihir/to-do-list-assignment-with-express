
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
exports.profileDetails= async (req,res)=>{

   try{
    let email = req.headers["email"];
    let getUser = await UserModel.find({email: email})
    res.json({
        status: 200,
        data: getUser
    })
   }catch(error){
    res.json({
        status: 500,
        message: error.message
    })
   }



}


//updating profile Function
exports.profileUpdate= async (req,res) =>{
    try{
        let email = req.headers["email"];
        let reqBody = req.body;
        let updateUser = await UserModel.updateOne({email: email}, reqBody);
        res.json({
            status: 200,
            message: "Profile Updated Successfully",
        })
    }catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}


// Verifying user Email
exports.verifyEmail= async (req,res)=>{

    try{
        const { email } = req.params;
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            let OTP = Math.floor(1000 + Math.random() * 9000);
            await sendEmail(email, `Your OTP is ${OTP}`, "To Do list App Rest API Verification OTP");
            await OTPModel.create({ email, otp: OTP, status: "active" });
            res.json({
                status: 200,
                message: "OTP Sent Successfully! please check your email inbox"
            })
        } else {
            res.json({
                status: 500,
                message: "User Not Found"
            })
        }
    }

    catch(error){
        res.json({
            status: 500,
            message: error.message
        })
    }

}


exports.verifyOTP= (req,res)=>{



}

exports.passwordReset= (req,res)=>{



}

