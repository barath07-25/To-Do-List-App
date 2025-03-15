document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed");
        saveTasks();
    });

    let span = document.createElement("span");
    span.textContent = taskText;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.children[1].textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        if (task.completed) li.classList.add("completed");

        checkbox.addEventListener("change", function() {
            li.classList.toggle("completed");
            saveTasks();
        });

        let span = document.createElement("span");
        span.textContent = task.text;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
