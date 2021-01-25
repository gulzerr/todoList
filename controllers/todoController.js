const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// var data = [{item:'Get milk'}, {item:'Workout'}, {item:'Coding'}]
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);

// var itmeOne = new Todo({item : 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

module.exports = function(app){
    app.get('/todo', function(req,res){
        // get data from mongo
        Todo.find({}, function(err, data){
            if(err) throw err;

            res.render('todo', {todos: data.map(v => ({ id: v._id.toString(), item: v.item }))});
        })
    });

    app.post('/todo',urlEncodedParser, function(req,res){
        // get from mong and add
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req,res){
        // remove item from mongodb
        var sub = req.params.item.replace(/\-/g,"");
        console.log(sub.length);
        console.log(sub);
        Todo.deleteOne({_id: ObjectId(sub)}, function (err, data) { 
            if (err) console.log(err);;
            res.send(data);
         })

        // data = data.filter(function(todo){
        //     console.log(`-${todo.item.replace(/ /g, '-')}-`, `-${todo.item.replace(/ /g, '-')}-` != req.params.item)
        //     return `-${todo.item.replace(/ /g, '-')}-` != req.params.item;
        // });
        // res.json(data);
    });
}