const TaskController = require('../Controller/TaskController');
const express = require('express');

const router = express.Router();

router.post('/create', TaskController.createTask);

router.get('/get', TaskController.getTasks);

router.post('/update/:id', TaskController.updateTask);

router.delete('/delete/:id', TaskController.deleteTask);

module.exports = router;