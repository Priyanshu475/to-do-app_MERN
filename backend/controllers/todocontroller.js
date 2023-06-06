const ToDo = require('../models/to-do-model');

const todo_index = (req, res) => {
  ToDo.find().sort({ createdAt: -1 })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
        });
}

const todo_details = (req, res) => {
  const id = req.params.id;
  ToDo.findById(id)
    .then(result => {
        res.json(result)
        })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}


const todo_create_post = (req, res) => {
  const blog = new ToDo(req.body);
  blog.save()
    .then(result => {
      res.json(result)
      console.log("Todo Added")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

const todo_delete = (req, res) => {
  const id = req.params.id;
    ToDo.findByIdAndDelete(id)
    .then(result => {
      res.json(result)
      console.log("Todo Deleted")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

module.exports = {
  todo_index, 
  todo_details, 
  todo_create_post, 
  todo_delete
}