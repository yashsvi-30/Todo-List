var input = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString){
//create list item
    var listItem = document.createElement("li");
//create input elements 
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

// change properties of above created elements
    checkbox.type = "checkbox";
    editInput.type = "text";
    label.innerText = taskString;
    editButton.className = "edit";
    editButton.innerText = "Edit";
    deleteButton.className = "delete";
    deleteButton.innerText = "Delete";

    listItem.append(checkbox);
    listItem.append(label);
    listItem.append(editInput);
    listItem.append(editButton);
    listItem.append(deleteButton);

    return listItem;
}

//add new item in list
var addTask = function(){
    var listItem = createNewTaskElement(input.value);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    input.value="";
}

//editing the item
var editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    if (containsClass){
        label.innerText = editInput.value;
    }
    else{
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

//delete an item
var deleteTask=function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//mark the task as complete
var taskCompleted = function(){
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskIncomplete);
}

//mark the task as incomplete
var taskIncomplete = function(){
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function(){
    console.log("AJAX REQUEST");
}

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}





