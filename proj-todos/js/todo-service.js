'use strict'

const KEY = 'todos'
var gTodos = _createTodos();
var gFilterBy = 'All';




function getTodosForDisplay() {
    if (gFilterBy === 'All') {
        return gTodos;
    }
    var todosForDisplay = gTodos.filter(function (todo) {
        return (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)
    })

    if (gFilterBy === 'Done' && (todosForDisplay.length === 0)){
        todosForDisplay = 'No Done Todos';
    } 

    return todosForDisplay;
}


function getTodoCount() {
    return gTodos.length
}
function getActiveTodoCount() {
    var count = gTodos.reduce(function (acc, todo) {
        return acc + ((todo.isDone) ? 0 : 1);
    }, 0);
    return count;
}


function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    saveToStorage(KEY, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage(KEY, gTodos);

}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo);
    saveToStorage(KEY, gTodos);
}


function setTodoFilter(filterBy) {
    gFilterBy = filterBy;
}

function createdAt(timestamp) {
    return timestamp;
}

function setTodoSort(sortBy) {
    if (sortBy === 'todo') {
        gTodos.sort(compareByTxt);
    } else if (sortBy === 'create') {
        gTodos.sort(compareByDate);
    } else if (sortBy === 'importance') {
        gTodos.sort(compareByImportance);
    }

}


function compareByImportance(a, b) {
    if (a.importance < b.importance) {
        return -1
    } else if (a.importance > b.importance) {
        return 1
    } else {
        return 0
    }
}


function compareByDate(a, b) {
    if (a.creatAt < b.creatAt) {
        return -1
    } else if (a.creatAt > b.creatAt) {
        return 1
    } else {
        return 0
    }
}



function compareByTxt(a, b) {
    if (a.txt < b.txt) {
        return -1;
    }
    if (a.txt > b.txt) {
        return 1;
    }
    return 0;
}


// Private functions:
function _createTodos() {
    var todos = loadFromStorage(KEY);
    if (todos) return todos;

    var todos = ['Learn HTML', 'Master CSS', 'Enjoy Javascript']
        .map(_createTodo)

    return todos;
}

function _createTodo(txt, imp) {
    return {
        id: parseInt(Math.random() * 1000),
        txt: txt,
        isDone: false,
        creatAt: createdAt(Date.now()),
        importance: imp
    }
}
