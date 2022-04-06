const express = require("express");
var fs = require("fs");
var app = express();

app.use(express.json());


function readContent(path, callback){
    fs.readFile(path, "utf-8", function(err, data){
        callback(data);
    });
}

app.get("/", function(req, res){
    readContent("todo/index.html", function(data){
        res.end(data);
    });
});

app.get("/script.js", function(req, res){
    readContent("todo/script.js", function(data){
        res.end(data);
    });
});

app.get("/style.css", function(req, res){
    readContent("todo/style.css", function(data){
        res.end(data);
    });
});

app.post("/save", function(req, res){
    readContent("db.txt", function(data){
        var todos = [];
        if(data.length > 0){
            todos = JSON.parse(data);
        }
        todos.push(req.body);

        fs.writeFile("db.txt", JSON.stringify(todos), function(err){
            if(err)
                res.end("error occured!!!");
            res.end();
        });
    });
});

app.get("/todos", function(req, res){
    readContent("db.txt", function(data){
        res.end(data);
    });
});

app.post("/deleteTodo", function(req, res){
    readContent("db.txt", function(data){
        var todos = [];
        if(data.length > 0){
            todos = JSON.parse(data);
        }
        var todoToDelete = req.body;
        for(var i = 0; i < todos.length; i++){
            if(todos[i].id === todoToDelete.id)
                todos.splice(i, 1);
        }
        fs.writeFile("db.txt", JSON.stringify(todos), function(err){
            if(err)
                res.end("error occured!!!");
            res.end();
        });
    });
});

app.post("/readTodo", function(req, res){
    readContent("db.txt", function(data){
        var todos = [];
        if(data.length > 0){
            todos = JSON.parse(data);
        }
        var todoToRead = req.body;
        for(var i = 0; i < todos.length; i++){
            if(todos[i].id === todoToRead.id)
                todos[i].read = !todos[i].read;
        }
        fs.writeFile("db.txt", JSON.stringify(todos), function(err){
            if(err)
                res.end("error occured!!!");
            res.end();
        });
    });
});

app.listen(3000, function(){
    console.log("app is live at port 3000");
});