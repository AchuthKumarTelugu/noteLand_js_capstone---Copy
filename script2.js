

import notesApi from "./notesApi.js"

function displayLocalStorageToScreen() {
    if (!document.querySelector('.Notes').children.length > 0) {
        let array = notesApi.getAllNotes()
        array.forEach(value => {
            displayNote(value)
        })
    }
}
displayLocalStorageToScreen()

function OnclickNewNotes() {
    document.querySelector('.newNote').addEventListener('click', () => {
        document.querySelector('.noNotes').style.display = 'none'
        document.querySelector('.noteData').style.display = 'block'
        document.getElementById('noteTitle').value = ''
        document.getElementById('noteContent').value = ''
    })
}
OnclickNewNotes()
OnclickRemoveAllNodes()
OnclickCreateNote()
function OnclickCreateNote() {

    document.querySelector('.createNote').addEventListener('click', () => {
        let noteObj = {
            title: document.getElementById('noteTitle').value,
            content: document.getElementById('noteContent').value
        }
        document.querySelector('.noNotes').style.display = 'block'
        document.querySelector('.noteData').style.display = 'none'
        console.log('onclickCreateNotes', noteObj)
        notesApi.saveNotes(noteObj)//adding to local storage0
        displayNote(noteObj)//displaying data onto screen
})
}
function OnclickRemoveAllNodes() {
    document.querySelector('.removeAllNotes').addEventListener('click', () => {
        localStorage.clear()
        document.querySelector('.Notes').innerHTML = ''
    })
}
function displayNote(obj) {
    document.querySelector('.Notes').innerHTML += `<div class="note ${'note' + obj.id}">
    <h4>${obj.title}</h4>
    <p>${obj.content}</p>
</div>`

    document.querySelector('.note' + obj.id).addEventListener('click', () => {
        console.log('entered level 2')
        document.querySelector('.noNotes').style.display = 'none'
        document.querySelector('.noteData').style.display = 'none'
        document.querySelector('.singleNoteEdit').style.display = 'block'
        document.querySelector('.singleNoteTitle').value = ''
        document.querySelector('.noteEditDescription').value = ''
        document.querySelector('.singleNoteTitle').innerHTML = obj.title
        document.querySelector('.noteEditDescription').value = obj.content

        document.querySelector('.noteEditDescription').addEventListener('keyup', () => {

            obj.content = document.querySelector('.noteEditDescription').value
            notesApi.saveNotes(obj)
            document.querySelector('.note' + obj.id).innerHTML = ` <h4>${obj.title}</h4>
        <p>${obj.content}</p>`

        })
        document.querySelector('.deleteNoteButton').addEventListener('click', () => {
            notesApi.deleteNotes(obj.id)
            document.querySelector('.note' + obj.id).remove()
            document.querySelector('.noNotes').style.display = 'block'
            document.querySelector('.noteData').style.display = 'none'
            document.querySelector('.singleNoteEdit').style.display = 'none'
        })

        document.querySelector('.newTaskButton').addEventListener('click', () => {
            document.querySelector('.singleNoteEdit').style.opacity = '0.5'
            document.querySelector('.taskDetails').style.display = 'block'
            document.querySelector('.taskInput').value = ''

        })

        document.querySelector('.setTaskButton').addEventListener('click', (e) => {
            document.querySelector('.singleNoteEdit').style.opacity = '1'
            document.querySelector('.taskDetails').style.display = 'none'
            let taskObj = {
                status: false,
                taskTitle: document.querySelector('.taskInput').value,
                taskId: Math.round(Math.random() * 10000)
            }
            const updatedObj = { ...obj }
            console.log(updatedObj)
            updatedObj.taskList.push(taskObj)
            notesApi.saveNotes(updatedObj)
        })
       
        
        document.querySelector('.done').addEventListener('click', () => {
            document.querySelector('.noNotes').style.display = 'block'
            document.querySelector('.noteData').style.display = 'none'
            document.querySelector('.singleNoteEdit').style.display = 'none'
        })

    })
}
