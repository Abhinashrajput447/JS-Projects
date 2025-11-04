let todoList = [];
displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value.trim();
    let todoDate = dateElement.value;
    if (todoItem) {
        todoList.push({item: todoItem, dueDate: todoDate});
        inputElement.value = '';
        dateElement.value = '';
        displayItems();
    } else {
        alert("Please enter a todo item.");
    }
} 

function displayItems() {
    let containerElement = document.querySelector('.todo-container');
    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
        let {item, dueDate} = todoList[i];
        // format date from YYYY-MM-DD (from input) to a nicer locale string when available
        let formattedDate = '';
        try {
            if (dueDate) {
                const d = new Date(dueDate);
                // if invalid date, keep raw
                formattedDate = isNaN(d.getTime()) ? dueDate : d.toLocaleDateString();
            }
        } catch (e) {
            formattedDate = dueDate || '';
        }

        newHtml += `
        <p class="todo-text">${item}</p>
        <span class="todo-date">${formattedDate}</span>
        <button class="delete-btn" onclick="deleteTodo(${i})">Delete</button>
        `;
    }
    containerElement.innerHTML = newHtml;
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    displayItems();
}