const mongoose = require('mongoose');
const TaskCollection = require("../Model/TaskModel");

exports.createTask = async (req, res) => {
    try {
        const task = new TaskCollection({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getTasks = async(req, res) => {
    try {
        const tasks = await TaskCollection.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateTask = async(req, res) => {
    try{
        const ap = {
            title: req.body.title,
            descriptio: req.body.description,
            status: req.body.status
        };

      const dta = await TaskCollection.findByIdAndUpdate(req.params.id, {
            $set: ap}, {new: true});
            res.status(200).send(dta)
    }   catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.deleteTask = async(req,res) => {
    TaskCollection.findByIdAndDelete(req.params.id)
        .then((data) => {res.status(200).send(data);},
        console.log(data, "Task deleted successfully")
        
        ).catch((error) => {
            res.status  (500).send(error);
            console.log(error)
    
})}