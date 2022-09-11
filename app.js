// * SELECT ITEMS
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todolist");

const filterSelect = document.querySelector(".todo__filter");

// !--------------------------------------------------------------- OOP ---------------------------------------------------------------!
class App {
  constructor() {
    this._getLocalTodos();

    // * EVENT LISTENERS *
    todoButton.addEventListener("click", this._addTodoHandler.bind(this));
    todoList.addEventListener("click", this._deleteTodoHandler.bind(this));
    filterSelect.addEventListener("click", this._filterTodo.bind(this));
  }

  // * FUNCTIONS *

  // add todo function ---------------------------------------
  _addTodoHandler(e) {
    e.preventDefault();

    if (todoInput.value === "") {
      alert("Please enter a value!");
      return;
    }

    // create todo list items
    const html = `
		<div class="todolist__todo">
			<li class="todolist__todoitem">${todoInput.value}</li>
			<button class="todolist__completebtn">
				<i class="fa-solid fa-check"></i>
			</button>

			<button class="todolist__deletebtn">
				<i class="fa-solid fa-trash"></i>
			</button>
		</div>
	`;

    todoList.insertAdjacentHTML("beforeend", html);

    // ADD TO THE LOCAL STORAGE
    this._saveLocalStorage(todoInput.value);

    // clear input value
    todoInput.value = "";
  }

  // delete todo function ---------------------------------------
  _deleteTodoHandler(e) {
    const existingItem = e.target;

    // delete todo
    if (existingItem.classList[0] === "todolist__deletebtn") {
      existingItem.parentElement.classList.add("fall");

      // REMOVE TODO ITEM FROM LOCAL STORAGE
      this._removeLocalTodos(existingItem.parentElement);

      // !special event listener for "fall" animation
      existingItem.parentElement.addEventListener("transitionend", () => {
        existingItem.parentElement.remove();
      });
    }

    // complete todo
    if (existingItem.classList[0] === "todolist__completebtn") {
      existingItem.parentElement.classList.toggle("completed");
    }
  }

