let numOfNotes = 0;

const getNumOfNotes = () => numOfNotes;

const createNote = (text) => {
    let id = numOfNotes;
    let toDoId; 

    numOfNotes++;
    
    // Getter
    const getId = () => id;
    const getToDoId = () => toDoId;
    const getText = () => text;
    
    // Setter
    const setToDoId = (id) => {
        toDoId = id;
    }

    const setText = (newText) => {
        text = newText;
    }

    return {    id, 
                toDoId, 
                getId, 
                getToDoId, 
                getText, 
                setText, 
                setToDoId };
}

export { createNote, getNumOfNotes };