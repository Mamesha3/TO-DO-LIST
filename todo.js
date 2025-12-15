const numTask = document.querySelector('.num-tasks')
const input = document.querySelector('#input-value')
const addBtn = document.querySelector('#task-append')
const taskList = document.querySelector('.task-container')
const clearBtn = document.querySelector('#clear-tasks')

getItem()

  // to get code click here
document.querySelector('.code_sign').addEventListener('click',function () {
      let code = document.querySelector('.code_here')
      code.classList.toggle('showhere')
})

function createLi(inpValue) {
    // creating dom elements
    let list = document.createElement('li')
    let divOne = document.createElement('div')
    let divTwo = document.createElement('div')
    let span = document.createElement('span')
    let inputCheck = document.createElement('input')
    let editBnt = document.createElement('button')
    let deleteBtn = document.createElement('button')
    let imgEdit = document.createElement('i')
    let imgDelete = document.createElement('i')

    // editing the doms we created
    span.classList.add('text')
    span.textContent = inpValue
    inputCheck.type = 'checkbox'
    inputCheck.classList.add('completed')

    editBnt.id = 'edit-text'
    imgEdit.className = 'fa-solid fa-pen-to-square'
    editBnt.appendChild(imgEdit)

    deleteBtn.id = 'delete-task'
    imgDelete.className = 'fa-solid fa-trash'
    deleteBtn.appendChild(imgDelete)

    // append child each
    divOne.append(inputCheck, span)
    divTwo.append(editBnt, deleteBtn)
    list.append(divOne, divTwo)

    // add event listner
    // editBtn event
    editBnt.addEventListener('click', () => {
        span.contentEditable = 'true'
    })
    span.addEventListener('blur', () => {
        span.contentEditable = 'false'
        saveTasks()
    })
    // event for checkBox
    inputCheck.addEventListener('click', () => {
        span.classList.toggle('span-task')
        editBnt.classList.toggle('complete')

        let checkedItem = document.querySelectorAll('.completed:checked')
        updateCheckNum(checkedItem)
    })
    // event for delete btn
    deleteBtn.addEventListener('click', () => {
        list.remove()
        localStorage.removeItem('addList')

        let checkedItem = document.querySelectorAll('.completed:checked')
        updateCheckNum(checkedItem)
    })

    taskList.appendChild(list)
}  

// the checked function tester
function updateCheckNum(checkedItem) {
    let listLength = taskList.children.length
    let checkdOne = checkedItem.length

    document.querySelector('#numbers').textContent = `${checkdOne} / ${listLength}`
    document.querySelector('.progress').style.width = `${(checkdOne / listLength) * 100}%`
}

// event listne
addBtn.addEventListener('click', () => {
    let inpValu = input.value
    if(inpValu) {
        createLi(inpValu)
        taskList.querySelector('li').classList.add('scalein')
        input.value = ''
        saveTasks()
    }else{
        alert('Add task name')
    }
})

// event for clear btn
clearBtn.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach((task) => {
        task.remove()
        localStorage.removeItem('addList')
         let checkedItem = document.querySelectorAll('.completed:checked')
        updateCheckNum(checkedItem)
    })
})

// event for filters i added 
document.querySelector('#active').addEventListener('click', () => {
    let checkedItem = document.querySelectorAll('.completed:checked')
    if(checkedItem) {
        checkedItem.style.display = 'none'
    }else {
        checkedItem.style.display = 'block'
    }
})
document.querySelector('#filter-bar #done').addEventListener('click', () => {
     let checkedItem = document.querySelectorAll('.completed:checked')
     
})

// localstorage setUp
function saveTasks(){
    let tasks = []
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push(task.textContent.trim())
    });

    localStorage.setItem('addList', JSON.stringify(tasks))

     let checkedItem = document.querySelectorAll('.completed:checked')
        updateCheckNum(checkedItem)
}

// get saved list item from localstorage to our monitor display
function getItem() {
    let tasks = JSON.parse(localStorage.getItem('addList')) || []
    tasks.forEach(createLi)

    let checkedItem = document.querySelectorAll('.completed:checked')
        updateCheckNum(checkedItem)
}
