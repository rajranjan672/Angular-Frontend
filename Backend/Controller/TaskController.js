const mongoose = require('mongoose');
const TaskCollection = require("../Model/TaskModel");

exports.createTask = async (req, res) => {
    try {
      const task = new TaskCollection({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });
  
      await task.save();
      // Send response in the expected format
      res.status(201).json({
        success: true,
        data: task,  // Wrap task in the 'data' field
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,  // Send error message
      });
    }
  };
  

exports.getTasks = async (req, res) => {
    try {
      const tasks = await TaskCollection.find();
      // Send response in the expected format
      res.status(200).json({
        success: true,
        data: tasks,  // Wrap tasks in the 'data' field
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const updatedData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      };
  
      const updatedTask = await TaskCollection.findByIdAndUpdate(req.params.id, {
        $set: updatedData,
      }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedTask,  // Wrap updated task in the 'data' field
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,  // Send error message
      });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      const deletedTask = await TaskCollection.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: deletedTask,  // Wrap deleted task in the 'data' field
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,  // Send error message
      });
    }
  };
  