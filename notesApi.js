
//  methods to manipulate with localStorage
export default class notesApi {
    static getAllNotes() {
        let data = JSON.parse(localStorage.getItem('notes') || "[]")
        return data;
    }
    static saveNotes(notesToAdd) { //it updates and insert new notes

        if(!(localStorage.getItem('notes'))){ //intially if localStorage is empty
            localStorage.setItem('notes',JSON.stringify([]))
        }

        let array = notesApi.getAllNotes()
        let existingIndex=array.findIndex(value=>value.id==notesToAdd.id)
        if(existingIndex>=0){
             //updating data
              array[existingIndex].title=notesToAdd.title
              array[existingIndex].content=notesToAdd.content,
              array[existingIndex].taskList=notesToAdd.taskList
        }
        else{
            notesToAdd.id = Math.round(Math.random() * 1000 + 1)
            notesToAdd.taskList=[]
            array.push(notesToAdd)
        }
       
        localStorage.setItem('notes',JSON.stringify(array))

    }
    static deleteNotes(id) {
             let notes=notesApi.getAllNotes()
             let newNotes=notes.filter(value=>value.id!=id)
             localStorage.setItem('notes',JSON.stringify(newNotes))
    }
    
  
}