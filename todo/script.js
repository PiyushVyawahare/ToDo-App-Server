var input = document.getElementById("input");
var btn = document.getElementById("btn");
var todoList = document.getElementById("todoList");


btn.addEventListener("click", function(){
    if(input.value){
        var todo = {
            id: Date.now(),
            todo: input.value,
            read: false
        }
        var request = new XMLHttpRequest();
        request.open("POST", "/save");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(todo));

        request.addEventListener("load", function(){
            var list = document.createElement("li");
            list.innerHTML = input.value;

            var btnDiv = document.createElement("div");
            btnDiv.id = "btnDiv";

            var readCheck = document.createElement("input");
            readCheck.setAttribute("type", "checkbox");
            readCheck.setAttribute("id", "readCheck");
            btnDiv.appendChild(readCheck);
            readCheck.addEventListener("change", onTodoRead(todo));

            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("id", "deleteBtn");
            deleteBtn.innerHTML = "X";
            btnDiv.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", onDeleteButtonClicked(todo));

            list.appendChild(btnDiv);

            todoList.appendChild(list);

            input.value = "";
        });   
    }
});

function onLoad(){
    todoList.innerHTML = "";
    getAllTodos();
}

onLoad();

function getAllTodos(){
    var request = new XMLHttpRequest();
    request.open("GET", "/todos");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.addEventListener("load", function(){
        todos = [];
        if(request.responseText !== "")
            todos = JSON.parse(request.responseText);

        todos.forEach(addTodoTOList);
    });
}


function addTodoTOList(todo){
    var list = document.createElement("li");
    list.innerHTML = todo.todo;

    var btnDiv = document.createElement("div");
    btnDiv.id = "btnDiv";

    var readCheck = document.createElement("input");
    readCheck.setAttribute("type", "checkbox");
    readCheck.setAttribute("id", "readCheck");
    readCheck.addEventListener("change", onTodoRead(todo));
    if(todo.read === true){
        readCheck.checked = true;
        list.style.textDecoration = "line-through";
    }
    else{
        readCheck.checked = false;
        list.style.textDecoration = "none";
    }
    btnDiv.appendChild(readCheck);

    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "deleteBtn");
    deleteBtn.innerHTML = "X";
    btnDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", onDeleteButtonClicked(todo));

    list.appendChild(btnDiv);

    todoList.appendChild(list);
}

function onDeleteButtonClicked(todo){
    return function(){
        var request = new XMLHttpRequest();
        request.open("POST", "/deleteTodo");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(todo));

        request.addEventListener("load", function(){
            todoList.innerHTML = "";
            getAllTodos();
        });
    }
}

function onTodoRead(todo){
    return function(){
        var request = new XMLHttpRequest();
        request.open("POST", "/readTodo");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(todo));

        request.addEventListener("load", function(){
            todoList.innerHTML = "";
            getAllTodos();
        });
    }
}