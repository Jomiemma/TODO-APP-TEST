const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const taskList = document.getElementById("task-list");

submitBtn.addEventListener("click", () => {
    const taskInput = userInput.value.trim();

    if (!userInput.value){
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

        //create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";

        editBtn.addEventListener("click", () => {
            const textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = label.textContent;
            textInput.classList.add("task-input");

            task.replaceChild(textInput, label); //swap label with input field
            textInput.focus(); //focus input immediately

            const saveEdit = () => {
                if (textInput.value.trim() !== "") {
                    label.textContent = textInput.value.trim(); //save edited text
                }
                task.replaceChild(label, textInput); //swap back to label
            };

            textInput.addEventListener("blur", saveEdit); //save when input loses focus
               textInput.addEventListener("keypress", (e) => {
                 if (e.key === "Enter") {
                    saveEdit(); //Save on Enter key
                }})
        })
        
        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(task); //Remove task from the list
        });
        
        task.appendChild(checkbox);
        task.appendChild(label);
        task.appendChild(editBtn);
        task.appendChild(deleteBtn);
        taskList.appendChild(task);
        userInput.value = "";
    })