const express = require('express');
const router = express.Router();
const validate = require('../validates/create.validate');
const controller = require('../controllers/task.controller');

router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.patch('/change-status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.post('/create', validate.createPost, controller.create);

router.patch('/edit/:id', validate.createPost, controller.edit);

router.delete('/delete/:id', controller.delete);
module.exports = router;