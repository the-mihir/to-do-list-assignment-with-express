const TaskModel = require("../model/TasksModel");

// Creating Task
exports.addTask = async (req, res) => {

    try{
        let email = req.headers["email"];
        let reqBody = req.body;
        reqBody.email = email;
        await TaskModel.create(reqBody);
        res.json({
            status: 200,
            message: "Task Added Successfully"
        })

    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })

    }
}


exports.getTask = async ( req, res)=>{
    try{
        let email = req.headers["email"];
        let data = await TaskModel.find({email: email});
     res.json({
         status: 200,
         data: data
     })

    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })

    }
}


// Update Task
exports.updateTask = async (req, res) => {
    try{
        let email = req.headers["email"];
        let {id} = req.params;
        let reqBody = req.body;
        let getTask = await TaskModel.updateOne({_id: id,email: email}, reqBody);
        res.json({
            status: 200,
            message: "Task Updated Successfully",
            data: getTask
        })
    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}



exports.deleteTask = async (req, res) => {
    try{
        let email = req.headers["email"];
        let {id} = req.params;
        let reqBody = req.body;
        await TaskModel.deleteOne({ _id: id,email: email}, reqBody);
        res.json({
            status: 200,
            message: "Task Deleted Successfully"
        })
    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}