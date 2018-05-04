var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://usrmean:$WwW$678@ds031632.mlab.com:31632/mean-app', ['tasks']);


// Get All Tasks - http://localhost:3000/api/tasks/
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err) res.send(err);
        res.json(tasks);
    });
});

// Get Single Task - http://localhost:3000/api/tasks/5aea2734734d1d06be08829d
router.get('/tasks/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err) res.send(err);
        res.json(task);
    });
});

// Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || task.isDone == null){
        res.status(400);
        res.json({
            "error" : "Bad Data" + task.title + task.isDone
        });
    }else{
        db.tasks.save(task, function(err, task){
            if(err) res.send(err);
            res.json(task);
        });
    }
});

// Delete Single Task - http://localhost:3000/api/task/5aea2734734d1d06be08829d
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err) res.send(err);
        res.json(task);
    });
});

// Put Single Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }

    if(Object.keys(updTask).length == 0){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},  updTask, {}, function(err, task){
            if(err) res.send(err);
            res.json(task);
        });
    }
});



// to be accessible for other files
module.exports = router;