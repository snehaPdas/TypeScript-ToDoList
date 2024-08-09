type Task = {
    title: string,
    completed: boolean,
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-input")

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

form?.addEventListener("submit", e => {
    e.preventDefault();
    if (input?.value == "" || input?.value == null) return;
    const newTask: Task = {
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    addListItem(newTask)
    saveTask(newTask);
    input.value = "";
})

function addListItem(task: Task) {
    console.log('Adding task:', task)
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    const deleteButton = document.createElement("button")
    const deleteIcon = document.createElement("i")

    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    deleteIcon.className = "fas fa-trash"
    deleteButton.className = "delete-button"

    deleteButton.addEventListener("click", () => {
        deleteTask(task);
        item.remove();
    })

    deleteButton.append(deleteIcon)
    label.append(checkbox, task.title)
    item.append(label, deleteButton)
    list?.append(item)
}

function saveTask(task: Task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    tasks.forEach(addListItem);
}

function deleteTask(taskToDelete: Task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    const updatedTasks = tasks.filter(task =>
        task.title !== taskToDelete.title ||
        new Date(task.createdAt).getTime() !== new Date(taskToDelete.createdAt).getTime()
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
