const express = require("express");
const router =  require("./src/route/api");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const mongoose = require("mongoose");

// connecting cors
app.use(cors());

//Security middleware
app.use(helmet());
app.use(hpp());
app.use ( express.json({ limit:"10mb" }));
app.use(express.urlencoded({ extended: true, limit:"10mb" }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});

app.use(limiter);

//db connecting

let URL = "mongodb://localhost:27017/TaskManager";
let OPTIONS = { user:"", pass:"", autoIndex: true };
mongoose.connect(URL, OPTIONS).then((res) => {
    console.log('db connected');
}).catch((err) => {
    console.log(err);
});


app.use("/api",router);

// 404 error handler
app.use("*", (req, res) => {
    res.status(404).json({ status: 404, message: "Not Found" });
})

module.exports = app;