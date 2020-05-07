let numOfProjects = 0;

const getNumOfProjects = () => numOfProjects;

const createProject = (title) => {
    let id = numOfProjects;
    numOfProjects++;

    let toDos = [];

    // Getter 
    const getId = () => id;
    const getTitle = () => title; 
    const getToDos = () => toDos;

    // Setter
    const setTitle = (newTitle) => {
        title = newTitle;
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
                getToDos, 
                setTitle,
                addToDo };
}

export { createProject, getNumOfProjects };