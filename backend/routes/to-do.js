const router = require('express').Router();

const todocontroller = require('../controllers/todocontroller');


router.get('/', todocontroller.todo_index);
router.post('/create', todocontroller.todo_create_post);
router.delete('/:id', todocontroller.todo_delete);

module.exports = router;