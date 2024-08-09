"use strict";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-input");
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});
form === null || form === void 0 ? void 0 : form.addEventListener("submit", e => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    addListItem(newTask);
    saveTask(newTask);
    input.value = "";
});
function addListItem(task) {
    console.log('Adding task:', task);
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    deleteIcon.className = "fas fa-trash";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        deleteTask(task);
        item.remove();
    });
    deleteButton.append(deleteIcon);
    label.append(checkbox, task.title);
    item.append(label, deleteButton);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(addListItem);
}
function deleteTask(taskToDelete) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter(task => task.title !== taskToDelete.title ||
        new Date(task.createdAt).getTime() !== new Date(taskToDelete.createdAt).getTime());
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
