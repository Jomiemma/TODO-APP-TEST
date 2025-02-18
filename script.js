const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const taskList = document.getElementById("task-list");

submitBtn.addEventListener("click", () => {
    const taskInput = userInput.value.trim();

    if (userInput.value === ""){
        alert("Please input a value");
        return;
    }
    
    const task = document.createElement("div");
    task.classList.add("task");

    const label = document.createElement("label");
    label.textContent = taskInput;
    label.classList.add("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", () => {
    label.classList.toggle("completed", checkbox.checked);  
    })

    task.appendChild(checkbox);
    task.appendChild(label);
    taskList.appendChild(task);

    userInput.value = "";
})