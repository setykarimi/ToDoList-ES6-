//Define Ul Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListener();

// Load all event Listeners
function loadEventListener() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)

    form.addEventListener('submit', addTask);

    //Remove Task event
    taskList.addEventListener('click', removeTask)

    //Clear Task event
    clearBtn.addEventListener('click', clearTasks)

    //filter Tasl
    filter.addEventListener('keyup', filterTask)

}

//Get Task from Ls
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');

        //Add class
        li.className = 'collection-item';

        // Creat Text Node
        li.appendChild(document.createTextNode(task));

        // Create new Link element
        const link = document.createElement('a');
        //add Class
        link.className = 'delete-item secondary-content';

        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></li>';

        //append The link to li

        li.appendChild(link);


        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task')
    }

    //Create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    // Creat Text Node
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new Link element
    const link = document.createElement('a');
    //add Class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></li>';

    //append The link to li

    li.appendChild(link);


    //Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = ''
    e.preventDefault();
}

// Store Task
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure ?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Ls
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}


//Remove From Ls
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task,index)
    {
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks

function clearTasks() {
    // taskList.innerHTML = '';

    // //Faster Way for Deleting All item
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    //Clear From LS
    clearTasksFromLocalStorage();
}

//Cleare Tasks from LS
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

//Filter Task
function filterTask(e) {
    var text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                taskList.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}
