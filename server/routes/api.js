const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

router.get('/tasks', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

router.post('/tasks', taskController.postTask, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  return res.sendStatus(200);
});


module.exports = router;