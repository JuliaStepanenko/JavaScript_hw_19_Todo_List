const template = createEmptyTemplate();

document.getElementById('todoForm')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea');
        const todoItem = {};

        for(let input of inputs) {
            if(input.value === '') return alert('Заполние форму!');
            todoItem[input.name] = input.value;
        }

        saveItem(todoItem);
        renderItem(todoItem);
        e.target.reset();
    })


window.addEventListener('load', function (e) {
    if(!localStorage.todos) return;

    const todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(function (item) {
        renderItem(item)
    });
})


function saveItem(todoItem) {
    if(localStorage.todos) {
        let todosArray = JSON.parse(localStorage.todos);
        todosArray.push(todoItem);
        todosArray = JSON.stringify(todosArray);
        localStorage.setItem('todos', todosArray);
        return;
    }

    let todosArray = JSON.stringify([todoItem]);
    localStorage.setItem('todos', todosArray)
}


function renderItem(todoItem) {
    const localTemplate = template.cloneNode(true);
    localTemplate.querySelector('.taskHeading').innerText = todoItem.title
    localTemplate.querySelector('.taskDescription').innerText = todoItem.description;
    document.getElementById('todoItems').prepend(localTemplate);
}


function createEmptyTemplate() {
    const col = document.createElement('div');
    col.className = 'col-4';

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'taskWrapper';
    col.append(taskWrapper);

    const taskHeading = document.createElement('div');
    taskHeading.className = 'taskHeading';

    const taskDescription = document.createElement('div');
    taskDescription.className = 'taskDescription';

    taskWrapper.append(taskHeading);
    taskWrapper.append(taskDescription);

    //
    const taskCompleted = document.createElement('div');
    taskCompleted.className = 'taskCompleted';
    taskWrapper.append(taskCompleted);

    const taskCheckBox = document.createElement('input');
    taskCheckBox.setAttribute("type", "checkbox");
    taskCheckBox.className = 'taskCheckBox';
    taskCompleted.append(taskCheckBox);

    const taskCompletedStatus = document.createElement('div');
    taskCompletedStatus.className = 'taskCompletedStatus';
    taskCompletedStatus.innerHTML = 'completed: false';
    taskCompleted.append(taskCompletedStatus);

    const taskButtonDelete = document.createElement('button');
    taskButtonDelete.className = 'taskButtonDelete';
    taskButtonDelete.innerHTML = 'Delete'
    taskCompleted.append( taskButtonDelete);

    return col;
}

// удаление задачи
//     document.querySelector('.taskWrapper')
//     .addEventListener('button', function(event){
//         event.preventDefault();
//        event.target.getElementsByClassName('taskWrapper').remove();
//     })


// Ставим галочку на задачу выполнено/не выполнено
    document.querySelector('.taskWrapper')
        .addEventListener('checkbox', function(event){
            event.preventDefault();
            event.target.querySelector('.taskCompletedStatus').innerHTML = 'completed: true';
    })