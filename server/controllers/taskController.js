const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const query = 'SELECT * FROM Tasks';

  db.query(query)
    .then(data => {
      res.locals.tasks = data.rows;
      return next();
    })
    .catch(err =>{
      return next(err);
    });
};

taskController.postTask = (req, res, next) => {
  const values = [req.body.id, req.body.task];

  const query = 'INSERT INTO Tasks (id, task) VALUES ($1, $2)';
  console.log('hi');
  db.query(query, values)
    .then(data =>{
      return next();
    })
    .catch(err =>{
      return next(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  const id = [req.params.id];
  const query = 'DELETE FROM Tasks WHERE id = $1';
  
  db.query(query, id)
    .then(data =>{
      if(data.rowCount === 0){
        return next({message: 'Item to be deleted not found'});
      }
      return next();
    })
    .catch(err =>{
      return next(err);
    });
};

module.exports = taskController;