  // filter todo function -------------------------------------
  _filterTodo(e) {
    //select all todolist nodes
    const todos = todoList.childNodes;

    todos.forEach((todo) => {
      const todoStyle = todo.style;
      if (todoStyle != undefined && todoStyle != null) {
        switch (e.target.value) {
          case "all":
            todoStyle.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todoStyle.display = "flex";
            } else {
              todoStyle.display = "none";
            }
            break;
          case "uncompleted":
            if (todo.classList.contains("completed")) {
              todoStyle.display = "none";
            } else {
              todoStyle.display = "flex";
            }
            break;
        }
      }
    });
  }

  // save to the local storage function ------------------------------
  _saveLocalStorage(todo) {
    let todos;
    // check local storage
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    // set local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // get todos from local storage function ------------------------------
  _getLocalTodos() {
    let todos;

    // check local storage
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
      // create todo list items
      const html = `
		<div class="todolist__todo">
			<li class="todolist__todoitem">${todo}</li>
			<button class="todolist__completebtn">
				<i class="fa-solid fa-check"></i>
			</button>

			<button class="todolist__deletebtn">
				<i class="fa-solid fa-trash"></i>
			</button>
		</div>
	`;
      todoList.insertAdjacentHTML("beforeend", html);
    });
  }

  // delete todos from local storage function ------------------------------
  _removeLocalTodos(todo) {
    let todos;

    // check local storage
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    // set todos - again
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

const app = new App();

// !--------------------------------------------------------------- WITHOUT OOP ---------------------------------------------------------------!
//// * EVENT LISTENERS
//document.addEventListener("DOMContentLoaded", getLocalTodos);
//todoButton.addEventListener("click", addTodoHandler);
//todoList.addEventListener("click", deleteTodoHandler);
//filterSelect.addEventListener("click", filterTodo);
//
//// * FUNCTIONS
//
//// add todo function ------------------------------
//function addTodoHandler(e) {
//  e.preventDefault();
//
//  if (todoInput.value === "") {
//    alert("Please enter a value!");
//    return;
//  }
//
//  // create todo list items
//  const todoDIV = document.createElement("div");
//  todoDIV.classList.add("todolist__todo");
//
//  const todoLI = document.createElement("li");
//  todoLI.classList.add("todolist__todoitem");
//  todoLI.innerText = todoInput.value;
//
//  // bind - append child
//  todoDIV.appendChild(todoLI);
//
//  // ADD TO THE LOCAL STORAGE
//  saveLocalStorage(todoInput.value);
//
//  // completed
//  const completedButton = document.createElement("button");
//  completedButton.classList.add("todolist__completebtn");
//  completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
//  todoDIV.appendChild(completedButton);
//
//  // delete
//  const deleteButton = document.createElement("button");
//  deleteButton.classList.add("todolist__deletebtn");
//  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
//  todoDIV.appendChild(deleteButton);
//
//  // !bind - append to .todolist
//  todoList.appendChild(todoDIV);
//
//  // clear input value
//  todoInput.value = "";
//}
//
//// delete todo function ------------------------------
//function deleteTodoHandler(e) {
//  const existingItem = e.target;
//
//  // delete todo
//  if (existingItem.classList[0] === "todolist__deletebtn") {
//    existingItem.parentElement.classList.add("fall");
//
//    // REMOVE TODO ITEM FROM LOCAL STORAGE
//    removeLocalTodos(existingItem.parentElement);
//
//    // !special event listener for "fall" animation
//    existingItem.parentElement.addEventListener("transitionend", () => {
//      existingItem.parentElement.remove();
//    });
//  }
//
//  // complete todo
//  if (existingItem.classList[0] === "todolist__completebtn") {
//    existingItem.parentElement.classList.toggle("completed");
//  }
//}
//
//// filter todo function ------------------------------
//function filterTodo(e) {
//  //select all todolist nodes
//  const todos = todoList.childNodes;
//
//  todos.forEach((todo) => {
//    const todoStyle = todo.style;
//    if (todoStyle != undefined && todoStyle != null) {
//      switch (e.target.value) {
//        case "all":
//          todoStyle.display = "flex";
//          break;
//        case "completed":
//          if (todo.classList.contains("completed")) {
//            todoStyle.display = "flex";
//          } else {
//            todoStyle.display = "none";
//          }
//          break;
//        case "uncompleted":
//          if (todo.classList.contains("completed")) {
//            todoStyle.display = "none";
//          } else {
//            todoStyle.display = "flex";
//          }
//          break;
//      }
//    }
//  });
//}
//
//// save to the local storage function ------------------------------
//function saveLocalStorage(todo) {
//  let todos;
//  // check local storage
//  if (localStorage.getItem("todos") === null) {
//    todos = [];
//  } else {
//    todos = JSON.parse(localStorage.getItem("todos"));
//  }
//
//  todos.push(todo);
//  // set local storage
//  localStorage.setItem("todos", JSON.stringify(todos));
//}
//
//// get todos from local storage function ------------------------------
//function getLocalTodos() {
//  let todos;
//
//  // check local storage
//  if (localStorage.getItem("todos") === null) {
//    todos = [];
//  } else {
//    todos = JSON.parse(localStorage.getItem("todos"));
//  }
//
//  todos.forEach((todo) => {
//    // create todo list items
//    const todoDIV = document.createElement("div");
//    todoDIV.classList.add("todolist__todo");
//
//    const todoLI = document.createElement("li");
//    todoLI.classList.add("todolist__todoitem");
//    todoLI.innerText = todo;
//
//    // bind - append child
//    todoDIV.appendChild(todoLI);
//
//    // completed
//    const completedButton = document.createElement("button");
//    completedButton.classList.add("todolist__completebtn");
//    completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
//    todoDIV.appendChild(completedButton);
//
//    // delete
//    const deleteButton = document.createElement("button");
//    deleteButton.classList.add("todolist__deletebtn");
//    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
//    todoDIV.appendChild(deleteButton);
//
//    // !bind - append to .todolist
//    todoList.appendChild(todoDIV);
//  });
//}
//
//// delete todos from local storage function ------------------------------
//function removeLocalTodos(todo) {
//  let todos;
//
//  // check local storage
//  if (localStorage.getItem("todos") === null) {
//    todos = [];
//  } else {
//    todos = JSON.parse(localStorage.getItem("todos"));
//  }
//
//  const todoIndex = todo.children[0].innerText;
//  todos.splice(todos.indexOf(todoIndex), 1);
//
//  // set todos - again
//  localStorage.setItem("todos", JSON.stringify(todos));
//}
