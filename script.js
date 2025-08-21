// creating variables with appropriate id's
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const taskList = document.getElementById("task-list");

async function fetchTodos() {
  try {
    const response = await fetch("https://todo-api-qcha.onrender.com/todos");
    if (!response.ok) {
      throw new Error("failed to fetch todos");
    }
    const todos = await response.json();

    // clear existing list
    taskList.innerHTML = "";

    // loop through each todo and create UI elements
    todos.forEach((todo) => {
      const task = document.createElement("li");
      task.classList.add("task");

      // Create a span to display the todo title
      const label = document.createElement("span");
      label.textContent = todo.title;
      task.appendChild(label);

      // Mark task as completed if needed
      if (todo.done) {
        task.classList.add("completed");
      }

      // edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("editbtn");
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.addEventListener("click", () => {
        // Create an input field for editing the todo
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = todo.title;
        textInput.classList.add("task-input");

        // Replace only the label with the input field
        // *** Change Made: Using replaceChild instead of replaceWith ***
        task.replaceChild(textInput, label);
        textInput.focus();

        // Function to save the edited text
        const saveEdit = async () => {
          const updatedText = textInput.value.trim();
          if (updatedText !== "") {
            try {
              const response = await fetch(
                `https://todo-api-qcha.onrender.com/todos/${todo.id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title: updatedText }),
                }
              );
              if (!response.ok) {
                throw new Error("Failed to update task");
              }
              // Refresh list to display updated todo (this restores the label and buttons)
              fetchTodos();
            } catch (error) {
              console.error("Error updating task:", error);
            }
          }
        };

        // Save the updated text when input loses focus or when Enter is pressed
        textInput.addEventListener("blur", saveEdit);
        textInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            saveEdit();
          }
        });
      });

      // create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
        // Remove task from the DOM
        taskList.removeChild(task);
        // Optionally, call the delete API here if you want to remove it from the backend as well.
        fetch(`https://todo-api-qcha.onrender.com/todos/${todo.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete task");
            }
            // Optionally update the UI here, for example, refresh the list of todos:
            fetchTodos();
          })
          .catch((error) => console.error("Error deleting task:", error));
      });

      // Append the edit and delete buttons to the task element
      task.appendChild(editBtn);
      task.appendChild(deleteBtn);

      // Append the fully built task element to the task list container
      taskList.appendChild(task);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Function to add a new todo with the API
async function addTodo() {
  const taskInput = userInput.value.trim();
  if (!taskInput) {
    alert("Please input a value");
    return;
  }
  try {
    const response = await fetch("https://todo-api-qcha.onrender.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskInput, done: false }),
    });

    console.log("Response status:", response.status); // Log the status code

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the response to check what is returned

    // Clear input field after successful submission
    userInput.value = "";

    // Refresh the task list
    fetchTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

// Attach event listener to the submit button
submitBtn.addEventListener("click", addTodo);

// Call fetchTodos when the page loads
document.addEventListener("DOMContentLoaded", fetchTodos);

// THE END!!!
