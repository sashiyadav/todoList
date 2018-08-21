var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo){
       // Case 1: If everything’s true, make everything false.
      if(completedTodos === totalTodos){
        todo.completed=false;
      }
      // Case 2: Otherwise, make everything true.
      else{
      todo.completed=true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo,Position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id=Position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.deleteButton());
      todosUl.appendChild(todoLi);
    },this);
  },
  deleteButton:function(){
    var deleteTodoButton = document.createElement('button');
    deleteTodoButton.textContent = 'Delete';
    deleteTodoButton.className = 'deleteTodo'
    return deleteTodoButton;
  },
  setUpEventListener:function(){
    var todosUl  = document.querySelector('ul');
    
    todosUl.addEventListener('click',function(event){
      var todoEvent=event.target;
      if(todoEvent.className === 'deleteTodo')
      {
        handlers.deleteTodo(parseInt(todoEvent.parentNode.id));
      }
    });
  }
};

view.setUpEventListener();











