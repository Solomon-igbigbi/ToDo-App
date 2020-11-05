const taskLists = document.querySelector('#task_lists')
const formInput = document.querySelector('#formInput')
const addtoList = document.querySelector('#addtoList')
const taskTemplate = document.querySelector('#task-template')
const checkDelete = document.querySelector('.container')
const taskNumber =  document.querySelector('.taskNumbers')

const LOCAL_STORAGE_TASK_KEY = 'tasks.lists'


let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || []


// evet listenwer to get input from the submitted input and save it to the array 
// then render back to screen
formInput.addEventListener('submit', e => {
  e.preventDefault() // prevent default sumbit function
  const taskName = addtoList.value; // get the value of the  input form
  if (taskName == null || taskName === '') {
    alert('fill out what you want to do')
  } else {
    const task = createTask(taskName) // create a task by adding the vlaue as the class name
    addtoList.value = null // reset the input form value to empty
    tasks.push(task) // push to the task array
    saveRender() // render the element
  }
  
})




// function to create task 
const createTask = name => {
  return {  completed: false,  name: name }
}


// function to render task
const render = () => {
  clearElement(taskLists) // clear all the element in the taskList Display
  tasks.forEach(task => { // loop over the task array
    const listElement = document.importNode(taskTemplate.content, true) // import the task template
    const li = listElement.querySelector('li') // get the <li> element from the task template
    console.log(task)
    //add class completed to completed task
    if (task.completed == true) { // loop to find the completed tasks
      li.classList.add('completed') // add the class of completed to th <li> tag from the template
    }
    li.append(task.name) // append the task name to the <li> element

    taskLists.insertBefore(listElement, taskLists.firstChild)

    
    let arrayDisplay = tasks.length // get task array length
    if ( arrayDisplay == '0') {
      taskNumber.textContent = 'NO TASK FOR THE DAY'; // add it to the taskNumber display
    } else {
      taskNumber.textContent = `1 TASK OUT OF ${arrayDisplay} COMPLETED`; // add it to the taskNumber display
    }
    
    
  })
}
const save = () => {
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
}

const saveRender = () => {
  save()
  render()
}




// clear element for the display
const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild) // remove the child for the given array
  }
}


// add event lsitener for the delete button
checkDelete.addEventListener('click', e => {
  let deleteBtn = e.target.parentElement
  let del = deleteBtn.parentElement

  if (e.target.className == 'fas fa-trash-alt') { // target the trash icon with the className
    let txt = del.firstElementChild.innerHTML // get the innerHTML of the trash button element
    // let arrayTask = tasks.indexOf(txt)
    let newTask = tasks.filter(task => task.name !== txt.toString())

    del.parentNode.removeChild(del)
    tasks = []
    tasks = [...newTask]
    saveRender()

    let arrayDisplay = tasks.length
    if ( arrayDisplay == '0') {
      taskNumber.textContent = 'NO TASK FOR THE DAY'; // add it to the taskNumber display
    } else {
      taskNumber.textContent = `1 TASK OUT OF ${arrayDisplay} COMPLETED`; // add it to the taskNumber display
    }

  } else if (e.target.className == 'fas fa-check-circle') {
    let txt = del.firstElementChild
    txt.classList.add('completed')
    let newTxt = txt.innerHTML
    let foundIndex = tasks.findIndex(x => x.name == newTxt.toString());
    tasks[foundIndex].completed = true
    saveRender() // render the element
  }
  
})

saveRender()
console.log(tasks)





