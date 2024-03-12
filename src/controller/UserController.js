
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

// Verifying OTP
exports.verifyOTP= async (req,res)=>{

    try{
        const { email, otp} = req.params;
        const user = await OTPModel.find({ email:email, otp:otp, status: "active" });
        if( user.length > 0 ){
            await OTPModel.updateOne({ email:email, otp:otp } , { status: "verified" });
            res.json({
                status: 200,
                message: "OTP Verified Successfully"
            })
        }
        else{
            res.json({
                status: 500,
                message: "Invalid OTP"
            })
        }
    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })

    }
}


// Password Reset
exports.passwordReset = async (req, res) => {

    try {
        const { email, otp, password } = req.params;
        let user = await OTPModel.find({ email: email, otp: otp, status: 'verified' })
        if (user.length > 0) {
            await OTPModel.deleteOne({ email: email, otp: otp })
            await UserModel.updateOne({ email: email }, { password: password });
            res.json({ status: "success", message: "Password Update Success" })
        }
        else {
            res.json({ status: "fail", message: "Invalid Request" })
        }

    } catch (err) {
        res.json({ status: "fail", message: err })
    }

}



