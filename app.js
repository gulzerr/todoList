const express = require('express');
const mongoose = require('mongoose');
const todoController = require('./controllers/todoController');

const port = 3000;

const app = express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire  controllers
todoController(app);


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD
    }@cluster0-0aum2.mongodb.net/${process.env.MONGO_DB
    }?retryWrites=true&w=majority`).then(() => {
    app.listen(port, function () {
        console.log('app listnening on port ' + port);
    });
}).catch(err => {
    console.log(err);
});