'use strict';

var gfilterIs;

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();///he get an array after filter
   
    var strHTMLs = '';
    var elTodoList = document.querySelector('.todo-list');
    if (todos.length !== 0) {
        strHTMLs = todos.map(function (todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `
            <li onclick="onTodoToggle(${todo.id})" class="${className}">
                ${todo.txt}
                <button onclick="onRemoveTodo(event, ${todo.id})">x</button>
            </li>`
        })
        elTodoList.innerHTML = strHTMLs.join('');

    } else {
        if (gfilterIs === 'All') {
            strHTMLs = 'No todos';
        } else if (gfilterIs === 'Done') {
            strHTMLs = 'No Done Todos';
        } else {
            strHTMLs = 'No Active Todos';
        }
        elTodoList.innerText=strHTMLs;
    }
    renderStats();
}

function renderStats() {
    document.querySelector('.todo-count').innerText = getTodoCount();
    document.querySelector('.active-count').innerText = getActiveTodoCount();
}

function onRemoveTodo(event, todoId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeTodo(todoId);
        renderTodos();
    }
}
function onAddTodo(importance) {
    var elTxt = document.querySelector('.add-todo-container input');
    var imp = +importance;
    var txt = elTxt.value;
    if (!txt) return;
    addTodo(txt, imp)
    elTxt.value = '';
    renderTodos();
}

function onTodoToggle(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onFilterChanged(filterBy) {
    setTodoFilter(filterBy);
    gfilterIs = filterBy;
    renderTodos();
}

function onSortChange(sortBy) {
    setTodoSort(sortBy);
    renderTodos();
}

