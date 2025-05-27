const textElement = document.querySelector('.textbox');
const addBtn = document.querySelector('.btn-add');
const datePicker = document.querySelector('.date-picker');
const checkbox = document.querySelector('.checkbox');

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
renderTodoList();

let flag = false;

function renderTodoList() { 
    let todoListHTML = '';

    
    todoList.forEach(function (todo, index) {
        let html = `<div class="group">
        <div class="left-sec">
        <input class="checkbox" type="checkbox" id="task${index + 1}" 
        ${todo.flag ? "checked" : ""} 
        onclick="validateCheckbox(${index + 1});">
        </div>
        <div class="mid-sec">
        <label class="task${index + 1}" for="task${
          index + 1
        }" style="text-decoration: ${todo.flag ? "line-through" : "none"};">${
          todo.name
        }</label>
        <p>${todo.date}</p>
        </div>
        <div class="right-sec">
        <button class="btn-delete" onclick="todoList.splice(${index}, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();">
        <img class="cross" src="assets/9312232.png" alt="X">
        </button>
        </div> 
        </div>`;
        todoListHTML += html;
    });

    document.querySelector('.list').innerHTML = todoListHTML;
}


addBtn.addEventListener('click', addTask);

function addTask() {
  const name = textElement.value;
  const date = datePicker.value;
  //if fields are empty
  if (name == "" && date == "") {
    alert("Please add a task and do-date");
    return;
  } else if (name == "") {
    alert("Please add a task first");
    return;
  } else if (date == "") {
    alert("please add a do-date below");
    return;
  }

  const obj = {
    name,
    date,
    flag,
  };

  todoList.push(obj);
  textElement.value = "";
  //storing task in local storage.
  localStorage.setItem("todoList", JSON.stringify(todoList));
  //calling function to render the To-Do List.
  renderTodoList();
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});


function validateCheckbox(task) { 
    const text = document.querySelector(`.task${task}`);
    const checkbox = document.getElementById(`task${task}`);

    // Find the correct todo by index (task-1)
    todoList[task - 1].flag = checkbox.checked;

    if (checkbox.checked) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }

    // Save updated list to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}




