const Task = require('../models/TaskModel');


function postTask(req, res, next) {
  console.log('postTask');
  const { item } = req.body;
  const newItem = new Task({item: item});
  newItem.save((err, item) => {
    if (err) return res.status(400).json(err);
    res.locals.item = item;
    next();
  });
}

function getTasks(req, res, next) {
  console.log('getTasks');
  Task.find({}, (err, list) => {
    if (err) return res.status(400).json(err);
    res.locals.list = list;
    next();
  });
}

function deleteTask(req, res, next) {
  console.log('deleteTask');
  const { item } = req.body;
  const query = {item: item};
  Task.findOneAndDelete(query, (err) => {
    if (err) return res.status(400).json(err);
    res.locals.item = item;
    next();
  });
}

module.exports = { postTask, getTasks, deleteTask };
