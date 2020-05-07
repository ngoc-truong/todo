let numOfProjects = 0;

const getNumOfProjects = () => numOfProjects;

const createProject = (title, description) => {
    let id = numOfProjects;
    numOfProjects++;

    let toDos = [];

    // Getter 
    const getId = () => id;
    const getTitle = () => title; 
    const getDescription = () => description;
    const getToDos = () => toDos;

    // Setter
    const setTitle = (newTitle) => {
        title = newTitle;
    } 

    const setDescription = (newDescription) => {
        description = newDescription;
    } 

    // Object methods
    const addToDo = (toDo) => {
        toDo.setProjectId(id);
        toDos.push(toDo);
    }

    return {    id, 
                toDos, 
                getId, 
                getTitle, 
                getDescription, 
                getToDos, 
                setTitle,
                setDescription,
                addToDo };
}

export { createProject, getNumOfProjects };