let numOfToDos = 0;

const getNumOfToDos = () => numOfToDos;

const createToDo = (title, description, dueDate) => {
    let id = numOfToDos;
    let projectId;

    numOfToDos++;

    let notes = [];
    let checked = false;

    // Getter
    const getId = () => id;
    const getProjectId = () => projectId;
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getChecked = () => checked;
    const getNotes = () => notes;

    // Setter
    const setProjectId = (id) => {
        projectId = id;
    }

    const setTitle = (newTitle) => {
        title = newTitle;
    }

    const setDescription = (newDescription) => {
        description = newDescription;
    }

    // Object methods
    const addNote = (note) => {
        note.setToDoId(id);
        notes.push(note);
    }

    return {    id,
                projectId,
                notes, 
                getId, 
                getProjectId, 
                getTitle, 
                getDescription, 
                getDueDate, 
                getChecked, 
                getNotes, 
                addNote, 
                setProjectId,
                setTitle,
                setDescription       
    };
};

export { createToDo, getNumOfToDos };

